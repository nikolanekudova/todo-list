const header = document.getElementById("content-header");
const pageContent = document.getElementById("content");
const buttonInbox = document.getElementById("inbox-div");

export let myToDoList = [{ id: 0, project: "inbox", title: "vzorový task", description: "vzorový description", dueDate: undefined, priority: undefined }];

buttonInbox.addEventListener("click", showInbox);

function Task(id, project, title, description, dueDate, priority) {
    this.id = id;
    this.project = project;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
}

showTasks();
showInbox();

export function showInbox() {
    // "zakliknutí" v menu
    buttonInbox.setAttribute("class", "button-icon-wrapper-checked");

    // vygeneruje inbox stránku
    header.innerHTML = "Inbox";

    const buttonAddTask = document.createElement("div");
    buttonAddTask.setAttribute("id", "btn-add-task");
    pageContent.appendChild(buttonAddTask);

    const iconButtonAddTask = document.createElement("i");
    iconButtonAddTask.setAttribute("class", "fa-solid fa-plus");
    buttonAddTask.appendChild(iconButtonAddTask);

    const textButtonAddTask = document.createElement("div");
    textButtonAddTask.innerHTML = "Add Task";
    buttonAddTask.appendChild(textButtonAddTask);


    buttonAddTask.addEventListener("click", function addNewTask() {

        buttonAddTask.style.visibility = "hidden";
        buttonAddTask.style.display = "none";

        // vytvoří div, input, div, 2x button pro přidání nového tasku
        const addTaskDiv = document.createElement("div");
        addTaskDiv.setAttribute("class", "add-task");
        pageContent.appendChild(addTaskDiv);

        const addTaskInput = document.createElement("input");
        addTaskInput.setAttribute("type", "text");
        addTaskInput.setAttribute("class", "task-input");
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


        buttonAddTaskDiv.addEventListener("click", function addNewTask() {
            let titleName = addTaskInput.value;
            let index = Math.floor(Math.random() * 1000);

            // id, project, title, description, dueDate, priority
            let task = new Task(index, "inbox", titleName);
            myToDoList.push(task);

            addTaskInput.value = "";

            deleteTasksInDiv();
            showTasks();

            // zmáčne za mě klávesu "cancel"
            buttonCancelAddTask.click();
        })

        // všechno delete?
        buttonCancelAddTask.addEventListener("click", function cancelAddingTask() {
            buttonAddTask.style.visibility = "visible";
            buttonAddTask.style.display = "";

            addTaskDiv.style.visibility = "hidden";
            addTaskDiv.style.display = "none";

            buttonsTaskDiv.style.visibility = "hidden";
            buttonsTaskDiv.style.display = "none";
        })

        // duplicita??
        addTaskInput.addEventListener("keyup", function (event) {
            if (event.code === 'Enter') {
                let titleName = addTaskInput.value;
                let index = Math.floor(Math.random() * 1000);

                // id, project, title, description, dueDate, priority
                let task = new Task(index, "inbox", titleName);
                myToDoList.push(task);

                addTaskInput.value = "";

                deleteTasksInDiv();
                showTasks();

                // zmáčne za mě klávesu "cancel"
                buttonCancelAddTask.click();
            }
        });


    })
}

function showTasks() {
    console.log(myToDoList);

    const divForAllTasks = document.createElement("div");
    divForAllTasks.setAttribute("class", "tasks-wrapper")
    pageContent.appendChild(divForAllTasks);

    for (let i = 0; i < myToDoList.length; i++) {

        const divForTask = document.createElement("div");
        divForTask.setAttribute("class", "task-wrapper")
        divForAllTasks.appendChild(divForTask);

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

        console.log(myToDoList[i]);
    }
}

function deleteTasksInDiv() {
    const divForAllTasks = document.querySelectorAll('.tasks-wrapper');

    divForAllTasks.forEach(task => {
        task.remove();
    });
}

