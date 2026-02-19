import type { Topic, TopicId } from "@domain/topics/types";
import { TopicIcon } from "@ui/icons";
import { colors, radius, spacing } from "@ui/tokens";
import { theme } from "../theme/theme";
import { he } from "@copy/he";

type Props = {
  topic: Topic;
  onStart: (topicId: TopicId) => void;
  disabled?: boolean;
};

export function TopicCard({ topic, onStart, disabled = false }: Props) {
  const topicColor =
    theme.colors[topic.colorToken as keyof typeof theme.colors] ??
    theme.colors.primary;

  return (
    <article
      style={{
        border: `1px solid ${colors.borderSubtle}`,
        borderRadius: radius.md,
        padding: spacing.md,
        background: colors.bgSubtle,
        display: "grid",
        gap: spacing.sm,
        opacity: disabled ? 0.6 : 1,
      }}
      aria-disabled={disabled}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: spacing.sm,
        }}
      >
        <span style={{ color: topicColor, display: "inline-flex" }}>
          <TopicIcon name={topic.icon} size={28} />
        </span>
        <strong>{topic.title}</strong>
      </div>

      <div
        style={{
          height: 4,
          borderRadius: 999,
          background: topicColor,
        }}
      />

      <button
        type="button"
        onClick={() => {
          if (disabled) return;
          onStart(topic.id);
        }}
        disabled={disabled}
        style={{
          justifySelf: "start",
          border: `1px solid ${colors.border}`,
          borderRadius: radius.md,
          padding: `${spacing.xs}px ${spacing.md}px`,
          background: colors.bgSubtle,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {disabled ? he.topics.comingSoon : he.topics.start}
      </button>
    </article>
  );
}
