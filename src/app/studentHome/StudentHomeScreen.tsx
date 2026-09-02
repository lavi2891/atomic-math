import { DOMAINS, SKILLS, getSkillById } from "../../content/catalog/index.ts";
import type { SkillQuestionDefinition } from "@domain/session/skillQuestionSelector";
import type { StudentHomeData } from "@domain/studentHome/types";
import { contentBackedCatalog } from "@domain/studentHome/contentAvailability";
import {
  deriveSkillDisplayState,
  evidenceLabels,
  fluencyLabel,
  isAssignmentComplete,
  skillDisplayLabels,
  sortAssignments,
} from "@domain/studentHome/deriveStudentHome";
import { colors, radius, spacing } from "@ui/tokens";

type Props = {
  data: StudentHomeData;
  definitions: readonly SkillQuestionDefinition[];
  onStartAssignment: (skillId: string, assignmentId: string) => void;
  onOpenDomain: (domainId: string) => void;
};

export function StudentHomeScreen({ data, definitions, onStartAssignment, onOpenDomain }: Props) {
  const catalog = contentBackedCatalog(DOMAINS, SKILLS, definitions);
  const assignments = sortAssignments(data.assignments);
  const connectionText = data.connection === "online" ? "מסונכרן" : data.connection === "offline" ? "עובדים במצב לא מקוון" : "שמירה מקומית";

  return (
    <section style={{ display: "grid", gap: 22 }}>
      <header style={{ display: "grid", gap: spacing.xs }}>
        <h1 style={{ margin: 0 }}>{data.student?.displayName ? `שלום ${data.student.displayName}` : "Atomic Math"}</h1>
        <small style={{ color: colors.textMuted }}>{connectionText}</small>
        {data.warning ? <small style={{ color: colors.textMuted }}>{data.warning}</small> : null}
      </header>

      <section style={{ display: "grid", gap: spacing.sm }}>
        <h2 style={{ margin: 0 }}>העבודה שלי</h2>
        {assignments.length === 0 ? (
          <p style={{ margin: 0, color: colors.textMuted }}>אין כרגע משימות. אפשר לבחור תרגול חופשי.</p>
        ) : assignments.map((assignment) => {
          const skill = getSkillById(assignment.skillId);
          const snapshot = data.masteryBySkill[assignment.skillId];
          const complete = isAssignmentComplete(assignment, snapshot);
          const targetReachedWithoutEvidence = !!snapshot && snapshot.mastery >= assignment.targetMastery && snapshot.evidenceLevel !== "established";
          return (
            <article key={assignment.assignmentId} style={{ border: `1px solid ${complete ? colors.topicGreen : colors.borderSubtle}`, borderRadius: radius.md, padding: spacing.md, background: colors.bgSubtle, display: "grid", gap: spacing.xs }}>
              <strong>{skill?.nameHe ?? assignment.skillId}</strong>
              <span>שליטה: {Math.round(snapshot?.mastery ?? 0)}%</span>
              <span>היעד שלך: {assignment.targetMastery}%</span>
              <small style={{ color: colors.textMuted }}>{snapshot ? evidenceLabels[snapshot.evidenceLevel] : evidenceLabels.insufficient}</small>
              {targetReachedWithoutEvidence ? <small>עוד קצת תרגול כדי לקבוע שליטה יציבה.</small> : null}
              {complete ? <small style={{ color: colors.topicGreen }}>היעד הושג במדידה יציבה</small> : null}
              <button type="button" onClick={() => onStartAssignment(assignment.skillId, assignment.assignmentId)} style={{ justifySelf: "start", border: 0, borderRadius: radius.md, padding: `${spacing.sm}px ${spacing.md}px`, background: colors.topicGreen, color: "#08130b", fontWeight: 700, cursor: "pointer" }}>
                {complete ? "תרגול נוסף" : "התחל"}
              </button>
            </article>
          );
        })}
      </section>

      <section style={{ display: "grid", gap: spacing.sm }}>
        <h2 style={{ margin: 0 }}>תרגול חופשי</h2>
        <div style={{ display: "grid", gap: spacing.sm }}>
          {catalog.map(({ domain, skills }) => (
            <button key={domain.id} type="button" onClick={() => onOpenDomain(domain.id)} style={{ textAlign: "start", border: `1px solid ${colors.border}`, borderRadius: radius.md, padding: spacing.md, background: colors.bgSubtle, color: colors.text, cursor: "pointer" }}>
              <strong style={{ display: "block", fontSize: 18 }}>{domain.nameHe}</strong>
              <small>{skills.length} מיומנויות זמינות</small>
            </button>
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gap: spacing.sm }}>
        <h2 style={{ margin: 0 }}>מפת המיומנויות שלי</h2>
        {catalog.map(({ domain, skills }) => (
          <section key={domain.id} style={{ display: "grid", gap: spacing.xs }}>
            <h3 style={{ marginBottom: spacing.xs }}>{domain.nameHe}</h3>
            {skills.map((skill) => {
              const snapshot = data.masteryBySkill[skill.id];
              const state = deriveSkillDisplayState(snapshot);
              const fluency = skill.fluency?.enabled ? fluencyLabel(snapshot) : null;
              return (
                <article key={skill.id} style={{ border: `1px solid ${colors.borderSubtle}`, borderRadius: radius.md, padding: spacing.sm, background: colors.bgSubtle, display: "flex", justifyContent: "space-between", alignItems: "center", gap: spacing.sm }}>
                  <span><strong style={{ display: "block" }}>{skill.nameHe}</strong><small style={{ color: colors.textMuted }}>{skillDisplayLabels[state]}{fluency ? ` · ${fluency}` : ""}</small></span>
                  <span>{snapshot?.attemptCount ? `${Math.round(snapshot.mastery)}%` : "—"}</span>
                </article>
              );
            })}
          </section>
        ))}
      </section>
    </section>
  );
}
