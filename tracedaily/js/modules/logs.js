import { addLog } from "../db/indexeddb.js";
import { generateLogId } from "../core/id.js";
import { getNowTimestamp, getTodayDate, getCurrentTime } from "../core/time.js";
import { STATUS } from "../core/constants.js";

/**
 * Create a new attendance log object
 * @param {string} subjectId 
 * @param {string} status - "PRESENT" or "ABSENT"
 * @param {Blob|null} photo - required if status is PRESENT
 * @param {string} notes
 */
export function createLog({ subjectId, status, photo = null, notes = "" }) {
  if (status === STATUS.PRESENT && !photo) {
    throw new Error("Photo is required for Present status");
  }

  return {
    id: generateLogId(),
    subjectId,
    status,
    photo, // can be null if Absent
    notes,
    date: getTodayDate(),
    time: getCurrentTime(),
    createdAt: getNowTimestamp(),
    locked: false
  };
}

/**
 * Save log to DB
 */
export async function saveLog(log) {
  await addLog(log);
}
