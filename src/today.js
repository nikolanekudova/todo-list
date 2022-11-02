import { myToDoList, setButtonInMenuActive, deletePage, generateInboxPageHeader, 
    unsetButtonsInMenuActive, generateTasksWrapperDiv, setPage, renderTasks } from "./inbox";


const buttonToday = document.getElementById("today-div");
//buttonToday.addEventListener("click", generateTodayPage);

buttonToday.addEventListener("click", function() {
    setPage("Today");
    generateTodayPage();
})

function generateTodayPage() {
    const buttonToday = document.getElementById("today-div");

    unsetButtonsInMenuActive();
    setButtonInMenuActive(buttonToday);
    deletePage();
    generateInboxPageHeader();
    generateTasksWrapperDiv();
    //generateTasksToDiv();
    renderTasks();
    // spustit funkci generování tasků do divu po změně data!
}
/* 
function generateTasksToDiv() {
    for (let i = 0; i < myToDoList.length; i++) {
        let dateOfTask = myToDoList[i].dueDate;

        const date = new Date();
        let currentDay = date.getDate();
        let currentMonth = date.getMonth() + 1;
        let currentYear = date.getFullYear();
        let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

        if (dateOfTask == currentDate) {
            let myToDoIndex = myToDoList[i];
            
            generateToDo(myToDoIndex);
        }
    }
} */