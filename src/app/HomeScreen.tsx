import { he } from "@copy/he";
import { colors, fontSize, radius, spacing } from "@ui/tokens";

type Props = {
  onQuickPractice: () => void;
  onPracticeByTopic: () => void;
};

export function HomeScreen({ onQuickPractice, onPracticeByTopic }: Props) {
  return (
    <section style={{ display: "grid", gap: spacing.md }}>
      <header style={{ display: "grid", gap: spacing.sm }}>
        <h1 style={{ margin: 0 }}>{he.app.name}</h1>
        <p style={{ margin: 0, color: colors.textMuted }}>{he.app.tagline}</p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: spacing.sm,
          }}
          aria-label="stats-placeholder"
        >
          {/* TODO: Wire real user stats once persistence/auth exist */}
          <div
            style={{
              border: `1px solid ${colors.borderSubtle}`,
              borderRadius: radius.md,
              padding: spacing.sm,
              background: colors.bgSubtle,
              display: "grid",
              justifyItems: "center",
              gap: spacing.xs,
            }}
          >
            <span style={{ color: colors.textMuted, fontSize: fontSize.sm }}>
              {" "}
            </span>
            <strong>0</strong>
          </div>

          <div
            style={{
              border: `1px solid ${colors.borderSubtle}`,
              borderRadius: radius.md,
              padding: spacing.sm,
              background: colors.bgSubtle,
              display: "grid",
              justifyItems: "center",
              gap: spacing.xs,
            }}
          >
            <span style={{ color: colors.textMuted, fontSize: fontSize.sm }}>
              {" "}
            </span>
            <strong>0</strong>
          </div>
        </div>
      </header>

      <section style={{ display: "grid", gap: spacing.sm }}>
        <button
          type="button"
          onClick={onQuickPractice}
          style={{
            width: "100%",
            textAlign: "start",
            border: `1px solid ${colors.border}`,
            borderRadius: radius.md,
            padding: spacing.md,
            background: colors.bgSubtle,
            cursor: "pointer",
            fontSize: fontSize.md,
          }}
        >
          {he.home.quickPractice}
        </button>

        <button
          type="button"
          onClick={onPracticeByTopic}
          style={{
            width: "100%",
            textAlign: "start",
            border: `1px solid ${colors.border}`,
            borderRadius: radius.md,
            padding: spacing.md,
            background: colors.bgSubtle,
            cursor: "pointer",
            fontSize: fontSize.md,
          }}
        >
          {he.home.practiceByTopic}
        </button>
      </section>

      <section style={{ display: "grid", gap: spacing.sm }}>
        <h2 style={{ margin: 0 }}>{he.home.challenges}</h2>

        {/* TODO: Implement daily/weekly/monthly challenge modes */}
        {[he.challenges.daily, he.challenges.weekly, he.challenges.monthly].map(
          (challenge) => (
            <article
              key={challenge}
              aria-disabled
              style={{
                border: `1px solid ${colors.borderSubtle}`,
                borderRadius: radius.md,
                padding: spacing.sm,
                background: colors.bgSubtle,
                opacity: 0.7,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: spacing.sm,
              }}
            >
              <span>{challenge}</span>
              <small style={{ color: colors.textMuted }}>{he.common.comingSoon}</small>
            </article>
          ),
        )}
      </section>
    </section>
  );
}
