# Atomic Math — current-state audit

Audit date: **2026-09-06**. Source baseline: **`3a4ce60b7910322f00ef2a0aac8fef9274baf526`**, local `master`. This is a documentation-only audit; no application changes, push, or deployment were performed.

## Executive summary

- **What works today:** Hebrew/RTL student Home, a Numbers & Algebra path with seven chapters and 23 stages, five-question stage/checkpoint/shortcut sessions, best-star progression, free practice, answer evaluation, completion/review screens, IndexedDB history, and an author-facing Question Review tool. The active source bank has **27 Skills and 181 definitions: 178 generated, three curated**. Fixed and unrestricted Practice have content for all 27 Skills. Timed/Survival engines work, but some selectable Skill/mode combinations have no eligible questions.
- **What remains local-only:** the published app uses `local-student` and a **null backend client**. Its Attempts, sessions, stars, personal bests, and author reviews remain in the browser. Even after connecting the current backend, stars/path outcomes, personal bests, complete category/band evidence, historical question review, and multi-device history restoration are not supported end to end.
- **What is classroom-ready:** a supervised, device-local foundational practice demonstration using Fixed/Practice, with tested narrow-screen layouts. This is an engineering assessment of the available workflow, not a claim of pedagogical approval or a completed classroom pilot. **135 active definitions carry `requires-rereview`**; browser-local approvals were not inspected.
- **What blocks tracked classroom deployment:** shared temporary identity, no deployed backend connection, no application authorization for student/admin APIs, lossy backend schemas, and no teacher dashboard. Broader student use also needs the empty challenge scopes and impossible evidence requirements described below resolved.
- **What should happen next:** establish identity and persistence requirements, reconcile backend/evidence contracts, resolve launch and review-readiness gaps, connect a test classroom, then add teacher visibility and conduct a controlled pilot before expanding curriculum.

**Source versus deployment matters.** The public site was read directly during this audit. Its student bundle uses IndexedDB version **2**, contains literacy tracking, and lacks riddle submission/optional-content wiring. Current source uses version **3** and includes those additions. The live bundle is therefore behind local source. Exact deployed source commit was not established; no private Google account or Sheet was accessed.

## Audit method and scope

Implementation findings below come from executable catalog imports, application/domain/infrastructure code, Apps Script schemas and handlers, existing tests, and read-only public deployment inspection. Links point to source files relative to this report. Historical plans are treated as plans, not implementation evidence. Local browser student records, author approvals, physical mobile keyboards, and a real Sheets write/read cycle were not inspected. The pre-existing untracked `.codex-remote-attachments/` directory is outside the report change.

## 1. Product architecture

The product is a React/TypeScript/Vite client. [App.tsx](../src/App.tsx) selects student, author-review, or playground mode. [StudentApp.tsx](../src/app/StudentApp.tsx) composes student screens; application services orchestrate domain rules and repositories. Domain code implements questions, sessions, evidence, and progression. Infrastructure supplies IndexedDB and optional Apps Script transport.

| Area | Current implementation and status |
|---|---|
| Student Home | **Implemented.** Two path cards, Continue, five-question quick check, free-practice entry, compact progress. No student mastery dashboard on Home. Quick check prioritizes usable assignments, then learning needs, then foundational Skills. |
| Courses/paths | **Partial.** Numbers & Algebra is populated. Geometry is a real route/card with coming-soon content and zero chapters/Skills. Paths are presentation sequences independent of catalog Domains. |
| Chapters/stages | **Implemented.** Seven chapters, 18 normal stages, one review, three checkpoints, one optional bonus. Each stage references atomic Skills. |
| Stars/progression | **Implemented locally.** Best 0–3 stars per stage; one star passes. Prerequisite-stage completion or shortcut bypass opens later required stages. Stars do not award Mastery. |
| Checkpoints | **Implemented.** Ordinary five-question Fixed sessions over combined Skills; scored like stages. No separate adaptive assessment engine. |
| Shortcut tests | **Implemented locally.** Two authored chapter shortcuts; five questions, default 80% pass; bypass lead-up required stages, retain checkpoint. |
| Free practice/challenges | **Implemented with content eligibility gaps.** Domain and Skill/Group selection plus Fixed, Timed, Survival, Practice. No standalone daily/weekly/monthly challenge product. |
| Session flow | **Implemented.** Scope/settings → generated or curated question → check → feedback → next/automatic advance → session persistence → summary. |
| Completion/review | **Implemented in current session memory.** Stage and shortcut have focused outcomes; generic sessions have compact results, replay, wrong-answer review and optional detail. Historical review after reload is absent. |
| Teacher-facing | **Partial.** Question author-review UI and backend assignment/student/mastery primitives. No teacher dashboard, student roster screen, or assignment editor. |
| Optional branches | **Implemented in source, absent from inspected live bundle.** One riddle and one external calculator resource; see section 11. |

Primary evidence: [learningPaths.ts](../src/content/learningPaths.ts), [StudentHomeScreen.tsx](../src/app/studentHome/StudentHomeScreen.tsx), [SessionSummaryScreen.tsx](../src/app/session/SessionSummaryScreen.tsx).

## 2. Real routes and navigation

Production origin: `https://lavi2891.github.io`; Vite base: **`/atomic-math/`**. Local Vite uses the same base, normally at `http://localhost:5173/atomic-math/` (port can vary).

