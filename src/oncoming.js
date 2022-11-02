import { myToDoList, setButtonInMenuActive, deletePage, generateInboxPageHeader, 
    unsetButtonsInMenuActive, generateTasksWrapperDiv, setPage, renderTasks } from "./inbox";

const buttonOncoming = document.getElementById("oncoming-div");
//buttonOncoming.addEventListener("click", generateOncomingPage);
buttonOncoming.addEventListener("click", function() {
    setPage("Oncoming");
    generateOncomingPage();
})

function generateOncomingPage() {
    const buttonOncoming = document.getElementById("oncoming-div");

    unsetButtonsInMenuActive();
    setButtonInMenuActive(buttonOncoming);
    deletePage();
    generateInboxPageHeader();
    generateTasksWrapperDiv();
    //generateTasksToDiv();
    renderTasks();

    // spustit funkci generování tasků do divu po změně data!
}

/* function generateTasksToDiv() {
    for (let i = 0; i < myToDoList.length; i++) {
        let dateOfTask = myToDoList[i].dueDate;

        const date = new Date();
        let currentDay = date.getDate();
        let currentMonth = date.getMonth() + 1;
        let currentYear = date.getFullYear();
        let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

        if (dateOfTask >= currentDate) {
            let myToDoIndex = myToDoList[i];
            
            generateToDo(myToDoIndex);
        }
    }
} */