import { pathToFileURL } from 'node:url';

async function request(fetchFn, url, action, payload, requestId) {
  const response = await fetchFn(url, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action, requestId, clientVersion: '1', payload }) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const body = await response.json();
  if (!body.ok) throw new Error(`${body.error?.code || 'REMOTE_ERROR'}: ${body.error?.message || 'Unknown backend error'}`);
  return body.data;
}

export async function runClassroomBackendSmoke({ url, studentId, fetchFn = fetch, now = new Date() }) {
  if (!url?.endsWith('/exec')) throw new Error('ATOMIC_MATH_SMOKE_BACKEND_URL must be an Apps Script /exec URL');
  if (!studentId) throw new Error('ATOMIC_MATH_SMOKE_STUDENT_ID is required');
  const stamp = now.toISOString().replace(/\D/g, '').slice(0, 17);
  const sessionId = `SMOKE-${stamp}`;
  const attemptId = `${sessionId}-A1`;
  const skillId = 'AR_PLACE_VALUE';
  const baseSession = { id: sessionId, studentId, selectedSkillIds: [skillId], settings: { mode: 'fixed', questionCount: 1 }, startedAt: now.getTime(), source: 'freePractice', strategy: 'balanced', status: 'active', questionCount: 0, correctCount: 0, incorrectCount: 0, accuracy: 0 };
  const attempt = { attemptId, sessionId, studentId, questionId: `${sessionId}-Q1`, skillId, difficulty: 0.2, literacyDemand: 'none', submittedAnswer: { questionType: 'numeric', data: { value: '0' } }, correct: true, supportLevel: 'independent', scoreValue: 1, responseTimeMs: 1000, submittedAt: now.toISOString(), sequenceNumber: 1 };

  const health = await request(fetchFn, url, 'health', {}, `${sessionId}-health`);
  const home = await request(fetchFn, url, 'getStudentHome', { studentId }, `${sessionId}-home`);
  if (home.studentStatus !== 'active' && !(home.student && (home.student.active === true || String(home.student.active).toUpperCase() === 'TRUE'))) throw new Error('Smoke student is unknown or inactive');
  await request(fetchFn, url, 'startSession', { session: baseSession }, `${sessionId}-start`);
  const first = await request(fetchFn, url, 'submitAttempts', { sessionId, studentId, attempts: [attempt] }, `${sessionId}-attempt-1`);
  if (!first.acceptedAttemptIds?.includes(attemptId)) throw new Error('Attempt was not accepted');
  const duplicate = await request(fetchFn, url, 'submitAttempts', { sessionId, studentId, attempts: [attempt] }, `${sessionId}-attempt-2`);
  if (!duplicate.duplicateAttemptIds?.includes(attemptId)) throw new Error('Duplicate retry was not idempotent');
  await request(fetchFn, url, 'endSession', { session: { ...baseSession, status: 'completed', endedAt: now.getTime() + 1000, endReason: 'completed', questionCount: 1, correctCount: 1, accuracy: 1 } }, `${sessionId}-end`);
  const after = await request(fetchFn, url, 'getStudentHome', { studentId }, `${sessionId}-verify`);
  if (!after.masterySnapshots?.some((row) => String(row.skillId) === skillId)) throw new Error('Resulting Mastery row was not returned');
  return { studentId, sessionId, attemptId, skillId, health: health.service || 'Atomic Math', idempotent: true };
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  if (process.env.ATOMIC_MATH_SMOKE_CONFIRM !== 'YES') {
    throw new Error('Set ATOMIC_MATH_SMOKE_CONFIRM=YES to acknowledge that this creates one clearly labeled smoke session and Attempt.');
  }
  const result = await runClassroomBackendSmoke({ url: process.env.ATOMIC_MATH_SMOKE_BACKEND_URL, studentId: process.env.ATOMIC_MATH_SMOKE_STUDENT_ID });
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}
