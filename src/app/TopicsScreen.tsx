import { he } from "@copy/he";
import { listTopicsByGrade } from "@domain/topics/registry";
import type { GradeId, TopicId } from "@domain/topics/types";
import { colors, radius, spacing } from "@ui/tokens";
import { TopicCard } from "./TopicCard";

type Props = {
  onBack: () => void;
  onStartTopic: (topicId: TopicId) => void;
  selectedGrade: GradeId;
};

const ENABLED_TOPIC_IDS: TopicId[] = ["SIGNED_NUMBERS"];

const GRADE_LABELS: Record<GradeId, string> = {
  GRADE_7: he.topics.grade7,
  GRADE_8: he.topics.grade8,
  GRADE_9: he.topics.grade9,
  GRADE_10: he.topics.grade10,
};

export function TopicsScreen({ onBack, onStartTopic, selectedGrade }: Props) {
  const topics = listTopicsByGrade(selectedGrade);

  // TODO: Replace hardcoded topic availability logic with hasQuestions(topicId)

  return (
    <section style={{ display: "grid", gap: spacing.md }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: spacing.sm,
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            border: `1px solid ${colors.border}`,
            borderRadius: radius.md,
            padding: `${spacing.xs}px ${spacing.md}px`,
            background: colors.bgSubtle,
            cursor: "pointer",
          }}
        >
          {he.common.back}
        </button>

        <h2 style={{ margin: 0 }}>{`${he.topics.title} - ${GRADE_LABELS[selectedGrade]}`}</h2>
      </header>

      <div style={{ display: "grid", gap: spacing.md }}>
        {topics.length === 0 ? (
          <article
            style={{
              border: `1px solid ${colors.borderSubtle}`,
              borderRadius: radius.md,
              padding: spacing.md,
              background: colors.bgSubtle,
            }}
          >
            {he.common.comingSoon}
          </article>
        ) : (
          topics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onStart={onStartTopic}
              disabled={!ENABLED_TOPIC_IDS.includes(topic.id)}
            />
          ))
        )}
      </div>
    </section>
  );
}
