'use strict';

const card = record => {
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  return `
  <div class="card z-depth-2">
    <div class="row">
      <div class="col s10">
        <div class="card-content">
          <span class="card-title">${record._name}</span>
          <span>${new Date(record._date).toLocaleDateString('en-US', options)}
          </span>
          <p style="white-space: pre-line;">${record._text}</p>
        </div>
      </div>
      <div class="col">
        <div class="card-action">
          <button class="btn btn-small purple darken-4">
            <i class="material-icons js-remove" record-id="${record._id}">delete
            </i>
          </button>
        </div>
      </div>
    </div>
  </div>  
  `;
};

let records = [];
let modal;
const BASE_URL = '/api/record';
let instancesTime, instancesDate;

class RecordApi {
  static fetch() {
    return fetch(BASE_URL, { method: 'get' }).then(res => res.json());
  }

  static create(record) {
    return fetch(BASE_URL, {
      method: 'post',
      body: JSON.stringify(record),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  }

  static remove(id) {
    return fetch(`${BASE_URL}/${id}`, {
      method: 'delete'
    }).then(res => res.json());
  }

}


document.addEventListener('DOMContentLoaded', () => {
  RecordApi.fetch().then(backendRecords => {
    records = backendRecords;
    renderRecords(records);
  });


  modal = M.Modal.init(document.querySelector('.modal'));

  const elemsDate = document.querySelectorAll('.datepicker');
  instancesDate = M.Datepicker.init(elemsDate);
  const elemsTime = document.querySelectorAll('.timepicker');
  instancesTime = M.Timepicker.init(elemsTime);

  document.querySelector('#createRecord')
    .addEventListener('click', onCreateRecord);

  document.querySelector('#records').addEventListener('click', onDeletePost);

  document.querySelector('#sort-day').addEventListener('click', sortBy);
  document.querySelector('#sort-week').addEventListener('click', sortBy);
  document.querySelector('#sort-month').addEventListener('click', sortBy);
  document.querySelector('#sort-all').addEventListener('click', sortBy);

});

function renderRecords(_records = []) {
  const $records = document.querySelector('#records');

  if (_records.length > 0) {
    const html = _records.map(record => card(record)).join(' ');
    $records.innerHTML = html;
  } else {
    $records.innerHTML = '<div class="center">No records</div>';
  }
}


function onCreateRecord() {
  const $name = document.querySelector('#name');
  const $date = document.querySelector('#date');
  const $time = document.querySelector('#time');
  const $text = document.querySelector('#text');

  instancesDate[1].date.setHours(instancesTime[0].hours,
    instancesTime[0].minutes);

  if ($name.value && $date.value && $time.value) {
    const newRecord = {
      name: $name.value,
      date: instancesDate[1].date,
      text: $text.value
    };

    RecordApi.create(newRecord).then(record => {
      records.push(record);
      renderRecords(records);
    });
    modal.close();
    $name.value = '';
    $date.value = '';
    $time.value = '';
    $text.value = '';
    M.updateTextFields();
  }
}



function onDeletePost(event) {
  if (event.target.classList.contains('js-remove')) {
    const decision = confirm('Do you want to delete this record?');

    if (decision) {
      const id = event.target.getAttribute('record-id');

      RecordApi.remove(id).then(() => {
        const recordIndex = records.findIndex(record => record._id === id);
        records.splice(recordIndex, 1);
        renderRecords(records);
      });
    }
  }
}


function sortBy() {

  const param = event.target.id;

  const elemsOfSort = document.querySelectorAll('.sort');
  for (const elem of elemsOfSort) {
    elem.classList.remove('active');
  }
  document.getElementById(param).classList.add('active');

  const date = instancesDate[0].date || new Date();

  const sortedRecords = records.sort((a, b) =>
    (new Date(a._date) >= new Date(b._date) ? 1 : -1));

  let result = [];

  if (param === 'sort-day') {
    for (const elem of sortedRecords) {
      if (new Date(elem._date).getFullYear() === date.getFullYear() &&
      new Date(elem._date).getMonth() === date.getMonth() &&
      new Date(elem._date).getDate() === date.getDate()) {
        result.push(elem);
      }
    }
  }

  if (param === 'sort-week') {
    const dayOfWeek1 = new Date(date.setDate(date.getDate() - date.getDay() - 1));
    const dayOfWeek2 = new Date(date.setDate(dayOfWeek1.getDate() + 7));

    for (const elem of sortedRecords) {
      if (new Date(elem._date) >= dayOfWeek1 &&
      new Date(elem._date) <= dayOfWeek2) {
        result.push(elem);
      }
    }
  }

  if (param === 'sort-month') {
    for (const elem of sortedRecords) {
      if (new Date(elem._date).getFullYear() === date.getFullYear() &&
      new Date(elem._date).getMonth() === date.getMonth()) {
        result.push(elem);
      }
    }
  }

  if (param === 'sort-all') {
    result = sortedRecords;
  }
  renderRecords(result);
}
