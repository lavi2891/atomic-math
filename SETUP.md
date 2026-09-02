# Atomic Math — manual Google Sheets and Apps Script setup

Atomic Math works fully offline when no backend URL is configured. These steps add optional synchronization. Nothing in this repository deploys code or accesses a Google account automatically.

## 1. Create or select the Google Sheet

1. Sign in to the Google account that will own the classroom data.
2. Create a blank Google Sheet, or open a dedicated existing development Sheet.
3. Give it a clear name such as `Atomic Math - Development` or `Atomic Math - Class 8B`.
4. Do not use a Sheet containing unrelated data. The initializer creates and validates named tabs.
5. In the Sheet, open **Extensions → Apps Script**. This creates a script project bound to that Sheet.

## 2. Copy the Apps Script files

Create these three script files in the Apps Script editor and copy their complete contents from the repository:

- `Core.gs` from `apps-script/Core.gs`
- `Setup.gs` from `apps-script/Setup.gs`
- `Code.gs` from `apps-script/Code.gs`

The order does not matter. Remove the editor's sample `myFunction` code. Save the project and name it `Atomic Math Backend`.

## 3. Initialize the Sheet

1. In the function selector at the top of the Apps Script editor, choose `initializeAtomicMathSheets`.
2. Click **Run**.
3. On the first run, Google asks for authorization. Choose **Review permissions**, select the Sheet owner's account, review the requested spreadsheet/script permissions, and click **Allow**.
4. If Google displays an “unverified app” warning for this private script, open **Advanced**, confirm that the script is the project you just created, and continue only if you recognize it.
5. Return to the Sheet and confirm these tabs exist with frozen header rows:
   - `Students`
   - `Attempts`
   - `Sessions`
   - `Mastery`
   - `Assignments`
   - `Classes`
   - `AppConfig`

The initializer is safe to rerun when headers are compatible. It refuses to overwrite a populated sheet with incompatible headers.

Add a development student to `Students`, for example:

```text
DEV_STUDENT | Development Student | DEV | | TRUE | 2026-01-01T00:00:00.000Z | 2026-01-01T00:00:00.000Z
```

Use an ID rather than a real student name while testing.

## 4. Deploy as a Web App

1. In Apps Script, click **Deploy → New deployment**.
2. Click the gear icon and choose **Web app**.
3. Description: `Atomic Math API v1`.
4. **Execute as:** `Me` (the Sheet owner). This allows the script to update the bound Sheet.
5. **Who has access:** choose the narrowest option that still allows the school devices to call it. For a Workspace domain, prefer users in that domain if anonymous fetches work in your environment. If the frontend cannot reach the endpoint without a Google sign-in redirect, use the available “Anyone” option and treat the URL as sensitive.
6. Click **Deploy**, complete any requested authorization, and copy the URL ending in `/exec`.

Do not use the `/dev` test URL in the student application; it is editor-only and requires an authorized Google session.

## 5. Configure Atomic Math

At the repository root, create `.env.local` (it is not committed) based on `.env.example`:

```dotenv
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
VITE_STUDENT_ID=DEV_STUDENT
```

Never place Google credentials, API keys, or student names in this file. The Web App URL is configuration, not a Google credential, but should still be shared only with intended users.

Restart the Vite development server after changing environment variables:

```text
npm run dev
```

For a fully offline build, omit `VITE_APPS_SCRIPT_URL` or leave it blank. Attempts and sessions remain in IndexedDB and wait for a later configured connection.

## 6. Verify the connection

First open the deployed `/exec` URL in a browser. A successful health response resembles:

```json
{"ok":true,"requestId":"health","serverTime":"...","data":{"service":"Atomic Math","version":"1"}}
```

Then:

1. Run Atomic Math with the configured URL.
2. Start a short five-question session using `DEV_STUDENT`.
3. Answer at least one question and end the session.
4. Wait up to 25 seconds, or briefly take the browser offline and online to trigger a flush.
5. Confirm rows appear in `Attempts` and `Sessions`.
6. Confirm an affected `(studentId, skillId)` row appears in `Mastery`.
7. Refresh Atomic Math and verify prior mastery remains visible. Attempts marked synced remain in IndexedDB as local learning history.

If nothing appears, check the browser developer console/network panel for the `/exec` request, confirm `.env.local` was loaded after a server restart, and open **Apps Script → Executions** for server errors.

## 7. Update an existing deployment

After changing any `.gs` file:

1. Copy the updated file into Apps Script and save.
2. Open **Deploy → Manage deployments**.
3. Edit the Web App deployment.
4. Select **New version** and deploy.
5. Keep using the same `/exec` URL unless Google explicitly creates a new deployment.

## 8. Safely reset a development Sheet

`resetAtomicMathDevelopmentSheets` deletes data rows from every Atomic Math tab. It must never be run against a production classroom Sheet.

The function contains a safety gate:

1. Open the `AppConfig` tab.
2. Right-click cell `A1` → **Insert note**.
3. Enter exactly: `ATOMIC_MATH_DEVELOPMENT_SHEET`
4. Make a backup with **File → Make a copy** if any data matters.
5. In Apps Script, choose `resetAtomicMathDevelopmentSheets` and click **Run**.
6. Confirm the headers remain and all data rows are empty.
7. Remove the note from `AppConfig!A1` after the reset to re-enable the safety stop.

The reset cannot be undone except from Sheet version history or a backup. It does not clear IndexedDB in student browsers; use a separate browser profile or browser site-data controls for a completely clean development test.

## 9. Maintenance and data authority

- `Attempts` is append-only and authoritative.
- `Mastery` is a rebuildable cache, never the primary record.
- Run `rebuildAllMasteryCache` manually if the cache must be regenerated from all Attempts.
- Retrying an Attempt is safe: `attemptId` duplicate detection treats an existing row as accepted.
- Sessions are updated idempotently by their locally created `sessionId`.
- The current duplicate strategy reads the Attempt ID column once per submitted batch. This is deliberately simple and reliable for dozens of students; a larger installation should introduce a stronger indexed datastore.
- Student profile, assignment, and last-known server mastery data are cached in browser IndexedDB so the Home screen remains useful offline. Clearing browser site data removes this cache and all unsynced local records.
- Non-retryable rejected records remain in IndexedDB with an `invalid` sync state for developer inspection; they are not retried automatically and do not block valid queued records.
