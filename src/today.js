import { myToDoList, setButtonInMenuActive, deletePage, generatePageHeader, 
    unsetButtonsInMenuActive, generateTasksWrapperDiv, setPage, renderTasks, generateButtonAddNewTask } from "./inbox";

const buttonToday = document.getElementById("today-div");

buttonToday.addEventListener("click", function() {
    setPage("Today");
    generateTodayPage();
})

function generateTodayPage() {
    const buttonToday = document.getElementById("today-div");

    unsetButtonsInMenuActive();
    setButtonInMenuActive(buttonToday);
    deletePage();
    generatePageHeader();
    generateTasksWrapperDiv();
    generateButtonAddNewTask();
    renderTasks();
}