| Screen | Real production URL |
|---|---|
| Home | [Home](https://lavi2891.github.io/atomic-math/) |
| Numbers & Algebra | [Numbers & Algebra](https://lavi2891.github.io/atomic-math/course/numbers-algebra) |
| Geometry | [Geometry](https://lavi2891.github.io/atomic-math/course/geometry) |
| Question Review | [Question Review](https://lavi2891.github.io/atomic-math/?review=questions) |
| Playground | [Playground](https://lavi2891.github.io/atomic-math/?playground=1) — author/developer tool, reachable in production; not authorization-protected. |

Review filters serialize as query parameters: `domain`, `group`, `skill`, `category`, `literacy`, `type`, `band`, `authoringMode`, `curationReason`, `contentFamily`, `status`. Example: `?review=questions&skill=FRAC_MEANING&band=B`. Review takes precedence over playground when both switches occur. There is no `/review`, `/teacher`, `/session/:id`, `/assignment/:id`, or separate free-practice/setup/summary URL.

**History behavior:** Home → course pushes a course entry. A direct course load without Atomic Math history state first inserts a synthetic Home entry, so Back returns to Home. Starting a session pushes a `view: "session"` history entry at the **same course URL**, or at Home for quick/free practice. Completion stays on that entry. Return refreshes Home/progression and normally calls `history.back()`; stage/shortcut outcomes therefore return to their originating course. Replay replaces the session entry and retains scope, mode, assignment and path context.

**Direct links and Pages:** `public/404.html` encodes the requested path/query/hash as `?__spa=...`, redirects to the base, and `main.tsx` restores recognized routes before React mounts. A direct course HTTP request returned **404 with the intended redirect HTML**, not a server-rendered course page; a JavaScript browser performs the recovery. Home returned HTTP 200. The fallback hardcodes `/atomic-math/`, so a base/repository rename must update both Vite and this file. Unknown course slugs are not accepted; the app can fall back to Home while retaining an unknown URL/redirect query rather than showing a dedicated not-found page.

**Navigation debt observed in code:**

- Free practice, setup, dialogs, summary subviews, and review filters do not form a full route hierarchy. Free-practice in-app Back works, but browser Back does not walk through each setup screen. A free-practice session's return normally reaches Home rather than its previous setup.
- Refreshing a session URL opens its course/Home; no active-session reconstruction occurs. The saved active session is not automatically abandoned or resumed.
- Browser Back during a live session unmounts `SessionView` without calling stop/finish. Forward can remount the retained session object with a fresh engine/clock and empty results under the same session ID, while prior Attempts remain. This follows from `onPopState` and hook initialization; the existing Back tests verify destination, not this resume case.
- The direct-course Home insertion depends on existing `history.state`; it is not a general history-stack repair. Top-level query-mode switching is not managed by a shared reactive router.

Evidence: [studentRouting.ts](../src/app/studentRouting.ts), [routing.ts](../src/app/routing.ts), [StudentApp.tsx](../src/app/StudentApp.tsx), [404.html](../public/404.html), [main.tsx](../src/main.tsx).

## 3. Learning-path model and persistence

[Types](../src/domain/learningPath/types.ts): `LearningPath { id, nameHe, chapters[] }`; `Chapter { id, nameHe, stages[], shortcutTest?, optionalNodes? }`; `Stage { id, nameHe, type, skillIds, scoring? }`. IDs are stable; array order determines sequence. There is no stored numeric position or fixed chapter length. `normal`, `review`, and `checkpoint` are required; `bonus` is optional. Required status is derived from type, not a separate `required` property.

| Numbers & Algebra chapter | Authored stages in order |
|---|---|
| Numbers/basic operations | `NA_PLACE_VALUE`, `NA_ADD_SUBTRACT`, `NA_DECIMAL_REVIEW`, `NA_DECIMAL_CHECKPOINT` |
| Multiplication/division | `NA_FACTS_2_5_10`, `NA_FACTS_3_4`, `NA_FACTS_6_7`, `NA_FACTS_8_9`, optional `NA_FACTORS_BONUS` |
| Order of operations | `NA_OPERATION_ORDER_BASIC` |
| Signed numbers | `NA_NUMBER_LINE`, `NA_COMPARE_NEGATE`, `NA_INTEGER_ADD_SUBTRACT`, `NA_INTEGER_MULTIPLY_DIVIDE`, `NA_INTEGERS_CHECKPOINT` |
| Fractions | `NA_FRACTION_MEANING`, `NA_EQUIVALENT_FRACTIONS` |
| Algebra foundations | `NA_EQUALITY`, `NA_VARIABLE`, `NA_SUBSTITUTION` |
| Equations | `NA_ADDITIVE_EQUATIONS`, `NA_MULTIPLICATIVE_EQUATIONS`, `NA_EQUATIONS_CHECKPOINT` |

The `NA_DECIMAL_*` IDs refer to whole-number base-ten structure/basic arithmetic, not a decimal-fraction course.

Unlocking requires all earlier required stages across chapters to be completed by ≥1 star or bypass. Bonuses open at their position but never gate the next stage. Previously completed stages remain replayable if another required stage is inserted earlier. Catalog prerequisites/supporting Skills are advisory and do not gate direct practice. No adaptive insertion engine exists.

Default star thresholds are 60%, 80%, 90%. With five answers, that means 3/5 → one, 4/5 → two, 5/5 → three stars. A scoring policy can override thresholds or cap higher rewards based on correct-answer median time; **no current stage declares a fluency target**. Best stars never decrease. Total stars sum current authored stage bests once, ignore stale unknown IDs, include the bonus, and have a current maximum of **69**. Shortcut display stars are not included in that total.

`NA_DECIMAL_SHORTCUT` covers place value/add/subtract; `NA_INTEGERS_SHORTCUT` covers compare/subtract/divide. Passing (normally ≥4/5) bypasses required stages before the chapter's first checkpoint; it does not award stage stars or bypass that checkpoint/bonus. Bypassed nodes remain accessible with zero earned stars. Passing and replaying create ordinary atomic Attempts. Shortcut failure does not remove existing bypasses.

`StudentLearningProgress` contains `studentId`, `bestStarsByStage`, optional `bypassedStageIds` and `passedShortcutIds`. It is **rederived from local saved sessions**, not stored independently. Restoration accepts completed, normally ended, five-question Fixed path sessions with matching current Skill scope. Legacy completed stage sessions without `stageStars` get one star. Abandoned/quick/free sessions do not award progression. Changing authored scope can cause older outcomes to stop matching; stage identity/content migration is not a versioned subsystem.

**Visible window:** up to four required stages behind and four ahead of the focus plus focus, with bonuses inside that span. “שלבים קודמים” expands older history by four. Chapter landmarks appear when their first required stage is visible; optional chapter nodes appear when that chapter has visible stages. Rows reverse in DOM order so progress goes upward; initial scroll centers focus. A noninteractive “עוד בדרך” continuation node appears when authored future required stages lie outside the window. This is presentation windowing over a fully loaded static array, not network lazy loading, a virtualized infinite list, or generated future curriculum. Expanded history is component state and resets on remount/focus change.

Evidence: [progression.ts](../src/domain/learningPath/progression.ts), [scoring.ts](../src/domain/learningPath/scoring.ts), [sessionProgress.ts](../src/domain/learningPath/sessionProgress.ts), [pathViewport.ts](../src/app/learningPath/pathViewport.ts), [LearningPathScreen.tsx](../src/app/learningPath/LearningPathScreen.tsx).

## 4. Session modes

| Mode | Termination | Feedback/advance | Score and personal best |
|---|---|---|---|
| Fixed | 5/10/15/20 answers; default free-practice count 10, path/quick count 5. Last answer completes when advanced. Explicit stop can abandon. | Inline feedback, explicit **הבא** or Enter. | Stored game score is duration in ms. Best is lower duration with ≥90% accuracy and successful completion. Time includes review/advance pauses. |
| Timed | Monotonic elapsed deadline: 30/60/120/180 seconds, default 60; explicit stop abandons. | Inline feedback for 450 ms; automatic advance; clock continues during feedback/background time. | Correct-answer count; higher is better. Only genuine timer completion is eligible for a best. |
| Survival | Configured incorrect-answer limit; current UI uses three errors. Explicit stop abandons. | Same 450 ms automatic feedback. Lives track incorrect results. | Correct-answer count before errors run out; higher is better. |
| Practice | No count/time/error completion; user stops. Saved status is `abandoned` because there is no challenge completion condition, even for intentional normal practice termination. | Inline feedback and explicit Next. | Results/accuracy still recorded; no personal best or game score. |

All modes offer generic replay, wrong-answer review and return actions after ending. Stage/shortcut completions use specialized screens when scored; stage offers continue, retry, stage summary; shortcut offers return/continue, retry, test summary. Replays create a new session with cloned settings/Skill scope/context, not the same generated questions. Generic summary has Skill mastery-before/after details behind “דוח מפורט”. Wrong-only review is default; all answers can be shown. It uses in-memory `questionSnapshot`, including the exact presented generated instance.

Personal-best keys isolate student, mode, count/duration/error limit, and one Skill or the **entire active Domain**. Arbitrary partial multi-Skill selections have no best. Timed/Survival also include profile ID/version; Fixed has no content/profile version. Most multi-Skill path clusters consequently have no personal best; no best is not a persistence failure.

**Timed early-termination verification:** `isSessionComplete` never ends Timed on answer count. Reducer deadline checks reject premature expiry and legacy non-user stop reasons. The engine generates on demand; failed candidates can reuse prior valid instances from the same selected scope. Supply failure never reports successful completion. Existing tests passed for more questions than the initial bank, a missing next Skill after two answers at six seconds of a 30-second session, persistent selector exceptions, and timer expiry during feedback. Thus **a running playable Timed session does not normally terminate early from count/pool exhaustion**. A wholly empty scope before the first question instead raises an application error; that is a separate real launch defect.

**Challenge eligibility mismatch:** `SessionSetupScreen`/`StudentPracticeService.start` check catalog flags, while `filterChallengeContent` additionally requires profile categories/bands and `short-item` tags. Executable inventory found:

- Timed: 14 Skills advertise eligibility, but `INT_ADD`, `INT_SUB`, `INT_MUL`, `INT_DIV` have **zero** matching definitions; ten arithmetic fact Skills have content.
- Survival: 27 advertise eligibility; **15** have no matching definitions: `AR_PLACE_VALUE`, all seven `INT_*` Skills, both `FRAC_*`, all three `ALG_*`, both `EQ_*`. The remaining 12 are arithmetic Skills other than place value and `OPS_ORDER_BASIC`.
- Reproduction from current wiring: free practice → Signed Numbers → Timed → select a signed-operation Skill → start. Start can save an active session, then initial question supply throws and the ErrorBoundary requests a refresh. No first question exists to cache/reuse.

Evidence: [practiceSession.ts](../src/domain/session/practiceSession.ts), [useSessionEngine.ts](../src/app/session/useSessionEngine.ts), [questionSupply.ts](../src/domain/session/questionSupply.ts), [challengeContent.ts](../src/domain/session/challengeContent.ts), [StudentPracticeService.ts](../src/app/session/StudentPracticeService.ts), [challengeSignature.ts](../src/domain/personalBests/challengeSignature.ts).

## 5. Student question UX

| Input | Current behavior |
|---|---|
| Numeric/text field | An HTML `type="text"` field for numeric answers, not a general text-answer question type. LTR input/math preview within RTL UI; numeric/decimal keyboard hint, exact integer/decimal/fraction validation, format guidance, Enter submission. Malformed/disallowed formats disable submission. A correct input turns green with a check; incorrect stays visible in red with a cross and the correct answer below. |
| Single choice | Shuffled option buttons; choose one then **אישור**. After checking, inputs freeze; correct option is green/check whether selected or missed, selected incorrect is red/cross, unselected incorrect stays neutral. |
| Multiple choice | Choose one or more then **אישור**; exact set equality determines correctness, no partial credit. Selected correct is green/check, selected incorrect red/cross, missed correct muted green with dashed border and **גם נכונה**, unselected incorrect neutral. |

The primary action occupies the same action container as it changes from **אישור** to **הבא**. Desktop action is below the answer region; screens ≤600px use a body-portal action bar fixed to the visible viewport bottom with measured spacer/safe-area styling. Timed/Survival remove Next during their 450 ms automatic feedback. Current solve feedback is inline; there is no additional large right/wrong panel. Review uses a separate compact answer/correct-answer panel.

`usePracticeViewport` tracks `visualViewport` scroll/resize, input focus, orientation-like width changes, and a height-drop threshold to infer a keyboard. With keyboard open, context and stop controls hide while essential count/time/lives remain; the question region scrolls with an occlusion buffer. Pointer handling on the submit bar avoids stealing input focus. RTL prose and adjacent LTR math runs are separated by `ContentRenderer`/content-direction helpers.

Remaining inconsistencies/limits:

- Signed/fraction entry still depends on the physical keyboard: an OS numeric/decimal layout need not expose minus or slash. There is no custom math keypad. Simulated browser keyboard tests do not establish physical Android/iOS compatibility.
- Shortcut completion says “דילגת על הפרק” although the checkpoint remains required. It also animates decorative result stars that are not earned path stars.
- Stage/shortcut wrong-answer review uses neutral “כדאי לבדוק שוב”; generic review uses “לא נכון”.
- Riddle final-answer input is a general text field without the numeric LTR/validation behavior, appropriate for phrases but a distinct mixed-math UX. Its modal does not use the practice-specific keyboard hook.
- The document root remains `lang="en"` while the main student/review content is Hebrew/RTL, affecting language semantics for assistive technology.

Evidence: [QuestionView.tsx](../src/app/questions/QuestionView.tsx), [AnswerInputs.tsx](../src/app/questions/AnswerInputs.tsx), [usePracticeViewport.ts](../src/app/session/usePracticeViewport.ts), [MobileSubmitBar.tsx](../src/app/questions/MobileSubmitBar.tsx), [ShortcutCompletionScreen.tsx](../src/app/session/ShortcutCompletionScreen.tsx). All 41 existing browser layout/navigation tests passed; no physical-device check was performed.

## 6. Question content model and measured inventory

`QuestionDefinition = Question | GeneratedQuestionDefinition`. A normal-practice `SkillQuestionDefinition` requires `skillId`; broad legacy types still permit it to be absent. `selectQuestionPool("SIGNED_NUMBERS")` now ignores that legacy argument and returns `readyDefinitions(FOUNDATIONAL_QUESTIONS)`, spanning all six active Domains. The old signed-number JSON/generated banks and topic adapter are not the active student inventory.

Each Skill has Domain, display/order metadata, active flag, prerequisites, optional supporting Skills/fluency, mastery target, evidence policy and mode profiles. Categories are **calculation, conceptual, reasoning, representation**. Difficulty has a numeric value plus authored bands A–D; the current bank contains only A/B/C. `contentFamily` groups pedagogically related definitions; it is not a new mastery identity.

Generators declare expression/prompt templates, natural/integer/decimal/rational parameter specs, constraints, optional deliberate student symbols/conditions, numeric answer semantics or executable `choiceBuilder`, generated output type, difficulty model, structure/variant metadata, hints, tags, and version. Seeded sampling is deterministic given the definition and generator context; normal selection uses runtime seeds and a seed sequence. Instances include base/template IDs, seed, sampled parameters, rendered expression and metadata. Anti-repetition tracks recent question/structure/variant history; it does not guarantee infinite unique content. Option display order also receives a separate UI shuffle seed.

Definition-level `supportingSkills` records knowledge needed by that particular task/Band, separate from Skill-level dependencies. `literacyDemand` is `none | light | moderate | high`, separate from mathematical category/difficulty. `representationKind` lives in generated metadata, describing the representation conversion (22 current definitions); it is not a diagram renderer or a top-level universal question property. Images use optional `LearningMedia` (section 12).

**Counts from executable source imports after readiness filtering:**

| Measure | Count |
|---|---:|
| Active Domains / Skills | 6 / 27 |
| Authored foundational / active definitions | 181 / 181 |
| Generated / curated | 178 / 3 |
| Numeric / singleChoice / multiChoice output | 82 / 93 / 6 |
| Calculation / conceptual / reasoning / representation | 87 / 49 / 23 / 22 |
| Band A / B / C / D | 83 / 72 / 26 / 0 |
| Literacy none / light / moderate / high | 76 / 71 / 33 / 1 |
| Active definitions tagged `requires-rereview` | **135** (132 generated, all three curated) |
| Active normal question definitions with image media | **0** |

Curated IDs: `MVP_INT_NEGATION_ZERO_CURATED`, `MVP_ALG_VARIABLE_CONTEXT_BASIC_CURATED`, `MVP_ALG_VARIABLE_CONTEXT_REASONING_CURATED`. They include curation reason/justification; they are intentionally fixed examples, not a second generated bank.

**Review status is not a publication gate.** `CONTENT_READINESS` sets `humanReviewed: true` for each Skill and checks structural quantity/category/Band coverage. It does not read actual author-review records or exclude tagged/rejected definitions. Question Review stores status (`approved`, `needs-fix`, `rejected`), note, timestamp and inspected definition version locally. For tagged definitions, mismatched versions invalidate effective reviews; versionless legacy reviews remain effective only through v3. A tag count is therefore not the number of currently unapproved records on the teacher's browser. No such browser approvals were read.

Author-review features include filters/deep links, generated family/Band navigation, deterministic seeds and ten-sample batches, expected-answer reveal, executable generator summaries, supporting/literacy metadata, per-definition notes/status and JSON export. These changes do not update student mastery or the source bank.

Evidence: [question types](../src/domain/questions/types.ts), [generator types](../src/domain/questions/generator/types.ts), [questions.ts](../src/content/foundations/questions.ts), [readiness.ts](../src/content/readiness.ts), [reviewModel.ts](../src/app/contentReview/reviewModel.ts), [reviewState.ts](../src/app/contentReview/reviewState.ts).

## 7. Attempts, evidence and Mastery

**An Attempt stores:** `attemptId`, `sessionId`, `studentId`, target `skillId`, base/static `questionId`; optional `questionInstanceId`, `generatorId`, `generatorSeed`; definition-level `supportingSkills`; `difficulty`, optional Band/category/literacy; raw `submittedAnswer`, optional `normalizedAnswer`; `correct`, `supportLevel`, `scoreValue`, `responseTimeMs`, ISO `submittedAt`, sequence number, tags and `misconceptionIds`.

It does **not** store the whole rendered question, definition version, full answer-option map, contentFamily, representationKind, or per-selected-distractor diagnosis. `misconceptionIds` copies the question-level `misconceptions` list, not a computed diagnosis from the chosen distractor. Options do carry specific misconception IDs/rationales for authoring, but those mappings are not persisted in the Attempt. A later generator edit therefore limits exact historic reconstruction even when a seed survives.

Attempts are authoritative raw evidence. `AnswerResult` and its question snapshot are transient UI state. Session totals, star outcomes and Mastery snapshots are derived records, not replacements for Attempts. Current student answers always use `supportLevel: independent`; hint/guided scoring exists without a student hint/guidance workflow.

**Local projection, per student and primary Skill:** sort Attempts by submitted timestamp, then sequence. Recent window = last 10, history = last 50 (overlapping). Correct scores: independent 1, hint 0.6, guided 0.3; incorrect 0. Mastery = `100 × (0.85 × recent score mean + 0.15 × history score mean)`. Accuracy = percent correct in the last 50, independent of support weighting. No absent Attempts are padded with zeros. Attempt count spans the whole local history.

**Evidence:** count-based level is insufficient below 5, emerging at 5–9, established at ≥10. Separately, `evidenceCoverage.sufficient` checks Skill policy minimum total Attempts plus required category/Band counts in the latest 50, and optional fluency requirements. An established count does not itself mean adequate category coverage. **Fluency** uses the most recent ten correct independent responses within the last 50; median is exposed when Skill fluency is enabled. Fact policy additionally needs ≥6 such responses with median ≤5 seconds and ≥12 total Attempts. Supporting Skills/literacy do not change correctness, weights, target attribution or path access; no secondary-Skill mastery credit or literacy aggregate is derived.

**Observed impossible coverage:** ten active Skills require evidence that the active bank cannot supply:

| Skill(s) | Required but absent from current definitions |
|---|---|
| Four `AR_MUL_F_*` | `conceptual` category; authored contexts are `representation` |
| `AR_FACTORS_MULTIPLES` | `reasoning` category |
| `INT_NEGATION` | `reasoning` and Band C |
| `INT_MUL`, `INT_DIV` | Band C |
| `FRAC_EQUIV` | `conceptual` category |
| `ALG_VARIABLE` | `representation` category |

This follows by comparing positive requirements in `Skill.evidencePolicy` with categories/Bands in active definitions. `isAssignmentComplete` requires established evidence, target mastery and sufficient coverage, so these Skills cannot satisfy a normal current-policy assignment using current content alone. Star stages can still pass. Readiness checks use different criteria and currently pass all Skills. The generic Skill display helper also uses a fixed 85% mastery boundary without policy coverage or each Skill's mastery target; it is not a full diagnostic verdict.

**Actual answer → storage/sync chain:**

1. `QuestionView` evaluates immediately and calls `onEvaluated`.
2. `SessionView` accepts the pending answer, creates an Attempt from the presented question, and asynchronously writes it as `pending` to IndexedDB.
3. Feedback/advance updates in-memory session results; saving is not a UI barrier before feedback/next. Session end waits for pending saves. Local Mastery is reprojected from stored Attempts on service snapshots/Home loads, not incrementally stored as a primary score on each answer.
4. `notifyAttemptSaved` triggers a flush at five pending Attempts. Flush also runs at startup, every 25 seconds, online events, and session start/finish; riddle submits have a trigger.
5. When configured, coordinator sends sessions first, then up to 25 Attempts from one student/session, then a student riddle batch. Successful or duplicate IDs become `synced`; data stays local. Retryable failure uses 5-second exponential backoff capped at five minutes. Non-retryable failures mark the affected batch/record `invalid`; no teacher-facing repair UI exists.
6. Apps Script appends deduplicated Attempt rows and rebuilds affected server Mastery. Returned submit-time mastery snapshots are not consumed by the client; Home obtains snapshots through bootstrap.

**Failure limit:** a rejected local save remains a rejected promise in `pendingSaves`; end waits via `Promise.all` without a local rejection recovery path. The finishing screen can remain stuck, and feedback may already have been shown. This is not a tested durable-save error UX.

Evidence: [Attempt](../src/domain/attempts/types.ts), [createAttempt](../src/domain/attempts/createAttempt.ts), [projectMastery](../src/domain/mastery/projectMastery.ts), [policies](../src/content/catalog/policies.ts), [deriveStudentHome](../src/domain/studentHome/deriveStudentHome.ts), [SessionView](../src/app/session/SessionView.tsx), [SyncCoordinator](../src/infrastructure/sync/SyncCoordinator.ts).

## 8. Persistence and survival guarantees

| Database/store | Current contents |
|---|---|
| `atomic-math`, version **3**, `attempts` | `{ value: Attempt, syncState }`, key `value.attemptId` |
| `sessions` | Persisted settings, scope, source/assignment, active/completed/abandoned status, timing/counts/score, stage/shortcut references and outcomes; key `value.id`, sync state |
| `metadata` | Global sync metadata (`sync`), migration marker, `student-home:<studentId>` cache of profile/assignments/server mastery |
| `personalBests` | Student/challenge-keyed best metrics; no sync queue |
| `riddleSubmissions` | Separate response artifacts and sync state, key `value.submissionId` |
| `atomic-math-authoring`, version **1**, `questionReviews` | Definition-keyed author review status, note, version, timestamp; no backend sync |

No separate IndexedDB stores for stars, progression, assignments, or local Mastery: progression derives from sessions, assignments/server mastery live in cached metadata, and local Mastery derives from Attempts. The inspected live app is still on version 2, without `riddleSubmissions`.

LocalStorage is retained at the **legacy boundary**: `atomicMath.attempts.v1` imports once into IndexedDB using `legacy-attempts-migrated`; the old key is not cleared. `LocalAttemptRepository` still exists and is used by tests, but current student repository wiring uses durable repositories. If IndexedDB is absent, wiring falls back to memory; an asynchronous IndexedDB open/write failure does not switch automatically to memory.

| Event | What survives |
|---|---|
| Refresh/restart, same origin/browser profile | Committed Attempts/sessions, derived stars/bypasses, bests, submitted riddles and author reviews. Active engine, unsaved input, in-memory answer snapshots and summary navigation do not survive. |
| Browser data clear/private-session end/storage loss | No application-level backup guarantees for local-only records. Unsynced data can be lost. |
| Device/browser/origin change | No automatic raw history, progression, best, riddle-history or author-review transfer. If backend configured with the same student ID, profile/assignments/server mastery bootstrap can load; that is not full restoration. |
| Offline while application is loaded | Local practice/storage/queues work; remote sync waits. External resources require network. |
| Cold offline load/reload | Not guaranteed: no service worker/offline app-shell cache implementation exists. “Fully offline” docs overstate install/load guarantees. |

**Sources of truth/duplication:** stars do not have an independent duplicate store. Personal bests and session totals are separate derived records, without a general rebuild tool. Legacy LocalStorage remains a stale copy after migration. Server and local mastery are two projections; Home picks one based on count/latest timestamp rather than merging histories. A newer small local history may replace a more extensive server snapshot. Client and Apps Script duplicate mastery formulas but differ in evidence/fluency-policy implementation. Invalid-sync Attempts still contribute to local projections because repository reads do not filter them out.

Evidence: [IndexedDbPersistenceDriver](../src/infrastructure/persistence/IndexedDbPersistenceDriver.ts), [DurableRepositories](../src/infrastructure/persistence/DurableRepositories.ts), [persistenceInstances](../src/app/persistenceInstances.ts), [StudentHomeService](../src/app/studentHome/StudentHomeService.ts).

## 9. Google Sheets / Apps Script backend

### Deployed connection: verified unconfigured

Read-only inspection on the audit date found Home HTTP 200 and these public artifacts: [entry bundle](https://lavi2891.github.io/atomic-math/assets/index-BJ4SNqIq.js), [student bundle](https://lavi2891.github.io/atomic-math/assets/StudentApp-DPNWDaZT.js), [question bank bundle](https://lavi2891.github.io/atomic-math/assets/questions-01HwlkJp.js), and [review bundle](https://lavi2891.github.io/atomic-math/assets/QuestionReviewScreen-BSxr9H34.js). In the student bundle, `ft=null` is passed to both the sync coordinator and Home service; identity is `local-student`. The transport is therefore disabled. There is **no live Google Apps Script/Sheet connection used by this published build**. This does not prove that no separately deployed Script/Sheet exists in the owner's account.

Local `.env` exists but defines neither `VITE_APPS_SCRIPT_URL` nor `VITE_STUDENT_ID`; no standard local/production override files were found. Only these key-presence facts were inspected/reported, not unrelated values. `runtime.ts` defaults to null URL and `local-student`. Environment values are compiled into the frontend at build time; changing a local env file cannot reconfigure an already published bundle.

### Implemented code and exact schema

[Core.gs](../apps-script/Core.gs): v1 request/batch validation, duplicate partitioning, projection helpers. [Code.gs](../apps-script/Code.gs): GET health; POST actions `health`, `getStudentHome`, `startSession`, `submitAttempts`, `submitRiddleResponses`, `endSession`, `getSyncState`, `upsertAssignments`. [Setup.gs](../apps-script/Setup.gs): initialization/header upgrades, guarded development reset and mastery rebuild.

Client transport posts JSON with `Content-Type: text/plain;charset=utf-8`, request ID and `clientVersion: "1"`. There is no student login, identity proof, role check, or application authorization in these handlers. Requests trust submitted student IDs and scoring fields; no server regrading occurs. In particular, `upsertAssignments` is not restricted to teachers by application code.

Exact current `AM_SHEETS` header order:

```text
Students: studentId, displayName, classId, groupId, active, createdAt, updatedAt
Attempts: submittedAt, attemptId, sessionId, studentId, questionId,
  questionInstanceId, generatorId, generatorSeed, skillId, difficulty,
  answerJson, normalizedAnswerJson, correct, supportLevel, scoreValue,
  responseTimeMs, sequenceNumber, tagsJson, misconceptionIdsJson,
  supportingSkillsJson, literacyDemand
RiddleSubmissions: submittedAt, updatedAt, submissionId, studentId, riddleId,
  responseText, finalAnswerText, finalAnswerCorrect, difficulty, status
Sessions: sessionId, studentId, source, assignmentId, mode,
  selectedSkillIdsJson, strategy, startedAt, endedAt, status, questionCount,
  correctCount, incorrectCount, accuracy, gameScore, syncedAt
Mastery: studentId, skillId, mastery, accuracy, fluencyMedianMs, attemptCount,
  recentAverage, historyAverage, evidenceLevel, lastAttemptAt, calculatedAt, updatedAt
Assignments: assignmentId, studentId, skillId, targetMastery, priority,
  active, createdAt, dueAt, completedAt
Classes: classId, name, active
AppConfig: key, valueJson, updatedAt
```

There is **no Progression or PersonalBests tab**. Classes/AppConfig have setup schema but no roster/config delivery workflow in Home; AppConfig A1 note is used by the development-reset safety gate. Assignments are per student/Skill; no class assignment fan-out. `getStudentHome` returns profile, active assignments and mastery snapshots, not Attempt/session/riddle history. `getSyncState` returns a count, not a reconciliation feed.

**Contract losses/migrations:**

- Attempts preserve `supportingSkillsJson` and `literacyDemand` in current mapping. **Category and difficultyBand are not Sheet columns and are dropped.** Definition version/full question snapshot are missing locally as well as remotely.
- Server Mastery computes the weighted score/accuracy/count levels, but no category/Band coverage, Skill-specific evidence policy, or fluent-attempt count. It computes fluency for every Skill, unlike the client display policy. Fresh-device server snapshots lack `evidenceCoverage`, so current-policy assignment completion cannot be demonstrated from them.
- Sessions drop `learningStage`, `learningShortcut`, `stageStars`, `shortcutPassed`, `endReason`, `durationMs`, and full settings (only mode remains). A synced path session does not back up progression. An accepted sync acknowledgment is not full-fidelity persistence.
- Existing compatible Sheets can be upgraded by rerunning initialization: it accepts existing headers that are an exact prefix of new headers, appends the current Attempt columns and creates RiddleSubmissions. Populated incompatible headers cause refusal. Old rows remain blank for newly added fields; duplicate retries do not backfill them.
- Closing category/Band/progression/settings gaps requires code/schema work, then migration/redeployment; **the current initializer alone cannot fix these omissions**. No such changes were made here.

### Teacher/admin setup still required

1. Choose stable, distinct student identity and access rules before real classroom data. Current `VITE_STUDENT_ID` configures one identity for the whole build, not one per user; a login/selection/provisioning solution needs engineering work.
2. Create a dedicated Sheet; use Extensions → Apps Script to create a bound project. Copy complete current `Core.gs`, `Setup.gs`, `Code.gs` files.
3. Run `initializeAtomicMathSheets`, authorize the owner account, verify all **eight** tabs/headers and the stored spreadsheet-ID property. For an existing backend, first back up and inspect headers; do not use the reset routine as a migration.
4. Add test Students rows with stable IDs/active status; add Classes and optional per-student Assignments rows using valid catalog Skill IDs, numeric targets/priorities and appropriate timestamps.
5. Deploy a versioned Web App executing as the Sheet owner; choose access compatible with intended school devices and the application's actual fetch behavior. The current client does not implement an authenticated Google session flow. Public access plus the current unauthenticated handlers is not a resolved classroom access model.
6. For a development smoke test, configure `VITE_APPS_SCRIPT_URL` to the `/exec` deployment URL and `VITE_STUDENT_ID` to a test ID; restart Vite. For published use, rebuild with correct configuration and publish in a separately authorized phase. No deployment occurred in this audit.
7. GET health, then on test data complete a short session and submit a riddle. Verify Attempts, Sessions, Mastery and RiddleSubmissions rows, queue acknowledgments, refresh, offline/online retry and duplicate behavior. Independently verify the expected losses above; health alone does not verify Sheet writes.
8. Before tracked classroom rollout, complete identity/authorization and schema fixes, exercise a second device, and provide an operational teacher view/recovery workflow. Updating `.gs` files requires a new Web App deployment version; updating frontend source requires rebuilding/publishing the frontend.

[SETUP.md](../SETUP.md) supplies the existing manual workflow but predates the eighth tab and the current contract gaps.

## 10. Teacher functionality

| Capability | Current status |
|---|---|
| Question bank inspection/review | **Implemented UI.** Filter by atomic Skill/category/Band/literacy, inspect generator/distractor/support metadata, save versioned review notes/status locally, export JSON. No teacher authentication. |
| Assignments | **Backend/domain ready, no authoring UI.** Sheet rows/upsert API, bootstrap/cache, sorting/completion rules, assignment-aware quick selection and session metadata. Assignment-specific ten-question launch helper exists but current Home does not expose assignment cards; quick checks start without passing an assignment ID. Completion is derived, not written back to `completedAt`. |
| Classes/student visibility | **Schema/backend only.** Student lookup and class fields; no teacher roster, class aggregate, or student-switching UI. |
| Skill/Mastery view | **Partial.** Local projection and student session detail; server cache. No teacher learner Skill Map; coverage discrepancies in sections 7/9 apply. |
| Raw Attempts | **Local repository/backend ready.** Manually inspect browser/Sheets when configured. No teacher browser/report/export UI for learner Attempts. |
| Misconceptions | **Metadata only for learner diagnostics.** Author tool can inspect distractors. No per-selected-error aggregation or intervention UI. |
| Supporting-Skill diagnostics | **Capture/author visibility implemented.** Definition support is copied to Attempts and Sheet JSON; no derived supporting weakness report. |
| Literacy diagnostics | **Capture and author filter implemented.** No learner literacy score, grouping, teacher comparison or causal diagnosis. |
| Homework/teacher-created side quests | **Not implemented as a product.** Basic Skill assignments and code-authored optional chapter branches are separate primitives, not a side-quest creation workflow. |
| Teacher dashboard/riddle review | **Future only.** No review queue, acceptance UI, progress dashboard or riddle status round trip. |

Evidence: [StudentHomeService](../src/app/studentHome/StudentHomeService.ts), [quickPractice](../src/domain/studentHome/quickPractice.ts), [sessionLaunch](../src/domain/studentHome/sessionLaunch.ts), [StudentApp](../src/app/StudentApp.tsx), [QuestionReviewScreen](../src/app/contentReview/QuestionReviewScreen.tsx), Apps Script handlers.

## 11. Optional learning content

Current source has **two** authored optional nodes: a medium-difficulty number-pair riddle in the first chapter (`NA_NUMBER_PAIR_RIDDLE`) and an external GeoGebra calculator tool in Order of Operations (`NA_CALCULATOR_TOOL`). They render purple side branches and never gate stages, award stars, or produce Mastery evidence. They are absent from the inspected deployed student bundle.

Riddles support Hebrew title/prompt, easy/medium/hard thinking difficulty (one/two/three dots), optional image and a small accepted-final-answer list. A nonempty written explanation is required. Each submission creates a new ID with student/riddle IDs, response, optional final answer/result, difficulty, submitted/updated timestamps and `submitted` status; all submissions remain in history, while reopening prefills the latest saved response. Unsubmitted draft text is not durable. Final checking only normalizes whitespace/case and compares accepted strings; it is not a mathematical or explanation evaluator. For example, accepted `4,6` need not accept every equivalent spelling such as `4, 6`. Incorrect final checks still save the explanation.

| Content/function | Status |
|---|---|
| Riddle/open response/difficulty | Source UI + local persistence + separate backend sync action implemented; one authored riddle. |
| External links/tools | URL-validated external-opening sheet implemented (`target="_blank"`, `noopener noreferrer`); one authored calculator tool. |
| Videos | Resource type/icon/open action implemented; **zero authored video nodes**, no video player/embed/progress tracking. |
| Images | Reusable single-image renderer and one riddle SVG asset implemented. |
| Articles | External `article` resource type supported, zero authored articles. Internal Atomic article pages/editor are documented future work. |
| AI feedback | Future only; no model request, grading/feedback service or student action. |
| Teacher/peer review | Future only. Status vocabulary includes reviewed/accepted/needs-revision, but current UI creates only submitted records and has no reviewer workflow. |

Evidence: [optional content types](../src/domain/optionalLearningContent/types.ts), [RiddleSheet](../src/app/learningPath/RiddleSheet.tsx), [ResourceSheet](../src/app/learningPath/ResourceSheet.tsx), [OPTIONAL_LEARNING_CONTENT.md](OPTIONAL_LEARNING_CONTENT.md).

## 12. Graph / geometry / media infrastructure

`LearningMedia` currently means **one image**: `type`, `src`, `alt`, instructional/decorative `role`, optional caption. `ResponsiveMedia` renders a responsive lazy `<img>`; relative assets respect the Vite base, decorative images get empty alt, and validation requires instructional alt text. Definitions, generated instances, riddles and resource sheets support it, but zero active normal questions currently use it. No arbitrary HTML content renderer is supplied.

Static SVG exists for topic/path icons and `public/riddle-number-pair.svg`; it can be shown as image media. This is not semantic geometry. A fraction number-line question uses `fractionNumberLineLatex` with a KaTeX array/marker, so there is a **specific noninteractive number-line representation**. Other number-line tasks are principally verbal/math prompts. None of this is a reusable coordinate-system renderer.

There is no implemented graph grid/axes/ranges/point/line/function component, geometry object model, semantic point/segment/polygon/angle/equality objects, geometry interaction evaluator, or clickable/selectable geometry object system. Triangle icons do not imply a geometry curriculum. Lightweight graph/geometry SVG renderers and future clickable objects are documented possibilities only; static image support is the current extension point.

Evidence: [media types](../src/domain/media/types.ts), [ResponsiveMedia](../src/ui/ResponsiveMedia.tsx), [studentMathContent](../src/content/foundations/studentMathContent.ts), [questions](../src/content/foundations/questions.ts), optional-content roadmap.

## 13. Current curriculum coverage

These are all **27 active Skills**, grouped pedagogically. Counts are active definitions, not the number of generated instances or verified student mastery.

| Group | Skill and current scope | Definitions |
|---|---|---:|
| Base-ten structure | `AR_PLACE_VALUE`: whole-number standard ↔ expanded form, repeated digits/internal zeros | 6 |
| Addition/subtraction facts | `AR_ADD_FACTS`, `AR_SUB_FACTS`: short arithmetic and associated meaning/relationships | 8 / 6 |
| Multiplication facts | `AR_MUL_F_2_5_10`, `AR_MUL_F_3_4`, `AR_MUL_F_6_7`, `AR_MUL_F_8_9` | 6 / 6 / 6 / 6 |
| Division facts | `AR_DIV_F_2_5_10`, `AR_DIV_F_3_4`, `AR_DIV_F_6_7`, `AR_DIV_F_8_9` | 8 / 8 / 8 / 8 |
| Factors/multiples | `AR_FACTORS_MULTIPLES`: both concepts within one Skill, separate content families | 12 |
| Order of operations | `OPS_ORDER_BASIC`: precedence, parentheses, same-precedence left-to-right | 11 |
| Signed-number meaning | `INT_NUMBER_LINE`, `INT_COMPARE`, `INT_NEGATION`: direction/order/opposites, including zero | 4 / 4 / 3 |
| Signed arithmetic | `INT_ADD`, `INT_SUB`, `INT_MUL`, `INT_DIV`: explicit signed-operation structures/sign rules | 11 / 13 / 8 / 5 |
| Fractions | `FRAC_MEANING`: numerator/denominator, equal parts/sets, unit number line; `FRAC_EQUIV`: scaling/simplification/equivalence | 7 / 6 |
| Algebra foundations | `ALG_EQUALITY`, `ALG_VARIABLE`, `ALG_SUBSTITUTE`: equality relation, variables/coefficient/context, substitution | 4 / 5 / 4 |
| Equations | `EQ_ADD`, `EQ_MUL`: elementary additive/multiplicative equations and inverse-operation meaning | 4 / 4 |

**Present:** arithmetic facts, fraction concepts/equivalence, signed numbers, basic operation order, algebra foundations and elementary equations. **Coordinates are not active:** no Coordinates Domain or `COORD_*` Skill appears in the executable catalog, despite the planning document's proposed list.

**Current gaps:** fraction addition/subtraction/multiplication/division curriculum; ratios/proportion/percent; full graph reading; linear functions; inequalities; expanded algebraic technique such as like terms/distribution/general simplification; broader/multistep equation curriculum; geometry; decimal-number curriculum and written multidigit algorithms. Generic rational/decimal generation and parsing support do not mean these curricula are present. This inventory does not prescribe the next curriculum sequence.

Evidence: [skills.ts](../src/content/catalog/skills.ts), [domains.ts](../src/content/catalog/domains.ts), [skillScope.ts](../src/content/foundations/skillScope.ts), [questions.ts](../src/content/foundations/questions.ts).

## 14. Documentation inventory and drift

| Document | Meaning / accuracy now |
|---|---|
| [README.md](../README.md) | Development and product entry point. Broad path/local-storage description remains useful. Offline wording needs app-shell caveat; legacy signed adapter guidance overstates its role in the current active pool. |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Best existing architecture/path/evidence overview. Predates optional-content persistence and does not fully describe current URLs/windowing. Says “App.tsx” owns navigation though student navigation is in StudentApp. Bundle note says all content is in one entry chunk, but current build splits StudentApp, QuestionReviewScreen and questions. |
| [CONTENT_AUTHORING_STANDARD.md](CONTENT_AUTHORING_STANDARD.md) | Current authoring contract: atomic identity, supporting Skills, category/literacy, semantic Band progression, generated-versus-curated intent, representations and review rules. A standard, not proof all active content has teacher approval. |
| [FOUNDATIONAL_CONTENT_AUDIT.md](FOUNDATIONAL_CONTENT_AUDIT.md) | Historical human-review corrections and ID/version migrations. Section 0 says 179/176/3; later positional-structure addendum retires two/adds four, explaining current **181/178/3**. Earlier sections also preserve superseded 168 counts and withdrawn symbolic Bands; read chronologically, not as simultaneous current claims. |
| [SIGNED_NUMBER_CONTENT_AUDIT.md](SIGNED_NUMBER_CONTENT_AUDIT.md) | Signed-family rationale, retired IDs, invariants and review impact. Historical snapshot; later foundations changes supersede some variants. |
| [PHASE_7A_CONTENT_PLAN.md](PHASE_7A_CONTENT_PLAN.md) | Broad proposed taxonomy, Skill tables, waves, dependencies and teacher vision. Coordinates/expanded curriculum are proposals. Its older evidence-policy assignments, including place-value policy, are not current executable truth. |
| [PHASE_7B_CONTENT_REVIEW.md](PHASE_7B_CONTENT_REVIEW.md) | Historical normalization and review passes; early curated-heavy per-Skill tables and “future Question Review” language are superseded by generated conversion and the implemented review tool. |
| [OPTIONAL_LEARNING_CONTENT.md](OPTIONAL_LEARNING_CONTENT.md) | Accurate current-source primitives and explicit future roadmap for AI/peer/article/graph/geometry work. Does not establish deployment or backend connection. |
| [SETUP.md](../SETUP.md), [.env.example](../.env.example) | Manual Sheets/script setup and config examples. Setup lists seven tabs, omits RiddleSubmissions/new header upgrade details, and does not warn of the current dropped path/evidence fields or shared-build identity limitation. |
| [project-overview.md](project-overview.md) | Stale topic-based overview: references removed Home/Topics flow and directories such as `src/backoffice`; not a current implementation map. |
| [מפת_בסיס_הקוד.md](מפת_בסיס_הקוד.md) | Explicit 2026-09-03 map at `b6c9389`; useful historical dependency inventory, predates recent routing/path/review/literacy/riddle changes. |
| Local `docs/PROJECT_SNAPSHOT.md` | Ignored/untracked historical snapshot, still says only Signed Numbers is active. Stale. |
| Local `docs/FUTURE_IDEAS.md` | Ignored/untracked roadmap; topic-rating/rated-session concepts are not the current Attempt-based product. |
| Local `docs/topics.csv` and curriculum PDFs | Ignored local reference material, not runtime content or authored active Skills. PDFs: `471_10th_grade.pdf`, `algebra_7.pdf`, `algebra_8.pdf`, `geometry_7.pdf`, `geometry_8.pdf`, `mafmar-tashpav.pdf`, `math_7_8_9.pdf`, `numerical_7_8.pdf`, `prisa7tashpav.pdf`, `Uncertainty_7_8.pdf`. Their contents were not audited. |

There is no separate dedicated current learning-path product document beyond README/ARCHITECTURE, the authored path file and older Phase 7A product sections. Several overview documents duplicate historical states. `.gitignore` ignores `docs/*` except ARCHITECTURE, even though additional docs were explicitly tracked earlier; new reports require explicit force-add unless that policy changes. This audit leaves the ignore rule unchanged.

## 15. Prioritized technical debt / observed risks

P0 here means blocking **identified, teacher-tracked classroom deployment**, not blocking every supervised local practice activity. Priorities are recommendations based on observed code; no issue below was fixed by this audit.

| Priority | Observed issue and consequence | Evidence |
|---|---|---|
| **P0** | Published backend client is null and identity is `local-student`; teacher receives no central data, shared browser users share an identity. | Live bundle; runtime config |
| **P0** | No application authentication/authorization; backend trusts client student IDs/scores and exposes assignment updates without teacher-role enforcement. Configuring a public URL alone is insufficient for protected classroom records. | Apps Script Core/Code |
| **P1** | Four advertised Timed and 15 Survival Skill scopes have zero eligible content, causing a launch error. | Catalog/profile executable comparison; setup vs supply |
| **P1** | Ten Skills have unattainable evidence-policy coverage; current assignments can remain incomplete indefinitely. | Policies versus active category/Band inventory |
| **P1** | Backend drops category/Band and path/settings outcomes; server mastery cannot reproduce current policy evidence; no cross-device history/progression restore. | AM_SHEETS/mappers and bootstrap |
| **P1** | 135 re-review tags are active; structural readiness and browser-local author approval are disconnected. | Readiness/review model |
| **P1** | Back/Forward and refresh lose/restart active session engine without lifecycle reconciliation; retained Attempts can outlive/reset session summaries. | StudentApp/useSessionEngine |
| **P1** | Local save rejection has no recoverable session-end UX; network fetches also have no timeout/abort, and configured Home awaits remote bootstrap before returning cached/local view. | SessionView; AppsScriptClient; StudentHomeService |
| **P1** | Teacher roster/assignment/diagnostic visibility and invalid-sync recovery UI absent. | Current routes/screens |
| **P2** | Misconception list is task metadata, not selected-distractor evidence; no definition version/full snapshot in durable Attempt limits retrospective diagnostics. | createAttempt/types |
| **P2** | Local persistence repeatedly uses `getAll`; Home requests full Attempt history separately for 27 Skills. Per-answer duplicate checks and sync-state updates scan stores. Long Practice sessions retain growing arrays/maps. | IndexedDb driver, repositories, Home, selector/engine |
| **P2** | Backend scans all Attempts, rebuilds/writes Mastery rows, and does not lock session/assignment upserts. Session queue acknowledgment can mark a newer locally overwritten version synced after an older in-flight upload; no revision compare exists. | Apps Script and SyncCoordinator/driver |
| **P2** | No offline app-shell guarantee; physical keyboard minus/fraction entry unverified; root language and shortcut wording/star semantics inconsistent. | main/public, input/summary code |
| **P2** | Production/source drift, obsolete docs, hidden-but-public author tools and 517.66 kB entry chunk warning. Fixed bests lack content-version scoping, so content revisions can change comparability. | Public/local build; docs; signatures |
| **P3** | Geometry/graphs/coordinates and broader curriculum have no active implementation; semantic interactive diagrams, internal articles, teacher/AI/peer riddle review need future design. | Catalog and optional roadmap |

The current test suite does not expose the challenge-eligibility or policy-versus-content mismatches; passing tests should not be read as classroom acceptance.

## 16. Recommended next phases — proposals only

1. **Identity and durable-data contract:** choose student provisioning/access model and retention expectations; define what must move between devices and reconcile Attempt/session/evidence schemas.
2. **Current-product reliability:** resolve empty challenge scopes, impossible evidence requirements, save failures and session history lifecycle; finish version-aware content re-review and release-readiness decisions.
3. **Backend integration on test data:** migrate full-fidelity contracts, provision a dedicated Sheet/Script, verify authentication/access, duplicate/offline retries and second-device behavior; document a repeatable release/configuration check.
4. **Teacher visibility:** provide minimum roster, assignments, raw Attempt inspection and trustworthy mastery/evidence views, with explicit limits on misconception/support/literacy interpretation.
5. **Controlled classroom pilot:** use reviewed content and stable device/identity rules; verify real mobile keyboards, accessibility, interruption recovery, teacher workflow and progression semantics.
6. **Curriculum map and media foundations:** map the actual 27-Skill coverage to intended learning goals; decide coordinate/graph/geometry representation needs using the existing image extension point. No new curriculum sequence is designed in this audit.
7. **Measured expansion:** add approved curriculum areas and necessary diagram/content tools in bounded releases; consider internal resources and riddle review only after the supporting classroom workflow works.

## 17. Validation and handoff

| Check | Result |
|---|---|
| `npm test` (invoked as `npm.cmd test` on Windows) | **PASS**, all 15 package test suites, including Timed supply/clock, routing, path/scoring, optional-content and student-practice checks. |
| `npm run lint` (`npm.cmd run lint`) | **PASS**. |
| `npm run build` (`npm.cmd run build`) | **PASS**, TypeScript and Vite. Main entry 517.66 kB / 157.58 kB gzip; nonfatal >500 kB chunk warning. |
| Additional `npm run test:mobile` | **PASS: 41/41**, headless installed Chrome, existing fixtures with sync disabled; simulated viewport/keyboard behavior, not a physical-device test. |
| Executable inventory | 27 active Skills, 181 active definitions; mode-filter and evidence-policy comparisons reported above. No source/test files added for these probes. |
| `git diff --check` | **PASS** for the report change (also checked after staging). |

Windows PowerShell initially blocked `npm.ps1`; using the equivalent `npm.cmd` entry point resolved that. Sandbox esbuild parent-directory resolution initially blocked build/UI tests; reruns outside that restriction passed without changing application files. Tests emit existing Node `fs.Stats` and React test-renderer deprecation warnings. Build/test outputs are ignored artifacts, not report-commit contents.

Only this report is to be committed locally as **`docs: audit current Atomic Math state`**. The resulting commit hash is provided in the task handoff rather than embedded in its own contents. No push or deployment is part of this audit.

### Implemented

Hebrew/RTL practice, 27 atomic Skills/181 definitions, Numbers & Algebra course, chapters/stages/checkpoints, local best stars and shortcuts, windowed upward map, four session engines, numeric/single/multiple-choice UX, current-session review, local Attempts/sessions/bests, versioned author review/export, optional riddle/image/resource primitives in source, and manually deployable Apps Script handlers.

### Partially implemented

Challenge eligibility, content approval readiness, evidence-policy attainability, backend sync fidelity, cross-device bootstrap, assignments, diagnostic metadata, teacher visibility, active-session history recovery, offline loading guarantees, media usage, and source-to-production release parity. Geometry has only its route/card/empty path.

### Documented/future only

Full teacher dashboard and side-quest creation; coordinate/graph/geometry curriculum and semantic renderers; clickable geometry objects; expanded curriculum; internal articles; AI explanation/riddle feedback; teacher/peer riddle review; adaptive path insertion; true multi-device Attempt-history reconciliation.

### Open decisions

- Student identity/access and shared-device policy; minimum classroom persistence and recovery guarantees.
- Whether deployment is intentionally device-local or must support teacher tracking and device changes.
- Review approval required for student release, and how that relates to structural readiness.
- Evidence-policy/category alignment for the ten affected Skills; no new policy is chosen here.
- Whether to split factors and multiples, and how to version changed Skill/path/content outcomes.
- Meaning of shortcut display stars/“skipped chapter,” Practice `abandoned` status, and browser interruption/resume expectations.
- Curriculum priorities and first graph/geometry interaction needs after the reliability and classroom workflow phases.
