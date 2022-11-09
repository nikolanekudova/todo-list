import * as inbox from "./inbox";

const buttonOncoming = document.getElementById("oncoming-div");

function generateOncomingPage() {
    const buttonOncoming = document.getElementById("oncoming-div");

    inbox.unsetButtonsInMenuActive();
    inbox.setButtonInMenuActive(buttonOncoming);
    inbox.deletePage();
    inbox.generatePageHeader();
    inbox.generateTasksWrapperDiv();
    inbox.renderTasks();
}

buttonOncoming.addEventListener("click", () => {
    inbox.setPage("Oncoming");
    generateOncomingPage();
});
