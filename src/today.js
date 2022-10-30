console.log("working");

import myToDoList from "./inbox";
import setButtonInMenuActive from "./inbox";

const buttonToday = document.getElementById("today-div");
buttonToday.addEventListener("click", generateTodayPage);

function generateTodayPage() {
    console.log("generate");

    setButtonInMenuActive(buttonToday);
}



//setButtonInMenuActive(buttonToday);