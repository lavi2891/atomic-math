import type { Topic } from "@domain/topics/types";
import { TopicIcon } from "@ui/icons";
import { colors, fontSize, radius, spacing } from "@ui/tokens";

type Props = {
  topic: Topic;
  displayRating: number;
};

const TILE_WIDTH_PX = 80;
const TILE_MIN_HEIGHT_PX = 100;
const ICON_SIZE_PX = 40;
const RATING_FONT_SIZE_PX = 22;

export function TopicSkillTile({ topic, displayRating }: Props) {
  const accent = colors[topic.colorToken as keyof typeof colors] ?? colors.text;

  return (
    <article
      style={{
        flex: "0 0 auto",
        width: TILE_WIDTH_PX,
        minHeight: TILE_MIN_HEIGHT_PX,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.md,
        padding: spacing.md,
        background: colors.bgSubtle,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        scrollSnapAlign: "start",
        textAlign: "center",
      }}
      aria-label={topic.title}
    >
      <header style={{ width: "100%", minWidth: 0 }}>
        <strong
          style={{
            display: "block",
            fontSize: fontSize.sm,
            color: colors.textMuted,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {topic.title}
        </strong>
      </header>

      <div
        style={{
          display: "flex",
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: accent, display: "inline-flex" }}>
          <TopicIcon name={topic.icon} size={ICON_SIZE_PX} />
        </span>
      </div>

      <footer>
        <strong
          style={{
            color: colors.text,
            fontSize: RATING_FONT_SIZE_PX,
            lineHeight: 1,
          }}
        >
          {displayRating}
        </strong>
      </footer>
    </article>
  );
}
