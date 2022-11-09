import * as inbox from "./inbox";

const buttonToday = document.getElementById("today-div");

function generateTodayPage() {
    const buttonToday = document.getElementById("today-div");

    inbox.unsetButtonsInMenuActive();
    inbox.setButtonInMenuActive(buttonToday);
    inbox.deletePage();
    inbox.generatePageHeader();
    inbox.generateTasksWrapperDiv();
    inbox.generateButtonAddNewTask();
    inbox.renderTasks();
}

buttonToday.addEventListener("click", () => {
    inbox.setPage("Today");
    generateTodayPage();
});
