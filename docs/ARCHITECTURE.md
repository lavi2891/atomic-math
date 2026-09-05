# Atomic Math architecture

## Boundaries

- Domain modules contain deterministic rules and cannot depend on React, IndexedDB, fetch, or Apps Script.
- Application services orchestrate domain rules with repository interfaces.
- Infrastructure implements persistence and remote transport.
- React screens render supplied state and dispatch user actions. `App.tsx` owns only screen composition, navigation state, and dependency wiring.
- Content identity is Domain/Skill based. Topic identity remains only at the legacy signed-number import boundary and in the development playground.

`StudentPracticeService` owns session lifecycle persistence and before/after mastery snapshots. `StudentHomeService` owns bootstrap normalization, offline fallback, local projection, and server/local reconciliation. Assignment completion and Skill Map labels remain pure domain functions.

## Question and evidence models

Normal practice consumes `SkillQuestionDefinition`, which requires a catalog-valid `skillId`. The broader historical `Question` and generated-definition types keep `skillId` optional only so the isolated signed-number adapter and playground can ingest older definitions. `createAttemptFromAnswer` also fails loudly if this boundary is violated.

`AnswerResult` is ephemeral evaluation and session UI state. It is never authoritative persisted evidence. An `Attempt` is created from the exact presented question and result, then stored before sync.

## Learning-path foundation

`src/content/learningPaths.ts` defines two student paths: Numbers & Algebra and Geometry. Numbers & Algebra groups existing atomic Skills into Chapters and Stages. Geometry has no chapters until Geometry Skills are added to the atomic catalog. These presentation units are independent of catalog Domains and Skill Groups.

`src/domain/learningPath` contains readonly definitions and pure progression functions. Chapter and Stage arrays define sequence, with no fixed chapter length or numeric position stored in student progress. Each Stage references one or more atomic Skill IDs. Stage IDs must be stable and globally unique, including any student-specific adaptive/review insertions.

`StudentLearningProgress` holds one student's best stars by Stage ID plus separately derived shortcut bypass IDs. Missing/zero stars mean no earned reward; one to three stars mean completed. A bypass also completes a stage for path navigation without awarding a star. `derivePathProgress` computes the ordered stage view. All preceding main stages (`normal`, `review`, `checkpoint`) need completion to unlock an uncompleted stage, including across chapter boundaries. A bonus opens at its position but is never required for later progression. Empty and bonus-only chapters introduce no gate; the two paths start independently.

`recordStageResult` accepts an awarded integer from zero to three for an available or completed stage and retains the best reward on replay. Completed stages remain replayable after insertions; an inserted main review must be completed before further uncompleted stages open. Skill prerequisites and supporting Skills remain advisory and are not consulted by path progression. These locks govern only the student path UX, never direct Skill practice.

Stage stars are UX rewards, not evidence of Skill mastery. Completion/status are derived, not stored on definitions. A multi-Skill stage still produces individual atomic-Skill Attempts through the existing practice pipeline; stage rewards neither create Attempts nor change Mastery. Accuracy scoring defaults to 60%, 80%, and 90% for one, two, and three stars, and a Stage may override those thresholds. Response time is ignored unless that Stage explicitly declares a fluency target. A checkpoint can combine Skills and remains passable at its one-star threshold.

A Chapter shortcut runs as a five-question fixed session over its declared atomic Skills. Passing defaults to 80% and bypasses required lead-up stages before the first checkpoint; bonus and checkpoint stages are unaffected. Bypassed stages remain accessible and show zero earned stars. Shortcut answers create ordinary atomic-Skill Attempts, while the saved session records only its path outcome. There is no adaptive insertion engine. Run `npm run test:learning-path` and `npm run test:learning-path-scoring` for the progression, scoring, and evidence-boundary checks (also included in `npm test`).

## Student Home

Home presents “המשך במסלול”, two path cards, “בדיקה מהירה”, and “תרגול חופשי” in a single column. `learningPathCards` selects the first unfinished main stage and derives progress within its chapter, excluding bonuses. A completed path offers a replay of its final main stage. Missing content disables Continue without skipping ahead or dropping Skills from a cluster. Geometry remains visible as coming soon. Free practice opens Domain selection and the existing Skill tree; mastery/evidence analytics and challenge configuration are absent from Home.

