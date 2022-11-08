import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import "./inbox";
import "./today";
import "./oncoming";
import "./projects"

const mydata = [
    {
        name: "vasek",
        age: 26,
    },
    {
        name: "nikola",
        age: 27,
    },
];

const myStringData = JSON.stringify(mydata);

localStorage.setItem("testData", myStringData);

const getData = localStorage.getItem("testData");

const parsedData = JSON.parse(getData);

console.log(parsedData);