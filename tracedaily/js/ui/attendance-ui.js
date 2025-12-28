import { calculateAttendance } from "../modules/attendance.js";
import { fetchAllSubjects } from "../db/indexeddb.js";

const summarySection = document.querySelector("section:nth-of-type(3)"); // Attendance Summary

export async function initAttendanceUI() {
  await renderSummary();
}

async function renderSummary() {
  const summary = await calculateAttendance();
  const subjects = await fetchAllSubjects();

  summarySection.innerHTML = `<h2>Attendance Summary</h2>`;

  if (!summary.length) {
    summarySection.innerHTML += `<p>No attendance logs yet.</p>`;
    return;
  }

  const ul = document.createElement("ul");

  summary.forEach((item) => {
    const subj = subjects.find((s) => s.id === item.subjectId);
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${subj ? subj.code + " — " + subj.name : item.subjectId}</strong><br>
      Present: ${item.present} / ${item.total} <br>
      Attendance: ${item.percent}% 
      ${item.warning ? `<span style="color:red">⚠ Below 75%</span>` : ""}
    `;

    ul.appendChild(li);
  });

  summarySection.appendChild(ul);
}
