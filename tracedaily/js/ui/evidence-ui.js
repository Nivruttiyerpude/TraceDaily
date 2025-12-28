import { enforceLock } from "../core/lock.js";
import { fetchAllLogs } from "../db/indexeddb.js";
import { STATUS } from "../core/constants.js";

const evidenceSection = document.getElementById("evidence-section");

export async function initEvidenceUI() {
  await loadEvidence();
}

async function loadEvidence() {
  const logs = await fetchAllLogs();
  evidenceSection.innerHTML = `<h2>Evidence Mode</h2>`;

  if (!logs.length) {
    evidenceSection.innerHTML += `<p>No logs available</p>`;
    return;
  }

  const ul = document.createElement("ul");

  logs.forEach((log) => {
    log = enforceLock(log); // ensure lock is applied

    const li = document.createElement("li");
    li.style.opacity = log.locked ? "0.6" : "1";

    li.innerHTML = `
      <strong>Date:</strong> ${log.date} <strong>Time:</strong> ${log.time} <br>
      <strong>Status:</strong> ${log.status} <br>
      <strong>Notes:</strong> ${log.notes || "-"} <br>
      <strong>Locked:</strong> ${log.locked ? "Yes" : "No"} <br>
      ${log.photo ? `<img src="${URL.createObjectURL(log.photo)}" alt="Evidence" style="width:100px;display:block;margin-top:5px;">` : ""}
    `;

    ul.appendChild(li);
  });

  evidenceSection.appendChild(ul);
}
