'use strict';

const filterByAll = records => records;

const filterByDay = (records, date) => {
  const result = [];
  for (const elem of records) {
    const elemDate = new Date(elem._date);
    const checkYear = elemDate.getFullYear() === date.getFullYear();
    const checkMonth = elemDate.getMonth() === date.getMonth();
    const checkDate = elemDate.getDate() === date.getDate();
    if (checkYear && checkMonth && checkDate) {
      result.push(elem);
    }
  }
  return result;
};

const filterByWeek = (records, date) => {
  const result = [];
  const dayOfWeek1 = new Date(date.setDate(date.getDate() - date.getDay() - 1));
  const dayOfWeek2 = new Date(date.setDate(dayOfWeek1.getDate() + 7));
  for (const elem of records) {
    const elemDate = new Date(elem._date);
    if (elemDate >= dayOfWeek1 && elemDate <= dayOfWeek2) {
      result.push(elem);
    }
  }
  return result;
};

const filterByMonth = (records, date) => {
  const result = [];
  for (const elem of records) {
    const elemDate = new Date(elem._date);
    const checkYear = elemDate.getFullYear() === date.getFullYear();
    const checkMonth = elemDate.getMonth() === date.getMonth();
    if (checkYear && checkMonth) {
      result.push(elem);
    }
  }
  return result;
};

function sortBy() {
  const param = event.target.id;

  const elemsOfSort = document.querySelectorAll('.sort');
  for (const elem of elemsOfSort) {
    elem.classList.remove('active');
  }
  document.getElementById(param).classList.add('active');

  const date = instancesDate[0].date || new Date();
  records = records.sort((a, b) => {
    const aDate = new Date(a._date);
    const bDate = new Date(b._date);
    return aDate >= bDate ? 1 : -1;
  };
                         
  const parametrs = {
    'filter-day': filterByDay,
    'filter-week': filterByWeek,
    'filter-month': filterByMonth,
    'filter-all': filterByAll,
  };
  const result = parametrs[param](records, date);
  renderRecords(result);
}
