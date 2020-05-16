
let listByDay, listByWeek, listByMonth;
let date = new Date();

function sortByDay(date) {
    listByDay = new List();
    for (let i = 0; i < Data._length; i++) {
        let record = Data.index(i).data;
        if (record._date.getFullYear() == date.getFullYear() &&
            record._date.getMonth() == date.getMonth() &&
            record._date.getDate() == date.getDate()) {

            listByDay.add(record);
        }
    }
    
    return listByDay;
}

function sortByWeek(date) {
    listByWeek = new List();
    date.setHours(0, 0, 0);

    let day_of_week1 = new Date(date.setDate(date.getDate() - date.getDay()));
    let day_of_week2 = new Date(date.setDate(day_of_week1.getDate() + 7));

    for (let i = 0; i < Data._length; i++) {
        let record = Data.index(i).data;
        if (record._date >= day_of_week1 &&
            record._date <= day_of_week2) {

            listByWeek.add(record);
        }
    }

    return listByWeek;
}

function sortByMonth(date) {
    listByMonth = new List(date);
    for (let i = 0; i < Data._length; i++) {
        let record = Data.index(i).data;
        if (record._date.getFullYear() == date.getFullYear() &&
            record._date.getMonth() == date.getMonth()) {

            listByMonth.add(record);
        }
    }

    return listByMonth;
}