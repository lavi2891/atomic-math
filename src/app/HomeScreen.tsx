import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { he } from "@copy/he";
import { listTopics } from "@domain/topics/registry";
import { colors, fontSize, radius, spacing } from "@ui/tokens";
import { statsRepo } from "./statsRepoInstance";
import { TopicSkillTile } from "./TopicSkillTile";

type Props = {
  onQuickPractice: () => void;
  onPracticeByTopic: () => void;
};

const MIN_ATTEMPTS = 10;

export function HomeScreen({ onQuickPractice, onPracticeByTopic }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const topics = listTopics();
  const stats = statsRepo.getAll();
  const skillByTopic = stats.skillByTopic;
  const topicAgg = stats.topicAgg;
  const topicTiles = topics.map((topic) => {
    const skill01 = skillByTopic[topic.id] ?? 0.5;
    return {
      topic,
      skill01,
      displayRating: Math.round(skill01 * 1000),
    };
  });

  const eligibleTopics = topics.filter(
    (topic) => (topicAgg[topic.id]?.attempts ?? 0) >= MIN_ATTEMPTS,
  );
  const overallSkill01 =
    eligibleTopics.length > 0
      ? eligibleTopics.reduce(
          (sum, topic) => sum + (skillByTopic[topic.id] ?? 0.5),
          0,
        ) / eligibleTopics.length
      : null;
  const overallDisplay =
    overallSkill01 === null ? null : Math.round(overallSkill01 * 1000);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const containerEl = container;

    function handleWheel(event: globalThis.WheelEvent) {
      if (event.deltaY === 0) return;
      event.preventDefault();
      containerEl.scrollLeft += event.deltaY;
    }

    containerEl.addEventListener("wheel", handleWheel, { passive: false });
    return () => containerEl.removeEventListener("wheel", handleWheel);
  }, []);

  function handleMouseDown(event: MouseEvent<HTMLDivElement>) {
    const container = scrollRef.current;
    if (!container) return;

    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = container.scrollLeft;
  }

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    const container = scrollRef.current;
    if (!container || !isDraggingRef.current) return;

    const deltaX = event.clientX - dragStartXRef.current;
    container.scrollLeft = dragStartScrollLeftRef.current - deltaX;
  }

  function stopDragging() {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
  }

  return (
    <section style={{ display: "grid", gap: spacing.md }}>
      <header style={{ display: "grid", gap: spacing.sm }}>
        <h1 style={{ margin: 0, color: colors.text }}>{he.app.name}</h1>
        <p style={{ margin: 0, color: colors.textMuted }}>{he.app.tagline}</p>

        <div
          style={{
            border: `1px solid ${colors.borderSubtle}`,
            borderRadius: radius.md,
            padding: spacing.sm,
            background: colors.bgSubtle,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: spacing.sm,
            color: colors.text,
          }}
          aria-label="home-skill-summary"
        >
          <span style={{ color: colors.textMuted, fontSize: fontSize.sm }}>
            {he.home.overallSkill}
          </span>
          <strong>{overallDisplay ?? "—"}</strong>
        </div>
      </header>

      <section style={{ display: "grid", gap: spacing.sm }}>
        <h2 style={{ margin: 0, color: colors.text }}>{he.home.topicsSkill}</h2>
        <div
          ref={scrollRef}
          className={`homeTopicScroll hideScrollbar${isDragging ? " dragging" : ""}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          style={{
            display: "flex",
            gap: spacing.md,
            scrollSnapType: "x mandatory",
            paddingInline: spacing.md,
            paddingBottom: spacing.sm,
            WebkitOverflowScrolling: "touch",
          }}
        >
          {topicTiles.map((item) => (
            <TopicSkillTile
              key={item.topic.id}
              topic={item.topic}
              displayRating={item.displayRating}
            />
          ))}
        </div>
      </section>

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
