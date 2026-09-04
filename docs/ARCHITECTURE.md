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

`StudentLearningProgress` holds one student's best stars by Stage ID. Missing/zero stars mean incomplete; one to three stars mean completed. `derivePathProgress` computes the ordered stage view. All preceding main stages (`normal`, `review`, `checkpoint`) need at least one star to unlock an uncompleted stage, including across chapter boundaries. A bonus opens at its position but is never required for later progression. Empty and bonus-only chapters introduce no gate; the two paths start independently.

`recordStageResult` accepts an awarded integer from zero to three for an available or completed stage and retains the best reward on replay. Completed stages remain replayable after insertions; an inserted main review must be completed before further uncompleted stages open. Skill prerequisites and supporting Skills remain advisory and are not consulted by path progression. These locks govern only the student path UX, never direct Skill practice.

Stage stars are UX rewards, not evidence of Skill mastery. Completion/status are derived, not stored on definitions. A multi-Skill stage still produces individual atomic-Skill Attempts through the existing practice pipeline; stage rewards neither create Attempts nor change Mastery. The caller supplies awarded stars; scoring thresholds are deliberately unspecified in this foundation. Chapter `shortcutTest` metadata identifies an assessment and its atomic Skills; it does not award stars or skip stages by itself.

This foundation adds no visual path, session integration, persistence, adaptive insertion engine, or shortcut-test execution. The existing Attempt/Mastery architecture and student practice behavior remain unchanged. Run `npm run test:learning-path` for the progression and catalog checks (also included in `npm test`).

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
