const DB_NAME = "TraceDailyDB";
const DB_VERSION = 1;

let db = null;

/**
 * Initialize database
 */
export function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject("Failed to open database");

    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;

      // Subject master store
      if (!db.objectStoreNames.contains("subjects")) {
        const subjectStore = db.createObjectStore("subjects", {
          keyPath: "id"
        });
        subjectStore.createIndex("code", "code", { unique: false });
      }

      // Attendance logs store
      if (!db.objectStoreNames.contains("logs")) {
        const logStore = db.createObjectStore("logs", {
          keyPath: "id"
        });
        logStore.createIndex("date", "date", { unique: false });
        logStore.createIndex("subjectId", "subjectId", { unique: false });
        logStore.createIndex("locked", "locked", { unique: false });
      }
    };
  });
}

/**
 * Generic helper
 */
function getStore(storeName, mode = "readonly") {
  const tx = db.transaction(storeName, mode);
  return tx.objectStore(storeName);
}

/* =========================
   SUBJECT OPERATIONS
========================= */

export function addSubject(subject) {
  return new Promise((resolve, reject) => {
    const store = getStore("subjects", "readwrite");
    const req = store.add(subject);
    req.onsuccess = () => resolve();
    req.onerror = () => reject("Failed to add subject");
  });
}

export function getAllSubjects() {
  return new Promise((resolve) => {
    const store = getStore("subjects");
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
  });
}

/* =========================
   LOG OPERATIONS
========================= */

export function addLog(log) {
  return new Promise((resolve, reject) => {
    const store = getStore("logs", "readwrite");
    const req = store.add(log);
    req.onsuccess = () => resolve();
    req.onerror = () => reject("Failed to add log");
  });
}

export function getAllLogs() {
  return new Promise((resolve) => {
    const store = getStore("logs");
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
  });
}
