import {
    setButtonInMenuActive,
    deletePage,
    generatePageHeader,
    unsetButtonsInMenuActive,
    generateTasksWrapperDiv,
    setPage,
    renderTasks,
    generateButtonAddNewTask,
    deleteToDoWithProject,
} from "./inbox";

export let myProjects = ["Home"];

const addProjectButton = document.getElementById("btn-add-project");
addProjectButton.addEventListener("click", showInputAddProject);

projectsFromStorage();
showProjectsInMenu();
generateInputAddProject();

function projectsToStorage() {
    const myStringProjects = JSON.stringify(myProjects);

    localStorage.setItem("projects", myStringProjects);
}

function projectsFromStorage() {
    const getMyProjects = localStorage.getItem("projects");

    myProjects = JSON.parse(getMyProjects);
}

export function generateInputAddProject() {
    const projectsDiv = document.getElementById("projects-wrapper");

    const addProjectDiv = document.createElement("div");
    addProjectDiv.setAttribute("id", "add-project");
    addProjectDiv.style.display = "none";
    projectsDiv.appendChild(addProjectDiv);

    const addProjectInput = document.createElement("input");
    addProjectInput.setAttribute("type", "text");
    addProjectInput.setAttribute("id", "project-input");
    addProjectDiv.appendChild(addProjectInput);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.setAttribute("id", "btns-add-project-dom");
    addProjectDiv.appendChild(buttonsDiv);

    const buttonAddProject = document.createElement("button");
    buttonAddProject.innerHTML = "Add";
    buttonAddProject.setAttribute("id", "btn-add-project-dom");
    buttonsDiv.appendChild(buttonAddProject);

    const buttonCancelAddProject = document.createElement("button");
    buttonCancelAddProject.innerHTML = "Cancel";
    buttonCancelAddProject.setAttribute("id", "btn-cancel-add-project-dom");
    buttonsDiv.appendChild(buttonCancelAddProject);

    buttonAddProject.addEventListener("click", addNewProject);
    buttonCancelAddProject.addEventListener("click", cancelAddingProject);
    // klávesa enter > nový projekt
    addProjectInput.addEventListener("keyup", (event) => {
        if (event.code === "Enter") {
            addNewProject();
        }
    });
}

function showInputAddProject() {
    const addProjectDiv = document.getElementById("add-project");

    addProjectDiv.style.display = "block";
    addProjectButton.style.display = "none";
}

function addNewProject() {
    const addProjectInput = document.getElementById("project-input");
    const addNewProjectButton = document.getElementById("btn-add-project");
    const addNewProjectInputWrapper = document.getElementById("add-project");

    myProjects.push(addProjectInput.value);
    addProjectInput.value = "";

    projectsToStorage();
    deleteProjectsInMenu();
    showProjectsInMenu();

    addNewProjectButton.style.display = "flex";
    addNewProjectInputWrapper.style.display = "none";
}

function cancelAddingProject() {
    const addProjectDiv = document.getElementById("add-project");

    addProjectButton.style.display = "flex";
    addProjectDiv.style.display = "none";
}

function showProjectsInMenu() {
    const projectsListDiv = document.getElementById("projects-list");

    for (let i = 0; i < myProjects.length; i++) {
        let idForProject = myProjects[i];

        const divForProject = document.createElement("div");
        divForProject.setAttribute("class", "button-icon-wrapper");
        divForProject.classList.add("project-wrapper");
        divForProject.setAttribute("id", idForProject);
        projectsListDiv.appendChild(divForProject);

        const divForRightSideOfProject = document.createElement("div");
        divForRightSideOfProject.setAttribute("class", "right-side-project");
        divForProject.appendChild(divForRightSideOfProject);

        const iconProject = document.createElement("i");
        iconProject.setAttribute("class", "fa-solid fa-list-check");
        divForRightSideOfProject.appendChild(iconProject);

        const nameOfProject = document.createElement("div");
        nameOfProject.innerHTML = myProjects[i];
        divForRightSideOfProject.appendChild(nameOfProject);

        const divForLeftSideOfProject = document.createElement("div");
        divForLeftSideOfProject.setAttribute("class", "left-side-project");
        divForProject.appendChild(divForLeftSideOfProject);

        const iconProjectDelete = document.createElement("i");
        iconProjectDelete.setAttribute("class", "fa-solid fa-trash");
        iconProjectDelete.classList.add("icon-project-delete");
        divForLeftSideOfProject.appendChild(iconProjectDelete);

        divForProject.addEventListener("click", generateProjectPage);
        divForLeftSideOfProject.addEventListener("click", deleteProject);
    }
}

function deleteProject(event) {
    event.stopPropagation();
    const projectToDelete = event.target.parentElement.parentElement.parentElement.id;

    myProjects = myProjects.filter((project) => project != projectToDelete);
    console.log(myProjects);

    projectsToStorage();
    deleteProjectsInMenu();
    showProjectsInMenu();
    deleteToDoWithProject(projectToDelete);
}

function deleteProjectsInMenu() {
    const projectsListDiv = document.getElementById("projects-list");

    while (projectsListDiv.firstChild) {
        projectsListDiv.removeChild(projectsListDiv.firstChild);
    }
}

function generateProjectPage(event) {
    event.stopPropagation();
    const selectedProject = event.currentTarget;

    setPage(event.target.id);
    deletePage();
    unsetButtonsInMenuActive();
    setButtonInMenuActive(selectedProject);
    generatePageHeader();
    generateTasksWrapperDiv();
    generateButtonAddNewTask();
    renderTasks();
}
