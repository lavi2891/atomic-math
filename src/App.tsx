import { useMemo, useState } from "react";
import { PlaygroundScreen } from "@app/PlaygroundScreen";
import { HomeScreen } from "@app/HomeScreen";
import { TopicsScreen } from "@app/TopicsScreen";
import { SessionView } from "@app/session/SessionView";
import type { Question } from "@domain/questions/types";
import type { AnswerResult } from "@domain/results/types";
import { buildSession } from "@domain/session/buildSession";
import type { TopicId } from "@domain/topics/types";
import { getTopicById } from "@domain/topics/registry";
import { he } from "@copy/he";
import { styles } from "@ui/styles";
import { colors, radius, spacing } from "@ui/tokens";
import { statsRepo } from "@app/statsRepoInstance";
import { selectQuestionPool } from "@app/questionPools";
import { getSummaryCounts } from "@app/summary/summaryUtils";
import { theme } from "./theme/theme";

type Screen = "home" | "topics" | "session" | "summary";
const DEFAULT_SESSION_LENGTH = 5;

export default function App() {
  const showPlayground = useMemo(
    () => new URLSearchParams(window.location.search).get("playground") === "1",
    [],
  );
  const [screen, setScreen] = useState<Screen>("home");
  const [activeTopicId, setActiveTopicId] = useState<TopicId | undefined>();
  const [activeQuestions, setActiveQuestions] = useState<
    Question[] | undefined
  >();
  const [initialTargetDifficulty, setInitialTargetDifficulty] = useState(0);
  const [lastResults, setLastResults] = useState<AnswerResult[] | undefined>();

  if (showPlayground) {
    return <PlaygroundScreen />;
  }

  function startSession(topicId: TopicId) {
    const skill01 = statsRepo.getTopicSkill(topicId);
    const session = buildSession({
      topicId,
      questions: selectQuestionPool(topicId),
      length: DEFAULT_SESSION_LENGTH,
      skill01,
      rated: true,
    });

    setActiveTopicId(topicId);
    setActiveQuestions(session.questions);
    setInitialTargetDifficulty(session.initialTargetDifficulty);
    setLastResults(undefined);
    setScreen("session");
  }

  function backToHome() {
    setScreen("home");
    setActiveTopicId(undefined);
    setActiveQuestions(undefined);
  }

  const topicTitle = activeTopicId
    ? (getTopicById(activeTopicId)?.title ?? activeTopicId)
    : undefined;
  const { answeredCount, correctCount } = getSummaryCounts(lastResults);

  return (
    <div className="page" style={styles.page} dir="rtl">
      <div className="phone" style={{ ...styles.phone, color: theme.colors.text }}>
        <main style={styles.content}>
          {screen === "home" ? (
            <HomeScreen
              onPracticeByTopic={() => setScreen("topics")}
              onQuickPractice={() => {
                // TODO: replace with recommendation logic and daily practice later
                startSession("SIGNED_NUMBERS");
              }}
            />
          ) : null}

          {screen === "topics" ? (
            <TopicsScreen
              onBack={() => setScreen("home")}
              onStartTopic={startSession}
            />
          ) : null}

          {screen === "session" ? (
            <SessionView
              questions={activeQuestions ?? []}
              initialTargetDifficulty={initialTargetDifficulty}
              onSessionEnd={(results) => {
                setLastResults(results);
                setScreen("summary");
              }}
            />
          ) : null}

          {/* TODO: Replace this simple summary with SessionSummary component (accuracy %, avg time, review) */}
          {screen === "summary" ? (
            <section style={{ display: "grid", gap: spacing.md }}>
              <h2 style={{ margin: 0 }}>{topicTitle ?? he.topics.title}</h2>
              <div
                style={{
                  border: `1px solid ${colors.borderSubtle}`,
                  borderRadius: radius.md,
                  padding: spacing.md,
                  background: colors.bgSubtle,
                  display: "grid",
                  gap: spacing.sm,
                }}
              >
                <div>{`${he.summary.answered} ${answeredCount}`}</div>
                <div>{`${he.summary.correct} ${correctCount}`}</div>
              </div>

              <button
                type="button"
                onClick={backToHome}
                style={{
                  border: `1px solid ${colors.border}`,
                  borderRadius: radius.md,
                  padding: `${spacing.sm}px ${spacing.md}px`,
                  background: colors.bgSubtle,
                  cursor: "pointer",
                }}
              >
                {he.summary.backToHome}
              </button>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}
