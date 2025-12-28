import { createLog, saveLog } from "../modules/logs.js";

const form = document.getElementById("attendance-form");
const statusInput = document.getElementById("attendance-status");
const subjectSelect = document.getElementById("log-subject");
const photoInput = document.getElementById("attendance-photo");
const notesInput = document.getElementById("attendance-notes");

export function initLogsUI() {
  form.addEventListener("submit", handleAddLog);
}

async function handleAddLog(event) {
  event.preventDefault();

  const subjectId = subjectSelect.value;
  const status = statusInput.value;
  const notes = notesInput.value;
  const photoFile = photoInput.files[0] || null;

  try {
    const log = createLog({
      subjectId,
      status,
      photo: photoFile,
      notes
    });

    await saveLog(log);
    form.reset();
    alert("Log saved successfully!");
  } catch (err) {
    alert(err.message);
  }
}
