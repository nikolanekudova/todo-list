const addProjectButton = document.getElementById("btn-add-project");
const projectsDiv = document.getElementById("projects-wrapper");
const projectsListDiv = document.getElementById("projects-list");

export let myProjects = [];
//local storage?


addProjectButton.addEventListener("click", addProject);

export function addProject() {

    addProjectButton.style.visibility = "hidden";
    addProjectButton.style.display = "none";

    const addProjectDiv = document.createElement("div");
    addProjectDiv.setAttribute("class", "add-project");
    projectsDiv.appendChild(addProjectDiv);

    const addProjectInput = document.createElement("input");
    addProjectInput.setAttribute("type", "text");
    addProjectInput.setAttribute("class", "project-input");
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
        }
    });

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

function deleteProjectInMenu() {
    while (projectsListDiv.firstChild) {
        projectsListDiv.removeChild(projectsListDiv.firstChild);
    }
}