export let myToDoList = [{ id: 0, project: "inbox", title: "vzorový task", description: "vzorový description", dueDate: undefined, priority: undefined }];

const buttonInbox = document.getElementById("inbox-div");
//buttonInbox.addEventListener("click", showInbox);

function Task(id, project, title, description, dueDate, priority) {
    this.id = id;
    this.project = project;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
}

generateInboxPageHeader();
generateTasksWrapperDiv();
generateButtonAddNewTask();
//generateNewTaskInput();

showTasks();
setButtonInMenuActive(buttonInbox);

function setButtonInMenuActive(activePage) {
    activePage.setAttribute("class", "button-icon-wrapper-checked");
}

export function generateInboxPageHeader() {
    const header = document.getElementById("content-header");

    header.innerHTML = "Inbox";
}

function generateTasksWrapperDiv() {
    const pageContent = document.getElementById("content");

    const tasksWrapperDiv = document.createElement("div");
    tasksWrapperDiv.setAttribute("id", "tasks-wrapper");
    pageContent.appendChild(tasksWrapperDiv);
}

function generateButtonAddNewTask() {
    const pageContent = document.getElementById("content");

    const buttonAddTask = document.createElement("div");
    buttonAddTask.setAttribute("id", "btn-add-task");
    pageContent.appendChild(buttonAddTask);

    const iconButtonAddTask = document.createElement("i");
    iconButtonAddTask.setAttribute("class", "fa-solid fa-plus");
    buttonAddTask.appendChild(iconButtonAddTask);

    const textButtonAddTask = document.createElement("div");
    textButtonAddTask.innerHTML = "Add Task";
    buttonAddTask.appendChild(textButtonAddTask);

    generateNewTaskInput();

    buttonAddTask.addEventListener("click", showInputAddNewTask);
}

function generateNewTaskInput() {
    const pageContent = document.getElementById("content");

    // vytvoří div, input, div, 2x button pro přidání nového tasku
    const addTaskDiv = document.createElement("div");
    addTaskDiv.setAttribute("id", "add-task");
    addTaskDiv.style.display = "none";
    pageContent.appendChild(addTaskDiv);

    const addTaskInput = document.createElement("input");
    addTaskInput.setAttribute("type", "text");
    addTaskInput.setAttribute("id", "task-input");
    addTaskDiv.appendChild(addTaskInput);

    const buttonsTaskDiv = document.createElement("div");
    buttonsTaskDiv.setAttribute("id", "btns-add-task-dom");
    addTaskDiv.appendChild(buttonsTaskDiv);

    const buttonAddTaskDiv = document.createElement("button");
    buttonAddTaskDiv.innerHTML = "Add";
    buttonAddTaskDiv.setAttribute("id", "btn-add-task-dom");
    buttonsTaskDiv.appendChild(buttonAddTaskDiv);

    const buttonCancelAddTask = document.createElement("button");
    buttonCancelAddTask.innerHTML = "Cancel";
    buttonCancelAddTask.setAttribute("id", "btn-cancel-add-task-dom");
    buttonsTaskDiv.appendChild(buttonCancelAddTask);

    buttonAddTaskDiv.addEventListener("click", addNewTask);
    buttonCancelAddTask.addEventListener("click", cancelAddingTask)

    addTaskInput.addEventListener("keyup", function (event) {
        if (event.code === 'Enter') {
            addNewTask();
        }
    });
}

function cancelAddingTask() {
    const addTaskDiv = document.getElementById("add-task");
    const buttonAddTask = document.getElementById("btn-add-task");

    addTaskDiv.style.display = "none";
    buttonAddTask.style.display = "flex";
}

function addNewTask() {
    const addTaskInput = document.getElementById("task-input");
    const buttonCancelAddTask = document.getElementById("btn-cancel-add-task-dom");

    let titleName = addTaskInput.value;
    let index = Math.floor(Math.random() * 1000);

    let task = new Task(index, "inbox", titleName);
    myToDoList.push(task);

    addTaskInput.value = "";

    deleteTasksInDiv();
    showTasks();

    // zmáčne za mě klávesu "cancel"
    buttonCancelAddTask.click();
}

function showInputAddNewTask() {
    const addTaskDiv = document.getElementById("add-task");

    addTaskDiv.style.display = "block";
    hideButtonAddNewTask();
}

function hideButtonAddNewTask() {
    const buttonAddTask = document.getElementById("btn-add-task");

    buttonAddTask.style.display = "none";
}

function showTasks() {
    const tasksWrapperDiv = document.getElementById("tasks-wrapper");

    for (let i = 0; i < myToDoList.length; i++) {
        const divForTask = document.createElement("div");
        divForTask.setAttribute("class", "task-wrapper")
        tasksWrapperDiv.appendChild(divForTask);

        const divForLeftSideOfTask = document.createElement("div");
        divForLeftSideOfTask.setAttribute("class", "left-task-wrapper")
        divForTask.appendChild(divForLeftSideOfTask);

        const divForRightSideOfTask = document.createElement("div");
        divForRightSideOfTask.setAttribute("class", "right-task-wrapper")
        divForTask.appendChild(divForRightSideOfTask);

        const iconTask = document.createElement("i");
        iconTask.setAttribute("class", "fa-regular fa-circle fa-xl");
        divForLeftSideOfTask.appendChild(iconTask);

        const titleOfTask = document.createElement("div");
        titleOfTask.innerHTML = myToDoList[i].title;
        divForLeftSideOfTask.appendChild(titleOfTask);

        // nahradit input divem s textem "no due date" > když kliknu, nahradí mi div inputem, jakmile dám datum, tak mi vrátí div
        // s innerhtml hodnotou datumu
        const dateOfTask = document.createElement("input");
        dateOfTask.setAttribute("type", "date");
        dateOfTask.setAttribute("class", "task-date-input");
        divForRightSideOfTask.appendChild(dateOfTask);

        // prochází array
    }
}

function deleteTasksInDiv() {
    document.querySelectorAll(".task-wrapper").forEach(task => task.remove());
}
