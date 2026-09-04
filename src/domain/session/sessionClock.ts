/** Start after the first question is prepared; wall-clock changes cannot shorten play. */
export function createSessionClock() {
  const startedAt = Date.now();
  const monotonicStart = performance.now();
  const elapsedMs = () => Math.max(0, performance.now() - monotonicStart);
  return { startedAt, elapsedMs, timestamp: () => startedAt + elapsedMs() };
}
