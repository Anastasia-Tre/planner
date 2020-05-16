'use strict';

let now = new Date();

let now_year = now.getFullYear();
let now_month = now.getMonth();
let now_day = now.getDate();
let now_day_of_week = now.getDay();
let now_hour = now.getHours();
let now_minute = now.getMinutes();


const elem_date = document.getElementById("date");
const elem_time = document.getElementById("time");
const elem_table_mini_calendar = document.getElementById("body_mini_calendar");

elem_date.innerHTML = now_day + '.' + (now_month + 1) + '.' + now_year;
elem_time.innerHTML = getTime(now);

function updateTime() {
    now = new Date();

    now_year = now.getFullYear();
    now_month = now.getMonth();
    now_day = now.getDate();
    now_day_of_week = now.getDay();
    now_hour = now.getHours();
    now_minute = now.getMinutes();
    
    elem_date.innerHTML = now_day + '.' + (now_month + 1) + '.' + now_year;
    elem_time.innerHTML = getTime(now);
    //console.log(now.getSeconds());
}


setInterval(function () {
    updateTime();
}, 1000);




function daysInMonth() {
    return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
}


const months = ['January','Febreary','March','April','May','June',
                'July','August','September','October','November','December'];

const days_of_week = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

let arr_mini_calendar = [];
const month_for_mini_calendar = new Date();
const elem_month = document.getElementById("month");
elem_month.innerHTML = months[month_for_mini_calendar.getMonth()] + ' ' + month_for_mini_calendar.getFullYear();
mini_calendar(month_for_mini_calendar.getMonth(), month_for_mini_calendar.getFullYear());

const arrow_left = document.getElementById("arrow_left");
const arrow_right = document.getElementById("arrow_right");

arrow_left.onclick = function() {
    month_for_mini_calendar.setMonth(month_for_mini_calendar.getMonth() - 1);
    elem_month.innerHTML = months[month_for_mini_calendar.getMonth()] + ' ' + month_for_mini_calendar.getFullYear();
    elem_table_mini_calendar.innerHTML = "";
    mini_calendar(month_for_mini_calendar.getMonth(), month_for_mini_calendar.getFullYear());
}

arrow_right.onclick = function() {
    month_for_mini_calendar.setMonth(month_for_mini_calendar.getMonth() + 1);
    elem_month.innerHTML = months[month_for_mini_calendar.getMonth()] + ' ' + month_for_mini_calendar.getFullYear();
    elem_table_mini_calendar.innerHTML = "";
    mini_calendar(month_for_mini_calendar.getMonth(), month_for_mini_calendar.getFullYear());
}



function mini_calendar(month, year) {
    arr_mini_calendar = [];

    const first_day_of_month = new Date();
    first_day_of_month.setDate(1);
    first_day_of_month.setFullYear(year);
    first_day_of_month.setMonth(month);

    const day_for_start = new Date(first_day_of_month);
    day_for_start.setDate(first_day_of_month.getDate() - first_day_of_month.getDay());

    for (let i = 0; i < 6; i++) {
        arr_mini_calendar.push([]);
        for (let j = 0; j < 7; j++) {
            let day = new Date(day_for_start);
            arr_mini_calendar[i].push(day);
            day_for_start.setDate(day_for_start.getDate() + 1);
        }
    }

    for (let i = 0; i < 6; i++) {
        let row = elem_table_mini_calendar.insertRow(i);
        for (let j = 0; j < 7; j++) {
            let cell = row.insertCell(j);
            cell.innerHTML = arr_mini_calendar[i][j].getDate();
    
        }
    }
}


