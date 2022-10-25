const addProjectButton = document.getElementById("btn-add-project");
const projectsDiv = document.getElementById("projects-wrapper");
const projectsListDiv = document.getElementById("projects-list");

export let myProjects = [];

addProjectButton.addEventListener("click", showInputAddProject);

generateInputAddProject();

function showInputAddProject() {
    const addProjectDiv = document.getElementById("add-project");

    addProjectDiv.style.display = "block";
    addProjectButton.style.display = "none";
}

export function generateInputAddProject() {
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

    buttonAddProject.addEventListener("click", addNewProject);

    const buttonCancelAddProject = document.createElement("button");
    buttonCancelAddProject.innerHTML = "Cancel";
    buttonCancelAddProject.setAttribute("id", "btn-cancel-add-project-dom");
    buttonsDiv.appendChild(buttonCancelAddProject);

    buttonCancelAddProject.addEventListener("click", cancelAddingProject);

    // klávesa enter > nový projekt
    addProjectInput.addEventListener("keyup", function (event) {
        if (event.code === 'Enter') {
            addNewProject();
        }
    });
}

function addNewProject() {
    const addProjectInput = document.getElementById("project-input");
    const addNewProjectButton = document.getElementById("btn-add-project");
    const addNewProjectInputWrapper = document.getElementById("add-project");

    myProjects.push(addProjectInput.value);
    addProjectInput.value = "";

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
    for (let i = 0; i < myProjects.length; i++) {
        const divForProject = document.createElement("div");
        divForProject.setAttribute("class", "button-icon-wrapper")
        projectsListDiv.appendChild(divForProject);

        const iconProject = document.createElement("i");
        iconProject.setAttribute("class", "fa-solid fa-list-check");
        divForProject.appendChild(iconProject);

        const nameOfProject = document.createElement("div");
        nameOfProject.innerHTML = myProjects[i];
        divForProject.appendChild(nameOfProject);
    }
}

function deleteProjectsInMenu() {
    while (projectsListDiv.firstChild) {
        projectsListDiv.removeChild(projectsListDiv.firstChild);
    }
}


/* export function addProject() {

    addProjectButton.style.visibility = "hidden";
    addProjectButton.style.display = "none";

    const addProjectDiv = document.createElement("div");
    addProjectDiv.setAttribute("class", "add-project");
    projectsDiv.appendChild(addProjectDiv);

    const addProjectInput = document.createElement("input");
    addProjectInput.setAttribute("type", "text");
    addProjectInput.setAttribute("id", "project-input");
    addProjectDiv.appendChild(addProjectInput);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.setAttribute("id", "btns-add-project-dom");
    projectsDiv.appendChild(buttonsDiv);

    const buttonAddProject = document.createElement("button");
    buttonAddProject.innerHTML = "Add";
    buttonAddProject.setAttribute("id", "btn-add-project-dom");
    buttonsDiv.appendChild(buttonAddProject);

    const buttonCancelAddProject = document.createElement("button");
    buttonCancelAddProject.innerHTML = "Cancel";
    buttonCancelAddProject.setAttribute("id", "btn-cancel-add-project-dom");
    buttonsDiv.appendChild(buttonCancelAddProject);

    // jak funkci dát ven, aby se dala použít jinde? proměnné do parametru mi dát nejdou  

    buttonAddProject.addEventListener("click", function addNewProject() {
        myProjects.push(addProjectInput.value);
        addProjectInput.value = "";

        deleteProjectInMenu();
        showProjectsInMenu();
        buttonCancelAddProject.click();
    })

    buttonCancelAddProject.addEventListener("click", function cancelAddingProject() {
        addProjectButton.style.visibility = "visible";
        addProjectButton.style.display = "";

        addProjectDiv.style.visibility = "hidden";
        addProjectDiv.style.display = "none";

        buttonsDiv.style.visibility = "hidden";
        buttonsDiv.style.display = "none";
    })

    // klávesa enter > nový projekt
    addProjectInput.addEventListener("keyup", function (event) {
        if (event.code === 'Enter') {
            myProjects.push(addProjectInput.value);
            addProjectInput.value = "";

            deleteProjectInMenu();
            showProjectsInMenu();
            buttonCancelAddProject.click();
        }
    });

} */