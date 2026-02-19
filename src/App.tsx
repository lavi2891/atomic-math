import { useMemo, useState } from "react";
import { PlaygroundScreen } from "@app/PlaygroundScreen";
import { HomeScreen } from "@app/HomeScreen";
import { TopicsScreen } from "@app/TopicsScreen";
import { SessionView } from "@app/session/SessionView";
import { SIGNED_NUMBERS_QUESTIONS } from "@domain/questions/bank/SIGNED_NUMBERS";
import type { Question } from "@domain/questions/types";
import type { AnswerResult } from "@domain/results/types";
import type { TopicId } from "@domain/topics/types";
import { getTopicById } from "@domain/topics/registry";
import { he } from "@copy/he";
import { styles } from "@ui/styles";
import { colors, radius, spacing } from "@ui/tokens";

type Screen = "home" | "topics" | "session" | "summary";

function selectQuestions(topicId: TopicId): Question[] {
  // TODO: replace hardcoded question selection with domain buildSession()
  switch (topicId) {
    case "SIGNED_NUMBERS":
      return SIGNED_NUMBERS_QUESTIONS.slice(0, 5);
    default:
      return [];
  }
}

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
  const [lastResults, setLastResults] = useState<AnswerResult[] | undefined>();

  if (showPlayground) {
    return <PlaygroundScreen />;
  }

  function startSession(topicId: TopicId) {
    const questions = selectQuestions(topicId);
    setActiveTopicId(topicId);
    setActiveQuestions(questions);
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
  const answeredCount = lastResults?.length ?? 0;
  const correctCount =
    lastResults?.filter((result) => result.isCorrect).length ?? 0;

  return (
    <div className="page" style={styles.page} dir="rtl">
      <div className="phone" style={styles.phone}>
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
              onSessionEnd={(results) => {
                setLastResults(results);
                setScreen("summary");
              }}
            />
          ) : null}

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
                <div>{`נענו: ${answeredCount}`}</div>
                <div>{`נכונות: ${correctCount}`}</div>
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
                Back to Home
              </button>
            </section>
          ) : null}
        </main>
      </div>
    </div>
  );
}
