/**
 * Minimal in-memory login throttle: 5 failures per key within 15 minutes lock
 * the key for 15 minutes. Memory is per server instance (on serverless hosting
 * it resets with each instance), so it slows brute force rather than blocking it
 * completely; the password itself remains the real protection.
 */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;
const failures = new Map();

function prune(now) {
  for (const [key, entry] of failures) {
    if (now - entry.first > WINDOW_MS) failures.delete(key);
  }
}

/** Seconds to wait before a new attempt is allowed (0 when allowed). */
export function checkLoginThrottle(key) {
  const now = Date.now();
  prune(now);
  const entry = failures.get(key);
  if (!entry || entry.count < MAX_FAILURES) return 0;
  return Math.ceil((entry.first + WINDOW_MS - now) / 1000);
}

export function recordLoginFailure(key) {
  const now = Date.now();
  const entry = failures.get(key);
  if (!entry || now - entry.first > WINDOW_MS) failures.set(key, { count: 1, first: now });
  else entry.count += 1;
}

export function clearLoginFailures(key) {
  failures.delete(key);
}
