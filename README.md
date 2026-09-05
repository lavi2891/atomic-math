# Atomic Math

Atomic Math is a Hebrew-first mathematics practice application. Student Home leads with two learning paths, followed by a five-question quick check and free practice. It continues to work when the optional Google Sheets backend is unavailable.

## Development

Requirements: a current Node.js release and npm.

```text
npm install
npm run dev
npm test
npm run lint
npm run build
```

`npm run test:mobile` runs browser layout regressions in installed Chrome. Set `PLAYWRIGHT_CHANNEL=msedge` to use Edge instead. These tests simulate visual-viewport keyboard shrinking/panning and layout-viewport resizing, then check real element geometry, focus, scrolling, and Enter submission. They do not replace a physical Android/iOS keyboard check. Test sessions disable external synchronization.

Copy `.env.example` to `.env.local` to set the temporary development student and optional Apps Script URL. `.env.local` is ignored by Git. Without a backend URL, the application runs in local/offline mode and stores attempts and sessions in IndexedDB.

Manual Google Sheets and Apps Script deployment is documented in [SETUP.md](./SETUP.md).

## Current architecture

```text
Student UI
  → session engine
  → Attempt evidence
  → local IndexedDB
  → synchronization queue
  → Apps Script / Google Sheets
```

`Attempt` is the authoritative learning record. Mastery is a deterministic projection derived from Attempts; the `Mastery` Sheet and cached snapshots are rebuildable views, not primary evidence.

Home's Continue action opens a narrow vertical learning path centered on the current stage. Later stages sit above completed stages, with chapter landmarks and short optional bonus branches. Tapping an available or completed stage opens a bottom sheet with stars, practice/replay, and a matching personal best when one exists. Accuracy awards zero to three stars using configurable Stage thresholds; one star unlocks the next required stage. Chapter landmarks can offer a short shortcut assessment that bypasses the lead-up to the checkpoint while keeping those stages accessible. Session outcomes restore offline from IndexedDB. Stars and shortcut bypasses never fabricate atomic Skill Mastery. Geometry is marked as coming soon until its atomic Skills exist. The existing topic and Skill selection tree is available through “תרגול חופשי”; Home keeps its compact cards without mastery analytics.

- `src/app`: React screens, top-level composition, and application services.
- `src/domain`: framework-independent session, mastery, attempt, and student-home rules.
- `src/content`: Domain/Skill catalog plus explicitly isolated legacy content adapters.
- `src/infrastructure`: IndexedDB persistence, transport client, and synchronization.
- `src/shared`: generic parsing, logging, assertions, and seeded-random utilities.
- `src/ui`: reusable rendering and design primitives.
- `apps-script`: manually deployed Google Apps Script backend.
- `scripts`: deterministic generators and Node-based test suites.

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for boundaries and current compatibility decisions.

## Adding skills and questions

1. Add the Domain or Skill metadata under `src/content/catalog`.
2. Add question definitions under the appropriate content/question module.
3. Ensure every question entering normal practice has a registered `skillId`.
4. Add the definition to the relevant question pool.
5. Run catalog, generator, and session tests.

Legacy signed-number definitions still receive `skillId` through `src/content/legacy/signedNumbersAdapter.ts`. New content should provide `skillId` directly and must not add new topic-to-skill mappings.

## Offline and synchronization behavior

Attempts are saved locally before synchronization. Retryable failures remain pending with bounded exponential backoff. Non-retryable records are marked `invalid`, retained in IndexedDB for inspection, and excluded from future retries without blocking other records. Student bootstrap data is cached for offline Home rendering.

The current server/local mastery policy chooses the projection with demonstrably fresher evidence. It does not merge histories from multiple devices; that limitation is documented in the architecture notes.
