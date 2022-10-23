const header = document.getElementById("content-header");
const pageContent = document.getElementById("content");
const buttonInbox = document.getElementById("inbox-div");

buttonInbox.addEventListener("click", showInbox);

showInbox();

export function showInbox() {
    buttonInbox.setAttribute("class", "button-icon-wrapper-checked");

    header.innerHTML = "Inbox";

    const buttonAddTask = document.createElement("div");
    buttonAddTask.setAttribute("class", "btn-add-task");
    pageContent.appendChild(buttonAddTask);

    const iconButtonAddTask = document.createElement("i");
    iconButtonAddTask.setAttribute("class", "fa-solid fa-plus");
    buttonAddTask.appendChild(iconButtonAddTask);

    const textButtonAddTask = document.createElement("div");
    textButtonAddTask.innerHTML = "Add Task";
    buttonAddTask.appendChild(textButtonAddTask);

    
}