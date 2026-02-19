import { he } from "@copy/he";
import { listTopics } from "@domain/topics/registry";
import type { TopicId } from "@domain/topics/types";
import { colors, radius, spacing } from "@ui/tokens";
import { TopicCard } from "./TopicCard";

type Props = {
  onBack: () => void;
  onStartTopic: (topicId: TopicId) => void;
};

export function TopicsScreen({ onBack, onStartTopic }: Props) {
  const topics = listTopics();

  // TODO: Replace hardcoded topic availability logic with hasQuestions(topicId)
  const enabledTopicIds: TopicId[] = ["SIGNED_NUMBERS"];

  // TODO: Add real stats per topic once persistence layer is implemented
  // TODO: Add visual empty-state when no topics exist
  // TODO: Add support for topic filtering by grade (future feature)

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

        <h2 style={{ margin: 0 }}>{he.topics.title}</h2>
      </header>

      <div style={{ display: "grid", gap: spacing.md }}>
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            onStart={onStartTopic}
            disabled={!enabledTopicIds.includes(topic.id)}
          />
        ))}
      </div>
    </section>
  );
}
