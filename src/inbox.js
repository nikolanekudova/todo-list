export const myToDoList = [
    {
        id: 0,
        project: "Inbox",
        title: "Check e-mails",
        dueDate: "2022-11-11",
        timeStamp: 1668124800000,
    },
    {
        id: 1,
        project: "Home",
        title: "Wash the dishes",
        dueDate: "2022-11-06",
        timeStamp: 1667689200000,
    },
];

export const page = "";
export const filteredMyToDoList = [];

const buttonInbox = document.getElementById("inbox-div");
buttonInbox.addEventListener("click", () => {
    setPage("Inbox");
    generateInboxPage();
});

dataFromStorage();
buttonInbox.click();

function Task(id, project, title, dueDate, timeStamp) {
    this.id = id;
    this.project = project;
    this.title = title;
    this.dueDate = dueDate;
    this.timeStamp = timeStamp;
    // this.description = description;
    // this.priority = priority;
}

export function setPage(pageName) {
    page = pageName;
}

function dataToStorage() {
    const myStringToDoList = JSON.stringify(myToDoList);

    localStorage.setItem("toDoList", myStringToDoList);
}

function dataFromStorage() {
    const getMyToDoList = localStorage.getItem("toDoList");

    myToDoList = JSON.parse(getMyToDoList);
}

function generateInboxPage() {
    deletePage();
    unsetButtonsInMenuActive();
    setButtonInMenuActive(buttonInbox);
    generatePageHeader();
    generateTasksWrapperDiv();
    generateButtonAddNewTask();
    renderTasks();
}

export function renderTasks() {
    dataFromStorage();
    getTasksByState();
    generateTasksToPage();
}

function getTodaysDate() {
    const date = new Date();
    let currentDay = date.getDate();

    if (currentDay < 10) {
        currentDay = "0" + currentDay;
    }

    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

    return currentDate;
}

function getTodaysTimeStamp() {
    const date = new Date();
    const currentDay = date.getDate();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const currentDate = new Date(currentYear, currentMonth, currentDay);
    const currentDateTimeStamp = currentDate.getTime();

    return currentDateTimeStamp;
}

export function getTasksByState() {
    if (page == "Inbox") {
        filteredMyToDoList = myToDoList.filter((todo) => todo.project == "Inbox");
    } else if (page == "Today") {
        const currentDate = getTodaysTimeStamp();

        filteredMyToDoList = myToDoList.filter((todo) => todo.timeStamp == currentDate);
    } else if (page == "Oncoming") {
        const currentDate = getTodaysTimeStamp();

        filteredMyToDoList = myToDoList.filter((todo) => todo.timeStamp >= currentDate);
    } else {
        const actualProject = page;

        filteredMyToDoList = myToDoList.filter((todo) => todo.project == actualProject);
    }
}

