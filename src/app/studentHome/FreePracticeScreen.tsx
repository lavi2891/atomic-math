import type { CSSProperties } from "react";
import { DOMAINS, SKILLS } from "../../content/catalog/index.ts";
import type { SkillQuestionDefinition } from "../../domain/session/skillQuestionSelector.ts";
import { contentBackedCatalog } from "../../domain/studentHome/contentAvailability.ts";
import { TopicIcon } from "../../ui/icons/TopicIcon.tsx";
import type { TopicIconName } from "../../ui/icons/types.ts";
import { colors } from "../../ui/tokens.ts";

type Props = { definitions: readonly SkillQuestionDefinition[]; onBack: () => void; onOpenDomain: (domainId: string) => void };

export function FreePracticeScreen({ definitions, onBack, onOpenDomain }: Props) {
  const catalog = contentBackedCatalog(DOMAINS, SKILLS, definitions);
  return <section className="setup-screen free-practice-screen">
    <header className="section-header"><button type="button" className="quiet-button" onClick={onBack}>חזרה לבית</button><h1>תרגול חופשי</h1></header>
    <p>מה רוצים לתרגל?</p>
    {catalog.length ? catalog.map(({ domain }) => <button key={domain.id} type="button" className="domain-launch" style={{ "--domain-accent": colors[domain.colorToken as keyof typeof colors] ?? colors.topicBlue } as CSSProperties} onClick={() => onOpenDomain(domain.id)}>
      <span className="domain-icon" aria-hidden="true"><TopicIcon name={domain.icon as TopicIconName} size={28} /></span>
      <span>{domain.nameHe}</span><span aria-hidden="true">←</span>
    </button>) : <p role="status">אין כרגע תוכן זמין לתרגול.</p>}
  </section>;
}
