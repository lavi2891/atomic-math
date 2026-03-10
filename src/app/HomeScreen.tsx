import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { he } from "@copy/he";
import { listTopicsByGrade } from "@domain/topics/registry";
import type { GradeId } from "@domain/topics/types";
import { colors, fontSize, radius, spacing } from "@ui/tokens";
import { statsRepo } from "./statsRepoInstance";
import { TopicSkillTile } from "./TopicSkillTile";

type Props = {
  selectedGrade?: GradeId;
  onSelectGrade: (gradeId: GradeId) => void;
  onQuickPractice: () => void;
  onPracticeByTopic: () => void;
  onChangeGrade: () => void;
};

const GRADE_OPTIONS: Array<{ id: GradeId; label: string }> = [
  { id: "GRADE_7", label: he.topics.grade7 },
  { id: "GRADE_8", label: he.topics.grade8 },
  { id: "GRADE_9", label: he.topics.grade9 },
  { id: "GRADE_10", label: he.topics.grade10 },
];

const MIN_ATTEMPTS = 10;

export function HomeScreen({
  selectedGrade,
  onSelectGrade,
  onQuickPractice,
  onPracticeByTopic,
  onChangeGrade,
}: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !selectedGrade) return;
    const containerEl = container;

    function handleWheel(event: globalThis.WheelEvent) {
      if (event.deltaY === 0) return;
      event.preventDefault();
      containerEl.scrollLeft += event.deltaY;
    }

    containerEl.addEventListener("wheel", handleWheel, { passive: false });
    return () => containerEl.removeEventListener("wheel", handleWheel);
  }, [selectedGrade]);

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

  if (!selectedGrade) {
    return (
      <section style={{ display: "grid", gap: spacing.md }}>
        <header style={{ display: "grid", gap: spacing.sm }}>
          <h1 style={{ margin: 0, color: colors.text }}>{he.app.name}</h1>
          <p style={{ margin: 0, color: colors.textMuted }}>{he.app.tagline}</p>
        </header>

        <section style={{ display: "grid", gap: spacing.sm }}>
          <h2 style={{ margin: 0, color: colors.text }}>{he.home.selectGrade}</h2>
          <p
            style={{
              margin: 0,
              color: colors.textMuted,
              fontSize: fontSize.sm,
            }}
          >
            {he.home.selectGradeDescription}
          </p>

          {GRADE_OPTIONS.map((grade) => (
            <button
              key={grade.id}
              type="button"
              onClick={() => onSelectGrade(grade.id)}
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
              {grade.label}
            </button>
          ))}
        </section>
      </section>
    );
  }

  const topics = listTopicsByGrade(selectedGrade);
  const stats = statsRepo.getAll();
  const skillByTopic = stats.skillByTopic;
  const topicAgg = stats.topicAgg;
  const topicTiles = topics.map((topic) => {
    const skill01 = skillByTopic[topic.id] ?? 0;
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
          (sum, topic) => sum + (skillByTopic[topic.id] ?? 0),
          0,
        ) / eligibleTopics.length
      : null;
  const overallDisplay =
    overallSkill01 === null ? null : Math.round(overallSkill01 * 1000);

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: spacing.sm,
          }}
        >
          <h2 style={{ margin: 0, color: colors.text }}>{he.home.topicsSkill}</h2>
          <button
            type="button"
            onClick={onChangeGrade}
            style={{
              border: `1px solid ${colors.border}`,
              borderRadius: radius.md,
              padding: `${spacing.xs}px ${spacing.md}px`,
              background: colors.bgSubtle,
              cursor: "pointer",
              color: colors.text,
            }}
          >
            {he.home.selectGrade}
          </button>
        </div>

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