function generateTasksToPage() {
    for (let i = 0; i < filteredMyToDoList.length; i++) {
        const myToDoIndex = filteredMyToDoList[i];

        const tasksWrapperDiv = document.getElementById("tasks-wrapper");

        const divForTask = document.createElement("div");
        divForTask.setAttribute("class", "task-wrapper");

        // id kvůli odebrání (jak jinak zjistit id objektu?)
        divForTask.setAttribute("id", myToDoIndex.id);
        tasksWrapperDiv.appendChild(divForTask);

        // left side
        const divForLeftSideOfTask = document.createElement("div");
        divForLeftSideOfTask.setAttribute("class", "left-task-wrapper");
        divForTask.appendChild(divForLeftSideOfTask);

        const divForIcon = document.createElement("div");
        divForIcon.setAttribute("class", "icon-circle-wrapper");
        divForLeftSideOfTask.appendChild(divForIcon);

        const iconTask = document.createElement("i");
        iconTask.setAttribute("class", "fa-regular fa-circle fa-xl");
        divForIcon.appendChild(iconTask);

        const titleOfTask = document.createElement("div");
        divForLeftSideOfTask.appendChild(titleOfTask);

        if (page == "Inbox") {
            titleOfTask.innerHTML = myToDoIndex.title;
        } else if (page == "Today" || page == "Oncoming") {
            titleOfTask.innerHTML = myToDoIndex.title + " (" + myToDoIndex.project + ")";
        } else {
            titleOfTask.innerHTML = myToDoIndex.title;
        }

        const divForRightSideOfTask = document.createElement("div");
        divForRightSideOfTask.setAttribute("class", "right-task-wrapper");
        divForTask.appendChild(divForRightSideOfTask);

        const divDateOfTask = document.createElement("div");
        divDateOfTask.setAttribute("class", "div-date-task");
        divForRightSideOfTask.appendChild(divDateOfTask);

        if (myToDoIndex.dueDate === undefined) {
            divDateOfTask.innerHTML = "No due date";
        } else {
            divDateOfTask.innerHTML = myToDoIndex.dueDate;
            // when "duedate" is undefinied, show "no due date"
        }

        const inputDateOfTask = document.createElement("input");
        inputDateOfTask.setAttribute("type", "date");
        inputDateOfTask.setAttribute("class", "task-date-input");
        inputDateOfTask.style.display = "none";
        divForRightSideOfTask.appendChild(inputDateOfTask);

        const divForIconDelete = document.createElement("div");
        divForIconDelete.setAttribute("class", "div-icon-delete");
        divForRightSideOfTask.appendChild(divForIconDelete);

        const iconTaskDelete = document.createElement("i");
        iconTaskDelete.setAttribute("class", "fa-solid fa-trash");
        divForIconDelete.appendChild(iconTaskDelete);

        inputDateOfTask.addEventListener("focusout", dateInputFocusOut);
        divForIcon.addEventListener("click", taskIsDone);
        divDateOfTask.addEventListener("click", showDateInput);

        divForTask.addEventListener("mouseover", (event) => {
            const deleteIcon = event.currentTarget.querySelector(".div-icon-delete");
            deleteIcon.classList.add("div-icon-delete-visible");
        });

        divForTask.addEventListener("mouseleave", (event) => {
            const deleteIcon = event.currentTarget.querySelector(".div-icon-delete");
            deleteIcon.classList.remove("div-icon-delete-visible");
        });

        divForIconDelete.addEventListener("click", (event) => {
            deleteTaskFromTodolist(event);
            console.log("delete tasks from div");
        });
    }
}

export function deletePage() {
    const pageContent = document.getElementById("content");

    while (pageContent.firstChild) {
        pageContent.removeChild(pageContent.firstChild);
    }
}

export function setButtonInMenuActive(activePage) {
    activePage.classList.add("button-icon-wrapper-checked");
}

export function unsetButtonsInMenuActive() {
    const activePages = document.querySelectorAll(".button-icon-wrapper-checked");

    activePages.forEach((activePage) => {
        activePage.classList.remove("button-icon-wrapper-checked");
    });
}

export function generatePageHeader() {
    const header = document.getElementById("content-header");

    header.innerHTML = page;
}

export function generateTasksWrapperDiv() {
    const pageContent = document.getElementById("content");

    const tasksWrapperDiv = document.createElement("div");
    tasksWrapperDiv.setAttribute("id", "tasks-wrapper");
    pageContent.appendChild(tasksWrapperDiv);
}

