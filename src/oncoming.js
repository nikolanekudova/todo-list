import { myToDoList, setButtonInMenuActive, deletePage, generatePageHeader, 
    unsetButtonsInMenuActive, generateTasksWrapperDiv, setPage, renderTasks } from "./inbox";

const buttonOncoming = document.getElementById("oncoming-div");

buttonOncoming.addEventListener("click", function() {
    setPage("Oncoming");
    generateOncomingPage();
})

function generateOncomingPage() {
    const buttonOncoming = document.getElementById("oncoming-div");

    unsetButtonsInMenuActive();
    setButtonInMenuActive(buttonOncoming);
    deletePage();
    generatePageHeader();
    generateTasksWrapperDiv();
    renderTasks();
}
