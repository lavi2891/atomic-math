import assert from 'node:assert/strict';
import { runClassroomBackendSmoke } from './classroom-backend-smoke.mjs';

const attempts = new Set();
const actions = [];
const fetchFn = async (_url, init) => {
  const request = JSON.parse(String(init.body)); actions.push(request.action);
  let data = {};
  if (request.action === 'health') data = { service: 'Atomic Math', version: '1' };
  if (request.action === 'getStudentHome') data = { student: { studentId: 'M8-241', active: true }, studentStatus: 'active', activeAssignments: [], masterySnapshots: attempts.size ? [{ studentId: 'M8-241', skillId: 'AR_PLACE_VALUE' }] : [] };
  if (request.action === 'submitAttempts') {
    const id = request.payload.attempts[0].attemptId;
    data = attempts.has(id) ? { acceptedAttemptIds: [], duplicateAttemptIds: [id] } : { acceptedAttemptIds: [id], duplicateAttemptIds: [] };
    attempts.add(id);
  }
  if (request.action === 'startSession' || request.action === 'endSession') data = { sessionId: request.payload.session.id };
  return new Response(JSON.stringify({ ok: true, requestId: request.requestId, serverTime: 'now', data }));
};

const result = await runClassroomBackendSmoke({ url: 'https://example.test/exec', studentId: 'M8-241', fetchFn, now: new Date('2026-09-06T12:00:00.000Z') });
assert.equal(result.idempotent, true);
assert.deepEqual(actions, ['health', 'getStudentHome', 'startSession', 'submitAttempts', 'submitAttempts', 'endSession', 'getStudentHome']);
process.stdout.write('PASS classroom backend smoke verifies health, bootstrap, session, Attempt, Mastery, and idempotency\n');