export function generateButtonAddNewTask() {
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
    buttonCancelAddTask.addEventListener("click", cancelAddingTask);

    // add new task with "enter" key
    addTaskInput.addEventListener("keyup", (event) => {
        if (event.code === "Enter") {
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

    const titleName = addTaskInput.value;
    const index = Math.floor(Math.random() * 1000);

    if (page == "Today") {
        const today = getTodaysDate();
        const todaysTimeStamp = getTodaysTimeStamp();

        const task = new Task(index, "Inbox", titleName, today, todaysTimeStamp);
        myToDoList.push(task);
    } else {
        const task = new Task(index, page, titleName);
        myToDoList.push(task);
    }
    addTaskInput.value = "";

    dataToStorage();
    deleteTasksInDiv();
    renderTasks();
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

export function generateToDo(myToDoIndex) {
    const tasksWrapperDiv = document.getElementById("tasks-wrapper");

    const divForTask = document.createElement("div");
    divForTask.setAttribute("class", "task-wrapper");

    // id kvůli odebrání (jak jinak zjistit id objektu?)
    divForTask.setAttribute("id", myToDoIndex.id);
    tasksWrapperDiv.appendChild(divForTask);

    const divForLeftSideOfTask = document.createElement("div");
    divForLeftSideOfTask.setAttribute("class", "left-task-wrapper");
    divForTask.appendChild(divForLeftSideOfTask);

    const divForRightSideOfTask = document.createElement("div");
    divForRightSideOfTask.setAttribute("class", "right-task-wrapper");
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
        divDateOfTask.innerHTML = myToDoIndex.dueDate;
        // when "duedate" is undefinied, show "no due date"
    }

    const inputDateOfTask = document.createElement("input");
    inputDateOfTask.setAttribute("type", "date");
    inputDateOfTask.setAttribute("class", "task-date-input");
    inputDateOfTask.style.display = "none";
    divForRightSideOfTask.appendChild(inputDateOfTask);

    inputDateOfTask.addEventListener("focusout", dateInputFocusOut);
    divForIcon.addEventListener("click", taskIsDone);
    divDateOfTask.addEventListener("click", showDateInput);
}

// show input for date
function showDateInput(event) {
    const selectedTodoId = event.target.parentElement.parentElement.id;
    const selectedTodoObject = myToDoList.filter((todo) => todo.id == selectedTodoId);

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
}

// with icon circle
function taskIsDone(event) {
    const taskToDelete = event.target.parentElement.parentElement.parentElement.id;

    for (let j = 0; j < myToDoList.length; j++) {
        if (myToDoList[j].id == taskToDelete) {
            myToDoList = myToDoList.filter((task) => task.id != taskToDelete);
        }
    }
    dataToStorage();
    deleteTasksInDiv();
    renderTasks();
}

// with icon trash
function deleteTaskFromTodolist(event) {
    console.log(event.target.parentElement.parentElement.parentElement.parentElement.id);
    let taskToDelete = event.target.parentElement.parentElement.parentElement.parentElement.id;

    for (let j = 0; j < myToDoList.length; j++) {
        if (myToDoList[j].id == taskToDelete) {
            myToDoList = myToDoList.filter((task) => task.id != taskToDelete);
        }
    }
    dataToStorage();
    deleteTasksInDiv();
    renderTasks();
}

// get value from input and push it to object
function dateInputFocusOut(event) {
    const selectedTodoId = event.target.parentElement.parentElement.id;

    // wtf
    let selectedTodoObject = null;
    for (const todo of myToDoList) {
        if (todo.id == selectedTodoId) selectedTodoObject = todo;
    }

    const divDateOfTask = event.target.parentElement.querySelector(".div-date-task");
    const inputDateOfTask = event.target;

    selectedTodoObject.dueDate = inputDateOfTask.value;

    // funkce převést datum to timestamp a poslat do objektu
    const dueDateToSplit = selectedTodoObject.dueDate.split("-");
    const timeStampOdTask = new Date(dueDateToSplit[0], dueDateToSplit[1] - 1, dueDateToSplit[2]);

    selectedTodoObject.timeStamp = timeStampOdTask.getTime();

    divDateOfTask.style.display = "block";
    inputDateOfTask.style.display = "none";

    divDateOfTask.innerHTML = inputDateOfTask.value;

    dataToStorage();
    deleteTasksInDiv();
    renderTasks();
}

function deleteTasksInDiv() {
    document.querySelectorAll(".task-wrapper").forEach((task) => task.remove());
}

export function deleteToDoWithProject(project) {
    myToDoList = myToDoList.filter((todo) => todo.project != project);
    dataToStorage();
}
