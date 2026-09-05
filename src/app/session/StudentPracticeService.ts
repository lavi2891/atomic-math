import type { AttemptRepository } from "../../domain/attempts/AttemptRepository.ts";
import { projectMastery, type MasterySnapshot } from "../../domain/mastery/projectMastery.ts";
import { createPracticeSession, isSuccessfulSessionCompletion, type PracticeSession, type PracticeSessionState, type SessionSettings } from "../../domain/session/practiceSession.ts";
import type { SessionRepository } from "../../domain/sync/types.ts";
import { getSkillById } from "../../content/catalog/index.ts";
import type { SyncCoordinator } from "../../infrastructure/sync/SyncCoordinator.ts";
import type { PersonalBestRepository, PersonalBestUpdate } from "../../domain/personalBests/types.ts";
import { createChallengeSignature } from "../../domain/personalBests/challengeSignature.ts";
import { DOMAINS, SKILLS } from "../../content/catalog/index.ts";
import { isFixedPersonalBestEligible } from "../../domain/personalBests/eligibility.ts";
import { modeEligible } from "../../domain/session/challengeContent.ts";
import type { LearningShortcutReference, LearningStageReference, StageStars } from "../../domain/learningPath/types.ts";
import { findLearningShortcut, findLearningStage, matchesLearningPathSettings, matchesStageSkills } from "../../domain/learningPath/sessionProgress.ts";
import { scoreStageResult, shortcutPassed as scoreShortcutPassed } from "../../domain/learningPath/scoring.ts";
import { LEARNING_PATHS } from "../../content/learningPaths.ts";

export type SessionStartResult = { session: PracticeSession; masteryBefore: Record<string, MasterySnapshot>; previousBest: import("../../domain/personalBests/types.ts").PersonalBest | null };
export type SessionFinishResult = { masteryAfter: Record<string, MasterySnapshot>; personalBest: PersonalBestUpdate | null; stageStars?: StageStars; shortcutPassed?: boolean };

