import { getNowTimestamp } from "./time.js";

const LOCK_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Returns true if a log should be locked
 */
export function shouldLockLog(createdAt) {
  const now = getNowTimestamp();
  return now - createdAt >= LOCK_DURATION_MS;
}

/**
 * Enforces lock on a log object
 */
export function enforceLock(log) {
  if (log.locked) return log;

  if (shouldLockLog(log.createdAt)) {
    return {
      ...log,
      locked: true
    };
  }

  return log;
}
