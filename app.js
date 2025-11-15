// ------------------------
// LOAD PROJECTS
// ------------------------
async function loadProjects() {
    let localData = localStorage.getItem("jv-projects");

    if (localData) {
        return JSON.parse(localData);
    }

    const response = await fetch("projects.json");
    const data = await response.json();

    localStorage.setItem("jv-projects", JSON.stringify(data.projects));

    return data.projects;
}

// ------------------------
// RENDER PROJECT CARDS
// ------------------------
function renderProjects(projects) {
    const container = document.getElementById("projectList");
    container.innerHTML = "";

    projects.forEach((p, index) => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <button onclick="deleteProject(${index})">Excluir</button>
        `;

        container.appendChild(card);
    });
}

// ------------------------
// SAVE PROJECT
// ------------------------
function saveProject(title, description) {
    const projects = JSON.parse(localStorage.getItem("jv-projects")) || [];

    projects.push({ title, description });

    localStorage.setItem("jv-projects", JSON.stringify(projects));

    renderProjects(projects);
}

// ------------------------
// DELETE PROJECT
// ------------------------
function deleteProject(id) {
    const projects = JSON.parse(localStorage.getItem("jv-projects"));
    projects.splice(id, 1);
    localStorage.setItem("jv-projects", JSON.stringify(projects));
    renderProjects(projects);
}

// ------------------------
// MODAL
// ------------------------
const modal = document.getElementById("modal");
document.getElementById("addProjectBtn").onclick = () => modal.classList.remove("hidden");
document.getElementById("closeModal").onclick = () => modal.classList.add("hidden");

document.getElementById("saveProject").onclick = () => {
    let title = document.getElementById("titleInput").value;
    let desc = document.getElementById("descInput").value;

    if (title.trim() !== "") {
        saveProject(title, desc);
    }

    modal.classList.add("hidden");
};

// ------------------------
// INIT
// ------------------------
loadProjects().then(renderProjects);

// ------------------------
// REGISTER SERVICE WORKER
// ------------------------
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js");
    });
}