import { getNowTimestamp } from "./time.js";

/**
 * Generates a unique log ID using timestamp + random suffix
 */
export function generateLogId() {
  return `LOG_${getNowTimestamp()}_${Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()}`;
}
