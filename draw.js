

function draw(period) {

    let date = new Date();
    let table = document.getElementById("table_event");
    table.innerHTML = '';
    let currentList;

    if (period == 1) currentList = sortByDay(date);
    else if (period == 2) currentList = sortByWeek(date);
    else currentList = sortByMonth(date);

    for (let i = 0; i < currentList._length; i++) {
        let record = currentList.index(i).data;
        let row = table.insertRow(i);
        let cell = row.insertCell(0);
        cell.innerHTML = getGreatDate(record._date);
        cell = row.insertCell(1);
        cell.innerHTML = getTime(record._date);
        cell = row.insertCell(2);
        cell.innerHTML = record._name + '\n' + record._text;
    }
}


function getTime(date) {
    let str = date.toString();
    let point = str.indexOf(':');
    return str.substr(point-2, 2) + str.substr(point, 3);
}

function getGreatDate(date) {
    let str = date.toString();
    return str.substr(0, 10);
}