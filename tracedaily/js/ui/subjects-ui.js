import { createSubject, saveSubject, fetchSubjects } from "../modules/subjects.js";

const form = document.getElementById("subject-form");
const list = document.getElementById("subject-list");
const subjectSelect = document.getElementById("log-subject");

export function initSubjectsUI() {
  form.addEventListener("submit", handleAddSubject);
  loadSubjects();
}

async function handleAddSubject(event) {
  event.preventDefault();

  const code = document.getElementById("subject-code").value;
  const name = document.getElementById("subject-name").value;
  const faculty = document.getElementById("faculty-name").value;

  const subject = createSubject({ code, name, faculty });
  await saveSubject(subject);

  form.reset();
  loadSubjects();
}

async function loadSubjects() {
  const subjects = await fetchSubjects();

  list.innerHTML = "";
  subjectSelect.innerHTML = `<option value="">Select Subject</option>`;

  subjects.forEach((subj) => {
    const li = document.createElement("li");
    li.textContent = `${subj.code} — ${subj.name} (${subj.faculty})`;
    list.appendChild(li);

    const opt = document.createElement("option");
    opt.value = subj.id;
    opt.textContent = `${subj.code} — ${subj.name}`;
    subjectSelect.appendChild(opt);
  });
}
