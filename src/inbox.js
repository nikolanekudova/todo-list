export let myToDoList = [{ id: 0, project: "inbox", title: "Wash the dishes", description: "description", dueDate: "2022-10-30", priority: undefined }];

const buttonInbox = document.getElementById("inbox-div");

function Task(id, project, title, description, dueDate, priority) {
    this.id = id;
    this.project = project;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
}

buttonInbox.addEventListener("click", generateInboxPage);

function generateInboxPage() {
    deletePage();

    unsetButtonsInMenuActive();
    setButtonInMenuActive(buttonInbox);
    generateInboxPageHeader("Inbox");
    generateTasksWrapperDiv();
    generateButtonAddNewTask();
    generateTasksToDiv();
}

export function deletePage() {
    const pageContent = document.getElementById("content");

    while (pageContent.firstChild) {
        pageContent.removeChild(pageContent.firstChild);
    }
}

export function setButtonInMenuActive(activePage) {
    //activePage.setAttribute("class", "button-icon-wrapper-checked");

    activePage.classList.add("button-icon-wrapper-checked")
}

export function unsetButtonsInMenuActive() {
    const activePages = document.querySelectorAll(".button-icon-wrapper-checked");

    activePages.forEach(activePage => {
        activePage.classList.remove("button-icon-wrapper-checked");
    })
}

export function generateInboxPageHeader(headerName) {
    const header = document.getElementById("content-header");

    header.innerHTML = headerName;
}

export function generateTasksWrapperDiv() {
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

    // add new task with "enter" key
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

    let titleName = addTaskInput.value;
    let index = Math.floor(Math.random() * 1000);

    let task = new Task(index, "inbox", titleName);
    myToDoList.push(task);

    addTaskInput.value = "";

    deleteTasksInDiv();
    generateTasksToDiv();
    cancelAddingTask();
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


// for every task generate div
function generateTasksToDiv() {
    for (let i = 0; i < myToDoList.length; i++) {

        if (myToDoList[i].project == "inbox") {
            let myToDoIndex = myToDoList[i];
            
            generateToDo(myToDoIndex);
        }
    }
}

export function generateToDo(myToDoIndex) {
    const tasksWrapperDiv = document.getElementById("tasks-wrapper");

    const divForTask = document.createElement("div");
    divForTask.setAttribute("class", "task-wrapper")

    // id kvůli odebrání (jak jinak zjistit id objektu?)
    divForTask.setAttribute("id", myToDoIndex.id);
    tasksWrapperDiv.appendChild(divForTask);

    const divForLeftSideOfTask = document.createElement("div");
    divForLeftSideOfTask.setAttribute("class", "left-task-wrapper")
    divForTask.appendChild(divForLeftSideOfTask);

    const divForRightSideOfTask = document.createElement("div");
    divForRightSideOfTask.setAttribute("class", "right-task-wrapper")
    divForTask.appendChild(divForRightSideOfTask);

    const divForIcon = document.createElement("div");
    divForIcon.setAttribute("class", "icon-circle-wrapper");
    divForLeftSideOfTask.appendChild(divForIcon);

    const iconTask = document.createElement("i");
    iconTask.setAttribute("class", "fa-regular fa-circle fa-xl");
    divForIcon.appendChild(iconTask);

    const titleOfTask = document.createElement("div");
    divForLeftSideOfTask.appendChild(titleOfTask);
    titleOfTask.innerHTML = myToDoIndex.title;

    const divDateOfTask = document.createElement("div");
    divDateOfTask.setAttribute("class", "div-date-task");
    divForRightSideOfTask.appendChild(divDateOfTask);

    if (myToDoIndex.dueDate === undefined) {
        divDateOfTask.innerHTML = "No due date";
    } else {
        divDateOfTask.innerHTML = myToDoIndex.dueDate; // when "duedate" is undefinied, show "no due date"
    }

    const inputDateOfTask = document.createElement("input");
    inputDateOfTask.setAttribute("type", "date");
    inputDateOfTask.setAttribute("class", "task-date-input");
    inputDateOfTask.style.display = "none";
    divForRightSideOfTask.appendChild(inputDateOfTask);

    inputDateOfTask.addEventListener("focusout", inputFocusOut)
    divForIcon.addEventListener("click", deleteTaskFromTodolist);
    divDateOfTask.addEventListener("click", showDateInput);
}

// show input for date
function showDateInput(event) {
    const selectedTodoId = event.target.parentElement.parentElement.id;
    const selectedTodoObject = myToDoList.filter(todo => todo.id == selectedTodoId);

    const divDateOfTask = event.target.parentElement.querySelector(".div-date-task");
    const inputDateOfTask = event.target.parentElement.querySelector(".task-date-input");

    divDateOfTask.style.display = "none";
    inputDateOfTask.style.display = "block";

    if (selectedTodoObject.dueDate === undefined) {
        divDateOfTask.style.display = "none";
        inputDateOfTask.style.display = "block";
    } else {
        divDateOfTask.innerHTML = selectedTodoObject.dueDate;
    }
};

// add due date to mytodolist and show due date
function deleteTaskFromTodolist(event) {
    let taskToDelete = event.target.parentElement.parentElement.parentElement.id;

    for (let j = 0; j < myToDoList.length; j++) {
        if (myToDoList[j].id == taskToDelete) {
            myToDoList = myToDoList.filter(task => task.id != taskToDelete);
        }
    }
    deleteTasksInDiv();
    generateTasksToDiv();
}

// get value from input and push it to object
function inputFocusOut(event) {
    const selectedTodoId = event.target.parentElement.parentElement.id;

    // wtf
    let selectedTodoObject = null;
    for (const todo of myToDoList) {
        if (todo.id == selectedTodoId) selectedTodoObject = todo;
    }

    const divDateOfTask = event.target.parentElement.querySelector(".div-date-task");
    const inputDateOfTask = event.target;

    selectedTodoObject.dueDate = inputDateOfTask.value;

    divDateOfTask.style.display = "block";
    inputDateOfTask.style.display = "none";

    divDateOfTask.innerHTML = inputDateOfTask.value;

    console.log(myToDoList);
    deleteTasksInDiv();
    generateTasksToDiv();
}

function deleteTasksInDiv() {
    document.querySelectorAll(".task-wrapper").forEach(task => task.remove());
}
