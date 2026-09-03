import { useCallback, useEffect, useMemo, useState } from "react";
import { QuestionView } from "../questions/QuestionView.tsx";
import { ContentRenderer } from "../../ui/ContentRenderer.tsx";
import { DOMAINS, SKILLS, SKILL_GROUPS } from "../../content/catalog/index.ts";
import { FOUNDATIONAL_QUESTIONS } from "../../content/foundations/questions.ts";
import { CONTENT_READINESS } from "../../content/readiness.ts";
import { isGeneratedQuestionDefinition } from "../../domain/questions/definitions.ts";
import type { Question } from "../../domain/questions/types.ts";
import {
  deterministicRandomIndex,
  EMPTY_REVIEW_FILTERS,
  expectedAnswer,
  filterReviewDefinitions,
  flaggedCuratedFamilies,
  generatedSampleBatch,
  isEditableEventTarget,
  navigationIndex,
  parseReviewDeepLink,
  resolveReviewQuestion,
  reviewDeepLink,
  reviewIndexAfterMark,
  reviewProgress,
  type ReviewFilters,
} from "./reviewModel.ts";
import { createAuthorReviewRepository, type QuestionReviewRecord, type ReviewStatus } from "./reviewState.ts";
import { answerSemanticsLabel, deriveBandSummaries, familyAuthoringNote, generatorVariables, summarizeConstraints } from "./generatorSummary.ts";
import "./contentReview.css";

const catalog = { domains: DOMAINS, skills: SKILLS, skillGroups: SKILL_GROUPS };
const statusLabels: Record<ReviewStatus, string> = { approved: "מאושר", "needs-fix": "דורש תיקון", rejected: "נדחה" };

function uniqueValues(values: Array<string | undefined>): string[] {
  return [...new Set(values.filter((value): value is string => !!value))].sort((left, right) => left.localeCompare(right));
}

function FilterSelect({ label, value, values, onChange, labels = {} }: { label: string; value: string; values: string[]; onChange: (value: string) => void; labels?: Record<string, string> }) {
  return <label className="review-filter"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}><option value="">הכול</option>{values.map((item) => <option key={item} value={item}>{labels[item] ?? item}</option>)}</select></label>;
}

function ExpectedAnswerView({ question }: { question: Question }) {
  if (question.type === "numeric") return <span dir="ltr">{question.correctAnswers.join(" / ")}</span>;
  const ids = question.type === "singleChoice" ? [question.correctOptionId] : question.correctOptionIds;
  const options = question.options.filter((option) => ids.includes(option.id));
  return <span>{options.map((option) => <span key={option.id} className="review-inline-answer"><code>{option.id}</code> <ContentRenderer content={option.content} /></span>)}</span>;
}

