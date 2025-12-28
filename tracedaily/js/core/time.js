/**
 * Returns current system timestamp (ms)
 * Never accept user input
 */
export function getNowTimestamp() {
  return Date.now();
}

/**
 * Returns ISO date string: YYYY-MM-DD
 */
export function getTodayDate() {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

/**
 * Returns time string: HH:MM:SS
 */
export function getCurrentTime() {
  const now = new Date();
  return now.toTimeString().split(" ")[0];
}
