import { he } from "@copy/he";
import { listTopics } from "@domain/topics/registry";
import { colors, fontSize, radius, spacing } from "@ui/tokens";
import { statsRepo } from "./statsRepoInstance";

type Props = {
  onQuickPractice: () => void;
  onPracticeByTopic: () => void;
};

export function HomeScreen({ onQuickPractice, onPracticeByTopic }: Props) {
  const topicSkills = statsRepo.getAllTopicSkills();
  const skillEntries = Object.entries(topicSkills);
  const overallSkill =
    skillEntries.length > 0
      ? skillEntries.reduce((sum, [, value]) => sum + value, 0) /
        skillEntries.length
      : null;

  const topicTitleById = new Map<string, string>(
    listTopics().map((topic) => [topic.id, topic.title]),
  );
  const weakestTopics = skillEntries
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)
    .map(([topicId, skill]) => ({
      topicId,
      skill,
      title: topicTitleById.get(topicId) ?? topicId,
    }));

  return (
    <section style={{ display: "grid", gap: spacing.md }}>
      <header style={{ display: "grid", gap: spacing.sm }}>
        <h1 style={{ margin: 0, color: colors.text }}>{he.app.name}</h1>
        <p style={{ margin: 0, color: colors.textMuted }}>{he.app.tagline}</p>

        <div
          style={{
            display: "grid",
            gap: spacing.sm,
          }}
          aria-label="home-skill-summary"
        >
          <div
            style={{
              border: `1px solid ${colors.borderSubtle}`,
              borderRadius: radius.md,
              padding: spacing.sm,
              background: colors.bgSubtle,
              display: "grid",
              alignItems: "center",
              gap: spacing.xs,
              color: colors.text,
            }}
          >
            <span style={{ color: colors.textMuted, fontSize: fontSize.sm }}>
              {he.home.overallSkill}
            </span>
            <strong>
              {overallSkill === null ? "—" : overallSkill.toFixed(2)}
            </strong>
          </div>

          <div
            style={{
              border: `1px solid ${colors.borderSubtle}`,
              borderRadius: radius.md,
              padding: spacing.sm,
              background: colors.bgSubtle,
              display: "grid",
              gap: spacing.xs,
              color: colors.text,
            }}
          >
            <span style={{ color: colors.textMuted, fontSize: fontSize.sm }}>
              {he.home.strengthen}
            </span>
            {weakestTopics.length > 0 ? (
              <div style={{ display: "grid", gap: spacing.xs }}>
                {weakestTopics.map((topic) => (
                  <small key={topic.topicId}>
                    {topic.title}: {topic.skill.toFixed(2)}
                  </small>
                ))}
              </div>
            ) : (
              <small style={{ color: colors.textMuted }}>—</small>
            )}
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
            color: colors.text,
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
            color: colors.text,
          }}
        >
          {he.home.practiceByTopic}
        </button>
      </section>

      <section style={{ display: "grid", gap: spacing.sm }}>
        <h2 style={{ margin: 0, color: colors.text }}>{he.home.challenges}</h2>

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
                color: colors.text,
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
