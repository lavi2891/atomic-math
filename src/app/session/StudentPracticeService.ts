import type { AttemptRepository } from "../../domain/attempts/AttemptRepository.ts";
import { projectMastery, type MasterySnapshot } from "../../domain/mastery/projectMastery.ts";
import { createPracticeSession, type PracticeSession, type PracticeSessionState, type SessionSettings } from "../../domain/session/practiceSession.ts";
import type { SessionRepository } from "../../domain/sync/types.ts";
import { getSkillById } from "../../content/catalog/index.ts";
import type { SyncCoordinator } from "../../infrastructure/sync/SyncCoordinator.ts";

export type SessionStartResult = { session: PracticeSession; masteryBefore: Record<string, MasterySnapshot> };

function createSessionId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `sess-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export class StudentPracticeService {
  private readonly attempts: AttemptRepository;
  private readonly sessions: SessionRepository;
  private readonly sync: SyncCoordinator;

  constructor(attempts: AttemptRepository, sessions: SessionRepository, sync: SyncCoordinator) {
    this.attempts = attempts;
    this.sessions = sessions;
    this.sync = sync;
  }

  async snapshot(studentId: string, skillIds: readonly string[]): Promise<Record<string, MasterySnapshot>> {
    return Object.fromEntries(await Promise.all(skillIds.map(async (skillId) => {
      const attempts = await this.attempts.getAttemptsForSkill(studentId, skillId);
      return [skillId, projectMastery({ studentId, skillId, attempts, fluencyEnabled: getSkillById(skillId)?.fluency?.enabled ?? false })] as const;
    })));
  }

  async start(input: { studentId: string; skillIds: string[]; settings: SessionSettings; assignmentId?: string }): Promise<SessionStartResult> {
    const masteryBefore = await this.snapshot(input.studentId, input.skillIds);
    const session = createPracticeSession({ id: createSessionId(), studentId: input.studentId, selectedSkillIds: input.skillIds, settings: input.settings, startedAt: Date.now(), source: input.assignmentId ? "assignment" : "freePractice", assignmentId: input.assignmentId });
    await this.sessions.saveSession({ ...session, source: session.source ?? "freePractice", strategy: "balanced", status: "active", questionCount: 0, correctCount: 0, incorrectCount: 0, accuracy: 0 });
    void this.sync.flush();
    return { session, masteryBefore };
  }

  async finish(state: PracticeSessionState): Promise<Record<string, MasterySnapshot>> {
    const correctCount = state.results.filter((result) => result.isCorrect).length;
    const incorrectCount = state.results.length - correctCount;
    await this.sessions.saveSession({ ...state.session, source: state.session.source ?? "freePractice", strategy: "balanced", endedAt: state.endedAt, status: state.endReason === "stopped" ? "abandoned" : "completed", questionCount: state.results.length, correctCount, incorrectCount, accuracy: state.results.length ? correctCount / state.results.length : 0, gameScore: state.session.settings.mode === "timed" ? correctCount - incorrectCount : undefined });
    const masteryAfter = await this.snapshot(state.session.studentId, state.session.selectedSkillIds);
    void this.sync.flush();
    return masteryAfter;
  }
}
