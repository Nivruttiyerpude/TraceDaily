import { fetchAllLogs } from "../db/indexeddb.js";
import { STATUS, MIN_ATTENDANCE_PERCENT } from "../core/constants.js";

/**
 * Calculates attendance % per subject
 * @returns {Array} [{subjectId, present, total, percent, warning}]
 */
export async function calculateAttendance() {
  const logs = await fetchAllLogs();

  const summary = {};

  logs.forEach((log) => {
    if (!summary[log.subjectId]) {
      summary[log.subjectId] = { present: 0, total: 0 };
    }

    summary[log.subjectId].total += 1;

    if (log.status === STATUS.PRESENT) {
      summary[log.subjectId].present += 1;
    }
  });

  // Convert to array with percentage and warning
  return Object.entries(summary).map(([subjectId, data]) => {
    const percent = data.total > 0 ? (data.present / data.total) * 100 : 0;
    return {
      subjectId,
      present: data.present,
      total: data.total,
      percent: percent.toFixed(1),
      warning: percent < MIN_ATTENDANCE_PERCENT
    };
  });
}