Continue opens the path map; stage and shortcut sheets launch five fixed questions with optional path context on the session. That context and its scored outcome are retained by session persistence and replays; atomic Attempt identity and mastery projection are unchanged. `StudentHomeService` restores best stage stars, passed shortcuts, and bypassed stages from locally saved sessions, including synced sessions, so there is no second progression store or schema migration. Legacy completed stage sessions without a saved score retain one star. Abandoned sessions and ordinary quick/free practice never award stage stars. For backend compatibility, session `source` retains the existing values; path identity and outcomes are additional metadata. Cross-device path-history reconciliation is not implemented.

`learningSessionContext` resolves authored Stage/Chapter labels for active practice and summaries without changing the selected atomic Skills. Other practice uses a compact Skill Group or Domain label instead of a selected-Skill list. Timed and Survival feedback lasts 450 ms and advances automatically without a Next action; Fixed and Practice keep explicit advancement. Timed reducer completion accepts only its monotonic clock deadline, while explicit user stop remains an abandoned session and question-supply failures cannot masquerade as normal completion. Replays clone and retain mode settings, assignment identity, Skill scope, and Stage or shortcut context.

If local session history cannot be read, Continue is unavailable rather than showing a false fresh start. Quick check and free practice remain accessible. Quick check uses the existing assignment/learning/foundations scope selection and starts five fixed questions without a setup screen; it is not the Chapter shortcut test.

`npm run test:student-home` checks selection and session restoration. `npm run test:mobile` also checks the actual Home at 320px and 390px, Continue/quick launches, restored progression, and free-practice back navigation.

## Vertical path map

`LearningPathScreen` renders the authored Chapter/Stage arrays in reverse DOM order, so advancement is physically upward. Chapter landmarks are larger circular nodes; review uses arrows, checkpoint uses a trophy in a rounded diamond, and optional bonus nodes use a short side branch. Status uses check/lock icons and labels as well as color. The next main stage has a larger blue ring; completed stages remain green and replayable. All nodes retain stable IDs, so there is no fixed chapter length or screen-coordinate data in the domain.

The map has a native vertical scroll region that initially centers the current stage, with no animated auto-scrolling. Stage and shortcut sessions return to the refreshed map. Native dialog bottom sheets handle Escape, backdrop/close dismissal, a keyboard focus loop, focus restoration, safe-area padding, and scrolling on short screens. The stage personal best uses the existing five-question challenge signature, scoped to the student; ineligible clusters or missing bests show no record. Unavailable content prevents launching a partial Skill cluster. Only transient launch errors use red.

`npm run test:learning-path-ui` covers the components and is included in `npm test`. Mobile browser checks under `npm run test:mobile` verify upward ordering, current-stage centering, narrow widths, bonus placement, challenge shape, sheet focus/dismissal, and replay navigation.

## Mastery reconciliation

Local mastery is projected from all Attempts present on the device, including pending ones. The Home service compares that complete local projection with the last server snapshot:

1. A missing server snapshot uses local.
2. No local attempts uses server.
3. An equal or greater local attempt count uses local.
4. Otherwise, a later local attempt timestamp uses local; server wins when it is demonstrably newer.

This prevents stale server snapshots from replacing newer local evidence. It deliberately does not combine partial histories from different devices.

## Legacy classification

- Retained temporarily: `TopicId`, signed-number `topicId` metadata, and `signedNumbersAdapter`. Existing generated/source content still depends on these during ingestion.
- Development-only: `PlaygroundScreen`, selected by `?playground=1`.
- Removed: unreachable grade/topic screens, topic cards, topic rating/statistics repositories, and superseded session/summary helpers.

New product code must use Domain/Skill identity and must not extend the legacy topic UI.

## Intentional debt

- No true cross-device Attempt-history reconciliation.
- Assignment completion is derived and not written back to Sheets.
- Temporary `VITE_STUDENT_ID`; no authentication.
- Browser-level IndexedDB integration coverage is still needed.
- Apps Script duplicate lookup and Sheets storage target classroom-scale use, not large deployments.
- The signed-number source bank still needs a direct-skill migration before removing `TopicId` and its adapter.
- The production bundle includes React and KaTeX in one entry chunk; see the bundle note below.

## Bundle note

KaTeX and its fonts/CSS are the largest distinctive static dependency, while the main JavaScript chunk also includes React and all question/content modules. The playground is tiny relative to those dependencies. Lazy-loading only the playground would not materially resolve the warning, and route-level splitting would add complexity to the current small screen-state application. Code splitting is therefore deferred until more Domains or independently navigable areas make a stable split boundary worthwhile.
