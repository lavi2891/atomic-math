import type { AttemptRepository } from "../../domain/attempts/AttemptRepository.ts";
import type { Attempt } from "../../domain/attempts/types.ts";
import type { MasterySnapshot } from "../../domain/mastery/projectMastery.ts";
import { projectMastery } from "../../domain/mastery/projectMastery.ts";
import type { Assignment, CachedStudentHome, StudentHomeData, StudentProfile } from "../../domain/studentHome/types.ts";
import { chooseFresherMastery } from "../../domain/studentHome/deriveStudentHome.ts";
import type { PersistenceDriver } from "../../infrastructure/persistence/driver.ts";
import type { AppsScriptClient } from "../../infrastructure/sync/AppsScriptClient.ts";
import { SKILLS } from "../../content/catalog/index.ts";

function truthy(value: unknown): boolean {
  return value === true || String(value).toUpperCase() === "TRUE";
}

function normalizeStudent(value: StudentProfile | null): StudentProfile | null {
  if (!value?.studentId) return null;
  return { ...value, studentId: String(value.studentId), displayName: String(value.displayName || value.studentId), active: truthy(value.active) };
}

function normalizeAssignments(values: Assignment[]): Assignment[] {
  return values.filter((value) => value?.assignmentId && value?.skillId).map((value) => ({
    ...value,
    assignmentId: String(value.assignmentId), studentId: String(value.studentId), skillId: String(value.skillId),
    targetMastery: Number(value.targetMastery) || 85, priority: Number(value.priority) || 999, active: truthy(value.active),
  }));
}

function normalizeSnapshot(value: MasterySnapshot): MasterySnapshot {
  const rawFluency = value.fluencyMedianMs as unknown;
  const evidence = value.evidenceLevel === "established" || value.evidenceLevel === "emerging" ? value.evidenceLevel : "insufficient";
  return {
    ...value, studentId: String(value.studentId), skillId: String(value.skillId), mastery: Number(value.mastery) || 0,
    accuracy: Number(value.accuracy) || 0, attemptCount: Number(value.attemptCount) || 0,
    recentAverage: Number(value.recentAverage) || 0, historyAverage: Number(value.historyAverage) || 0,
    evidenceLevel: evidence, calculatedAt: String(value.calculatedAt || new Date().toISOString()),
    lastAttemptAt: value.lastAttemptAt ? String(value.lastAttemptAt) : undefined,
    fluencyMedianMs: rawFluency === "" || rawFluency === undefined ? undefined : Number(rawFluency),
  };
}

function normalizeCachedHome(value: CachedStudentHome | null, studentId: string): CachedStudentHome | null {
  if (!value || value.studentId !== studentId) return null;
  const assignments = Array.isArray(value.assignments) ? normalizeAssignments(value.assignments) : [];
  const rawMastery = value.masteryBySkill && typeof value.masteryBySkill === "object" ? Object.values(value.masteryBySkill) : [];
  const snapshots = rawMastery.filter((item): item is MasterySnapshot => !!item && typeof item === "object" && "skillId" in item).map(normalizeSnapshot);
  return {
    studentId,
    student: normalizeStudent(value.student),
    assignments,
    masteryBySkill: Object.fromEntries(snapshots.map((snapshot) => [snapshot.skillId, snapshot])),
    cachedAt: typeof value.cachedAt === "string" ? value.cachedAt : new Date().toISOString(),
  };
}

export class StudentHomeService {
  private readonly attempts: AttemptRepository;
  private readonly persistence: PersistenceDriver;
  private readonly client: AppsScriptClient | null;

  constructor(attempts: AttemptRepository, persistence: PersistenceDriver, client: AppsScriptClient | null) {
    this.attempts = attempts;
    this.persistence = persistence;
    this.client = client;
  }

  async load(studentId: string): Promise<StudentHomeData> {
    let cached: CachedStudentHome | null = null;
    try {
      cached = normalizeCachedHome(await this.persistence.getStudentHome(studentId), studentId);
    } catch {
      // A damaged/unavailable cache must not prevent local practice.
    }
    let server: CachedStudentHome | null = cached;
    let source: StudentHomeData["source"] = cached ? "cache" : "local";
    let connection: StudentHomeData["connection"] = this.client ? "offline" : "unconfigured";
    let warning: string | undefined;
    if (this.client) {
      try {
        const remote = await this.client.getStudentHome(studentId);
        server = {
          studentId,
          student: normalizeStudent(remote.student),
          assignments: normalizeAssignments(remote.activeAssignments),
          masteryBySkill: Object.fromEntries(remote.masterySnapshots.map(normalizeSnapshot).map((snapshot) => [snapshot.skillId, snapshot])),
          cachedAt: new Date().toISOString(),
        };
        await this.persistence.putStudentHome(server);
        source = "remote";
        connection = "online";
        if (!server.student) warning = `לא נמצא תלמיד עם המזהה ${studentId}; אפשר להמשיך בתרגול חופשי.`;
      } catch {
        warning = "אין כרגע חיבור לשרת. מוצגים הנתונים השמורים במכשיר.";
      }
    }

    const masteryEntries = await Promise.all(SKILLS.map(async (skill) => {
      let attempts: Attempt[] = [];
      try {
        attempts = await this.attempts.getAttemptsForSkill(studentId, skill.id);
      } catch {
        // Keep Home/practice available even when optional local history cannot be read.
      }
      const fluency = "fluency" in skill && typeof skill.fluency === "object" && skill.fluency !== null
        ? skill.fluency as { enabled?: boolean }
        : undefined;
      const local = projectMastery({ studentId, skillId: skill.id, attempts, fluencyEnabled: fluency?.enabled ?? false });
      return [skill.id, chooseFresherMastery(server?.masteryBySkill[skill.id], local)] as const;
    }));

    return {
      student: server?.student ?? null,
      assignments: server?.assignments ?? [],
      masteryBySkill: Object.fromEntries(masteryEntries),
      source,
      connection,
      warning,
      cachedAt: server?.cachedAt ?? new Date().toISOString(),
    };
  }
}