function createSessionId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `sess-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export class StudentPracticeService {
  private readonly attempts: AttemptRepository;
  private readonly sessions: SessionRepository;
  private readonly personalBests: PersonalBestRepository;
  private readonly sync: SyncCoordinator;

  constructor(attempts: AttemptRepository, sessions: SessionRepository, personalBests: PersonalBestRepository, sync: SyncCoordinator) {
    this.attempts = attempts;
    this.sessions = sessions;
    this.personalBests = personalBests;
    this.sync = sync;
  }

  async snapshot(studentId: string, skillIds: readonly string[]): Promise<Record<string, MasterySnapshot>> {
    return Object.fromEntries(await Promise.all(skillIds.map(async (skillId) => {
      const attempts = await this.attempts.getAttemptsForSkill(studentId, skillId);
      const skill = getSkillById(skillId);
      return [skillId, projectMastery({ studentId, skillId, attempts, fluencyEnabled: skill?.fluency?.enabled ?? false, evidencePolicy: skill?.evidencePolicy })] as const;
    })));
  }

  async start(input: { studentId: string; skillIds: string[]; settings: SessionSettings; assignmentId?: string; learningStage?: LearningStageReference; learningShortcut?: LearningShortcutReference }): Promise<SessionStartResult> {
    if (input.learningStage && input.learningShortcut) throw new Error("A session cannot be both a stage and a chapter shortcut");
    if (input.learningStage) {
      const stage = findLearningStage(LEARNING_PATHS, input.learningStage);
      if (!stage || !matchesStageSkills(stage, input.skillIds) || !matchesLearningPathSettings(input.settings) || input.assignmentId) {
        throw new Error("Invalid learning-stage session scope");
      }
    }
    if (input.learningShortcut) {
      const chapter = findLearningShortcut(LEARNING_PATHS, input.learningShortcut);
      if (!chapter?.shortcutTest || !matchesStageSkills(chapter.shortcutTest, input.skillIds) || !matchesLearningPathSettings(input.settings) || input.assignmentId) {
        throw new Error("Invalid learning-shortcut session scope");
      }
    }
    const selectedSkills = input.skillIds.map((id) => getSkillById(id));
    if (selectedSkills.some((skill) => !skill || !skill.active || !modeEligible(skill, input.settings))) throw new Error("One or more skills are not eligible for this session mode");
    const masteryBefore = await this.snapshot(input.studentId, input.skillIds);
    const session = createPracticeSession({ id: createSessionId(), studentId: input.studentId, selectedSkillIds: input.skillIds, settings: input.settings, startedAt: Date.now(), source: input.assignmentId ? "assignment" : "freePractice", assignmentId: input.assignmentId, ...(input.learningStage ? { learningStage: { ...input.learningStage } } : {}), ...(input.learningShortcut ? { learningShortcut: { ...input.learningShortcut } } : {}) });
    const signature = createChallengeSignature(session.settings, session.selectedSkillIds, DOMAINS, SKILLS);
    const previousBest = signature ? await this.personalBests.get(session.studentId, signature) : null;
    await this.sessions.saveSession({ ...session, source: session.source ?? "freePractice", strategy: "balanced", status: "active", questionCount: 0, correctCount: 0, incorrectCount: 0, accuracy: 0 });
    void this.sync.flush();
    return { session, masteryBefore, previousBest };
  }

  async finish(state: PracticeSessionState): Promise<SessionFinishResult> {
    const correctCount = state.results.filter((result) => result.isCorrect).length;
    const incorrectCount = state.results.length - correctCount;
    const accuracy = state.results.length ? correctCount / state.results.length : 0;
    const durationMs = state.elapsedDurationMs ?? (state.endedAt === undefined ? undefined : Math.max(0, state.endedAt - state.session.startedAt));
    const challengeCompleted = isSuccessfulSessionCompletion(state);
    const stage = state.session.learningStage ? findLearningStage(LEARNING_PATHS, state.session.learningStage) : undefined;
    const shortcutChapter = state.session.learningShortcut ? findLearningShortcut(LEARNING_PATHS, state.session.learningShortcut) : undefined;
    const stageStars = challengeCompleted && stage ? scoreStageResult(stage, state.results) : undefined;
    const shortcutPassed = challengeCompleted && shortcutChapter ? scoreShortcutPassed(shortcutChapter, state.results) : undefined;
    await this.sessions.saveSession({ ...state.session, source: state.session.source ?? "freePractice", strategy: "balanced", endedAt: state.endedAt, endReason: state.endReason, durationMs, status: challengeCompleted ? "completed" : "abandoned", questionCount: state.results.length, correctCount, incorrectCount, accuracy, gameScore: state.session.settings.mode === "fixed" ? durationMs : state.session.settings.mode === "timed" || state.session.settings.mode === "survival" ? correctCount : undefined, ...(stageStars !== undefined ? { stageStars } : {}), ...(shortcutPassed !== undefined ? { shortcutPassed } : {}) });
    const signature = challengeCompleted ? createChallengeSignature(state.session.settings, state.session.selectedSkillIds, DOMAINS, SKILLS) : null;
    const fixedEligible = state.session.settings.mode !== "fixed" || isFixedPersonalBestEligible(accuracy, durationMs);
    const score = state.session.settings.mode === "fixed" ? durationMs : correctCount;
    const personalBest = signature && fixedEligible && score !== undefined ? await this.personalBests.record({ studentId: state.session.studentId, signature, bestScore: score, achievedAt: new Date(state.endedAt ?? Date.now()).toISOString(), sessionId: state.session.id, metrics: { attempted: state.results.length, correct: correctCount, incorrect: incorrectCount, accuracy, durationMs } }) : null;
    const masteryAfter = await this.snapshot(state.session.studentId, state.session.selectedSkillIds);
    void this.sync.flush();
    return { masteryAfter, personalBest, ...(stageStars !== undefined ? { stageStars } : {}), ...(shortcutPassed !== undefined ? { shortcutPassed } : {}) };
  }
}