export function QuestionReviewScreen() {
  const [repository] = useState(createAuthorReviewRepository);
  const [filters, setFilters] = useState<ReviewFilters>(() => parseReviewDeepLink(window.location.search));
  const [records, setRecords] = useState<Map<string, QuestionReviewRecord>>(new Map());
  const [index, setIndex] = useState(0);
  const [seed, setSeed] = useState(1);
  const [reproduceNonce, setReproduceNonce] = useState(0);
  const [randomNonce, setRandomNonce] = useState(0);
  const [showDetails, setShowDetails] = useState(true);
  const [showExpected, setShowExpected] = useState(false);
  const [showBatch, setShowBatch] = useState(false);
  const [draftNotes, setDraftNotes] = useState<Map<string, string>>(new Map());
  const [message, setMessage] = useState("");

  useEffect(() => { void repository.list().then((items) => setRecords(new Map(items.map((item) => [item.definitionId, item])))); }, [repository]);

  const filtered = useMemo(() => filterReviewDefinitions(FOUNDATIONAL_QUESTIONS, filters, records, catalog), [filters, records]);
  const currentIndex = Math.min(index, Math.max(0, filtered.length - 1));
  const currentDefinition = filtered[currentIndex];
  const currentQuestion = useMemo(() => currentDefinition ? resolveReviewQuestion(currentDefinition, seed) : null, [currentDefinition, seed]);
  const currentRecord = currentDefinition ? records.get(currentDefinition.id) : undefined;
  const note = currentDefinition ? draftNotes.get(currentDefinition.id) ?? currentRecord?.note ?? "" : "";
  const flaggedFamilies = useMemo(() => flaggedCuratedFamilies(FOUNDATIONAL_QUESTIONS), []);
  const scopeDefinitions = useMemo(() => filterReviewDefinitions(FOUNDATIONAL_QUESTIONS, { ...filters, reviewStatus: "all" }, records, catalog), [filters, records]);
  const progress = useMemo(() => reviewProgress(scopeDefinitions, records), [scopeDefinitions, records]);

  useEffect(() => { window.history.replaceState(null, "", reviewDeepLink(filters)); }, [filters]);

  const navigate = useCallback((action: "first" | "previous" | "next" | "last") => {
    setIndex((current) => navigationIndex(action, current, filtered.length));
  }, [filtered.length]);

  async function mark(status: ReviewStatus) {
    if (!currentDefinition) return;
    const record = await repository.save(currentDefinition.id, status, note);
    setRecords((current) => new Map(current).set(record.definitionId, record));
    setMessage(`${statusLabels[status]} — נשמר מקומית`);
    setIndex((current) => reviewIndexAfterMark(current, filtered.length, filters.reviewStatus, status));
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (isEditableEventTarget(event.target) || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key === "ArrowLeft") { event.preventDefault(); navigate("previous"); }
      else if (event.key === "ArrowRight") { event.preventDefault(); navigate("next"); }
      else if (event.key.toLowerCase() === "a" && currentDefinition) { event.preventDefault(); void repository.save(currentDefinition.id, "approved", note).then((record) => { setRecords((current) => new Map(current).set(record.definitionId, record)); setMessage("מאושר — נשמר מקומית"); setIndex((current) => reviewIndexAfterMark(current, filtered.length, filters.reviewStatus, "approved")); }); }
      else if (event.key.toLowerCase() === "f" && currentDefinition) { event.preventDefault(); void repository.save(currentDefinition.id, "needs-fix", note).then((record) => { setRecords((current) => new Map(current).set(record.definitionId, record)); setMessage("דורש תיקון — נשמר מקומית"); setIndex((current) => reviewIndexAfterMark(current, filtered.length, filters.reviewStatus, "needs-fix")); }); }
      else if (event.key.toLowerCase() === "r" && currentDefinition) { event.preventDefault(); void repository.save(currentDefinition.id, "rejected", note).then((record) => { setRecords((current) => new Map(current).set(record.definitionId, record)); setMessage("נדחה — נשמר מקומית"); setIndex((current) => reviewIndexAfterMark(current, filtered.length, filters.reviewStatus, "rejected")); }); }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentDefinition, filtered.length, filters.reviewStatus, navigate, note, repository]);

  function updateFilter<K extends keyof ReviewFilters>(key: K, value: ReviewFilters[K]) {
    setFilters((current) => ({ ...current, [key]: value })); setIndex(0);
  }

  async function saveNote() {
    if (!currentDefinition || !currentRecord) { setMessage("יש לבחור סטטוס כדי לשמור הערה"); return; }
    const record = await repository.save(currentDefinition.id, currentRecord.status, note);
    setRecords((current) => new Map(current).set(record.definitionId, record)); setMessage("ההערה נשמרה מקומית");
  }

  async function clearReview() {
    if (!currentDefinition) return;
    await repository.clear(currentDefinition.id);
    setRecords((current) => { const next = new Map(current); next.delete(currentDefinition.id); return next; });
    setDraftNotes((current) => { const next = new Map(current); next.delete(currentDefinition.id); return next; });
    setMessage("הסטטוס אופס ללא נבדק");
  }

  function chooseGeneratedBand(band: string) {
    if (!currentDefinition?.contentFamily) return;
    setFilters((current) => ({ ...current, skillId: currentDefinition.skillId, contentFamily: currentDefinition.contentFamily ?? "", difficultyBand: band }));
    setIndex(0); setSeed(1);
  }

  function exportReviewState() {
    const payload = JSON.stringify([...records.values()].sort((left, right) => left.definitionId.localeCompare(right.definitionId)), null, 2);
    const url = URL.createObjectURL(new Blob([payload], { type: "application/json" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `atomic-math-question-review-${new Date().toISOString().slice(0, 10)}.json`; anchor.click(); URL.revokeObjectURL(url);
  }

  const availableGroups = SKILL_GROUPS.filter((group) => !filters.domainId || group.domainId === filters.domainId);
  const availableSkills = SKILLS.filter((skill) => !filters.domainId || skill.domainId === filters.domainId);
  const domainLabels = Object.fromEntries(DOMAINS.map((domain) => [domain.id, domain.nameHe]));
  const groupLabels = Object.fromEntries(SKILL_GROUPS.map((group) => [group.id, group.nameHe]));
  const skillLabels = Object.fromEntries(SKILLS.map((skill) => [skill.id, `${skill.nameHe} — ${skill.id}`]));
  const categoryLabels = { calculation: "חישוב", conceptual: "מושגי", reasoning: "הנמקה", representation: "ייצוג" };
  const authoringLabels = { generated: "generated", curated: "curated" };
  const reviewLabels = { unreviewed: "רק לא נבדקו", approved: "רק מאושרות", "needs-fix": "רק דורשות תיקון", rejected: "רק נדחו" };
  const currentSkill = currentDefinition ? SKILLS.find((skill) => skill.id === currentDefinition.skillId) : undefined;
  const currentDomain = currentSkill ? DOMAINS.find((domain) => domain.id === currentSkill.domainId) : undefined;
  const currentGroups = currentSkill ? SKILL_GROUPS.filter((group) => group.skillIds.includes(currentSkill.id as never)) : [];
  const readiness = currentSkill ? CONTENT_READINESS.find((entry) => entry.skillId === currentSkill.id) : undefined;
  const availableBands = currentDefinition?.contentFamily ? uniqueValues(FOUNDATIONAL_QUESTIONS.filter((item) => item.skillId === currentDefinition.skillId && item.contentFamily === currentDefinition.contentFamily).map((item) => item.difficultyBand)) : [];
  const batch = currentDefinition && showBatch ? generatedSampleBatch(currentDefinition, seed, 10) : [];
  const activeFamilyDefinitions = filters.contentFamily ? filtered.filter((item) => item.contentFamily === filters.contentFamily) : [];
  const variables = currentDefinition && isGeneratedQuestionDefinition(currentDefinition) ? generatorVariables(currentDefinition) : [];
  const constraints = currentDefinition && isGeneratedQuestionDefinition(currentDefinition) ? summarizeConstraints(currentDefinition.constraints) : null;
  const bandSummaries = currentDefinition ? deriveBandSummaries(FOUNDATIONAL_QUESTIONS, currentDefinition) : [];
  const familyNote = familyAuthoringNote(currentDefinition?.contentFamily);

  return <main className="question-review" dir="rtl">
    <header className="review-header"><div><p className="review-eyebrow">כלי פיתוח · לא לתלמידים</p><h1>ביקורת שאלות Atomic Math</h1></div><div className="review-progress" aria-live="polite"><strong>{progress.reviewed}/{progress.total}</strong><span>{progress.approved} מאושרות</span><span>{progress["needs-fix"]} לתיקון</span><span>{progress.rejected} נדחו</span><button type="button" onClick={exportReviewState}>ייצוא JSON</button></div></header>
    <nav className="review-navigation" aria-label="ניווט בין definitions"><button onClick={() => navigate("first")}>ראשון</button><button onClick={() => navigate("previous")}>הקודם</button><strong>Question / Definition {filtered.length ? currentIndex + 1 : 0} מתוך {filtered.length}</strong><button onClick={() => navigate("next")}>הבא</button><button onClick={() => navigate("last")}>אחרון</button><button onClick={() => { setRandomNonce((value) => value + 1); setIndex(deterministicRandomIndex(currentIndex, filtered.length, randomNonce)); }}>אקראי</button><div className="review-view-toggle"><button type="button" aria-pressed={!showDetails} onClick={() => setShowDetails(false)}>Student View</button><button type="button" aria-pressed={showDetails} onClick={() => setShowDetails(true)}>Reviewer Details</button></div></nav>

    <div className="review-workspace">
      <aside className="review-panel review-sidebar review-filters-pane"><h2>מסננים</h2><div className="review-controls" aria-label="מסנני ביקורת">
        <FilterSelect label="Domain" value={filters.domainId} values={DOMAINS.map((item) => item.id)} labels={domainLabels} onChange={(value) => updateFilter("domainId", value)} />
        <FilterSelect label="Skill Group" value={filters.skillGroupId} values={availableGroups.map((item) => item.id)} labels={groupLabels} onChange={(value) => updateFilter("skillGroupId", value)} />
        <FilterSelect label="Skill אטומי" value={filters.skillId} values={availableSkills.map((item) => item.id)} labels={skillLabels} onChange={(value) => updateFilter("skillId", value)} />
        <FilterSelect label="קטגוריה" value={filters.category} values={uniqueValues(FOUNDATIONAL_QUESTIONS.map((item) => item.category))} labels={categoryLabels} onChange={(value) => updateFilter("category", value)} />
        <FilterSelect label="סוג קלט" value={filters.questionType} values={["numeric", "singleChoice", "multiChoice"]} onChange={(value) => updateFilter("questionType", value)} />
        <FilterSelect label="Difficulty Band" value={filters.difficultyBand} values={["A", "B", "C", "D"]} onChange={(value) => updateFilter("difficultyBand", value)} />
        <FilterSelect label="Authoring mode" value={filters.authoringMode} values={["generated", "curated"]} labels={authoringLabels} onChange={(value) => updateFilter("authoringMode", value)} />
        <FilterSelect label="curationReason" value={filters.curationReason} values={uniqueValues(FOUNDATIONAL_QUESTIONS.map((item) => isGeneratedQuestionDefinition(item) ? undefined : item.curationReason))} onChange={(value) => updateFilter("curationReason", value)} />
        <FilterSelect label="contentFamily" value={filters.contentFamily} values={uniqueValues(FOUNDATIONAL_QUESTIONS.map((item) => item.contentFamily))} onChange={(value) => updateFilter("contentFamily", value)} />
        <FilterSelect label="סטטוס ביקורת" value={filters.reviewStatus === "all" ? "" : filters.reviewStatus} values={["unreviewed", "approved", "needs-fix", "rejected"]} labels={reviewLabels} onChange={(value) => updateFilter("reviewStatus", (value || "all") as ReviewFilters["reviewStatus"])} />
        <button type="button" onClick={() => { setFilters(EMPTY_REVIEW_FILTERS); setIndex(0); }}>ניקוי מסננים</button>
      </div>{filters.contentFamily ? <div className="review-family"><strong><code>{filters.contentFamily}</code></strong><span>{activeFamilyDefinitions.filter((item) => item.authoringMode === "curated").length} curated</span><span>{activeFamilyDefinitions.filter(isGeneratedQuestionDefinition).length} generators</span>{flaggedFamilies.has(filters.contentFamily) ? <mark>סומנה לביקורת דמיון</mark> : null}</div> : null}</aside>

      <section className="review-center-pane">{!currentDefinition || !currentQuestion ? <div className="review-panel"><p>אין definitions שמתאימים למסננים.</p></div> : <>
        <div className="review-panel review-question-shell"><div className="review-question-card"><QuestionView key={`${currentQuestion.id}:${reproduceNonce}`} question={currentQuestion} onNext={() => navigate("next")} /></div><div className="review-answer-actions"><button type="button" onClick={() => setShowExpected((value) => !value)}>הצג תשובה</button>{showExpected ? <div className="review-expected"><strong>תשובה צפויה:</strong> <ExpectedAnswerView question={currentQuestion} /><small>{answerSemanticsLabel(currentQuestion)} · canonical: <code>{expectedAnswer(currentQuestion)}</code></small></div> : null}</div>
          {isGeneratedQuestionDefinition(currentDefinition) ? <div className="review-generator-tools"><label>Seed <input type="number" value={seed} onChange={(event) => setSeed(Math.max(0, Number(event.target.value) || 0))} /></label><button type="button" onClick={() => setSeed((value) => value + 1)}>דוגמה חדשה</button><button type="button" onClick={() => setReproduceNonce((value) => value + 1)}>אותה דוגמה שוב</button>{availableBands.length > 1 ? <label>Band <select value={currentDefinition.difficultyBand} onChange={(event) => chooseGeneratedBand(event.target.value)}>{availableBands.map((band) => <option key={band}>{band}</option>)}</select></label> : null}<button type="button" onClick={() => setShowBatch((value) => !value)}>הצג דוגמאות ברמה זו</button></div> : null}</div>
        {batch.length ? <div className="review-panel review-batch-panel"><h2>דוגמאות ברמה {currentDefinition.difficultyBand} · seeds {seed}–{seed + batch.length - 1}</h2><div className="review-batch">{batch.map((sample) => <button type="button" key={sample.id} onClick={() => { setSeed(sample.generatorSeed ?? seed); setShowBatch(false); }}><small>seed {sample.generatorSeed}</small><ContentRenderer content={sample.prompt} /><strong dir="ltr">{expectedAnswer(sample)}</strong></button>)}</div></div> : null}
      </>}</section>

      <aside className="review-panel review-sidebar review-details-pane">{currentDefinition && currentQuestion ? <>
        {showDetails ? <div className="review-details"><section className="review-human-summary"><h2>איך השאלה בנויה</h2><p><strong>{currentSkill?.nameHe}</strong> · {currentDefinition.category} · Band {currentDefinition.difficultyBand}</p><p><strong>סוג תשובה:</strong> {answerSemanticsLabel(currentQuestion)}</p>{familyNote?.rationaleHe ? <p><strong>מטרה פדגוגית:</strong> {familyNote.rationaleHe}</p> : null}
          {isGeneratedQuestionDefinition(currentDefinition) ? <><h3>משתנים</h3><table><thead><tr><th>משתנה</th><th>ערכים אפשריים</th></tr></thead><tbody>{variables.map((variable) => <tr key={variable.name}><td><code>{variable.name}</code></td><td>{variable.valuesLabel}</td></tr>)}</tbody></table>{constraints?.humanReadable.length ? <><h3>תנאים</h3><ul>{constraints.humanReadable.map((constraint) => <li key={constraint}>{constraint}</li>)}</ul></> : null}<h3>הבדלים בין רמות</h3><div className="review-band-summaries">{bandSummaries.map((summary) => <article key={summary.band} data-current={summary.band === currentDefinition.difficultyBand}><strong>רמה {summary.band}</strong>{summary.variables.map((variable) => <small key={variable.name}><code>{variable.name}</code>: {variable.valuesLabel}</small>)}{summary.changesFromPrevious.length ? <ul>{summary.changesFromPrevious.map((change) => <li key={change}>{change}</li>)}</ul> : <small>רמת הבסיס למשפחה זו</small>}</article>)}</div>{familyNote?.difficultyNoteHe ? <p><strong>הערת קושי:</strong> {familyNote.difficultyNoteHe}</p> : null}</> : <><p><strong>contentFamily:</strong> <code>{currentDefinition.contentFamily}</code></p><p><strong>סיבת curation:</strong> {currentDefinition.curationReason}</p>{currentQuestion.type !== "numeric" ? <><h3>מסיחים ומיסקונספציות</h3><table><thead><tr><th>אפשרות</th><th>מיסקונספציה</th></tr></thead><tbody>{currentQuestion.options.filter((option) => option.id !== (currentQuestion.type === "singleChoice" ? currentQuestion.correctOptionId : "") && option.misconceptionId).map((option) => <tr key={option.id}><td><ContentRenderer content={option.content} /></td><td><code>{option.misconceptionId}</code>{option.misconceptionRationale ? <small>{option.misconceptionRationale}</small> : null}</td></tr>)}</tbody></table></> : null}</>}
        </section><details className="review-technical"><summary>פרטים טכניים</summary><dl><dt>definition ID</dt><dd><code>{currentDefinition.id}</code></dd><dt>instance ID</dt><dd><code>{currentQuestion.id}</code></dd><dt>contentFamily</dt><dd><code>{currentDefinition.contentFamily}</code>{currentDefinition.contentFamily && flaggedFamilies.has(currentDefinition.contentFamily) ? <mark>משפחה שסומנה</mark> : null}</dd><dt>authoringMode</dt><dd>{currentDefinition.authoringMode}</dd><dt>Domain / Skill Group</dt><dd>{currentDomain?.id} / {currentGroups.map((group) => group.id).join(", ") || "—"}</dd><dt>difficulty</dt><dd>{currentQuestion.difficulty ?? "—"} · Band {currentDefinition.difficultyBand}</dd><dt>tags</dt><dd>{currentDefinition.tags?.join(", ") ?? "—"}</dd><dt>raw params</dt><dd><pre>{isGeneratedQuestionDefinition(currentDefinition) ? JSON.stringify(currentDefinition.params, null, 2) : "—"}</pre></dd><dt>raw constraints</dt><dd><pre>{isGeneratedQuestionDefinition(currentDefinition) ? JSON.stringify(currentDefinition.constraints ?? [], null, 2) : "—"}</pre></dd><dt>technical-only constraints</dt><dd>{constraints?.technicalOnly.join(" | ") || "—"}</dd><dt>seed / structure</dt><dd>{isGeneratedQuestionDefinition(currentDefinition) ? `${seed} / ${currentDefinition.structureKey}` : "—"}</dd><dt>generator metadata</dt><dd><pre>{isGeneratedQuestionDefinition(currentDefinition) ? JSON.stringify(currentDefinition.metadata ?? {}, null, 2) : "—"}</pre></dd><dt>readiness</dt><dd>{readiness ? `${readiness.strategy}; humanReviewed(source)=${readiness.humanReviewed}` : "—"}</dd></dl></details></div> : <p className="review-student-mode-note">Student View פעיל. התצוגה במרכז נשארת זהה לתלמיד; לחצו Reviewer Details להצגת הסיכום.</p>}
        <section className="review-state"><div><strong>סטטוס:</strong> {currentRecord ? statusLabels[currentRecord.status] : "לא נבדק"}{currentRecord ? <small> · {new Date(currentRecord.reviewedAt).toLocaleString("he-IL")}</small> : null}</div><textarea value={note} onChange={(event) => setDraftNotes((current) => new Map(current).set(currentDefinition.id, event.target.value))} placeholder="הערת מבקר קצרה…" rows={2} /><div><button className="approve" type="button" onClick={() => void mark("approved")}>A · אישור והבא</button><button className="fix" type="button" onClick={() => void mark("needs-fix")}>F · לתיקון</button><button className="reject" type="button" onClick={() => void mark("rejected")}>R · דחייה</button><button type="button" onClick={() => void saveNote()}>שמירת הערה</button>{currentRecord ? <button type="button" onClick={() => void clearReview()}>איפוס</button> : null}</div>{message ? <p role="status">{message}</p> : null}<small>←/→ ניווט · A אישור · F תיקון · R דחייה</small></section>
      </> : null}</aside>
    </div>
  </main>;
}

export default QuestionReviewScreen;
