import { addSubject, getAllSubjects } from "../db/indexeddb.js";

/**
 * Create subject object
 */
export function createSubject({ code, name, faculty }) {
  return {
    id: `SUBJ_${Date.now()}`,
    code: code.trim(),
    name: name.trim(),
    faculty: faculty.trim(),
    createdAt: Date.now()
  };
}

/**
 * Save subject to DB
 */
export async function saveSubject(subject) {
  await addSubject(subject);
}

/**
 * Fetch all subjects
 */
export async function fetchSubjects() {
  return await getAllSubjects();
}
