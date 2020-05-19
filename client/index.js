
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
                    <span>${new Date(record._date).toLocaleDateString('en-US', options)}</span>
                    <p style="white-space: pre-line;">${record._text}</p>
                </div>
            </div>
            <div class="col">
                <div class="card-action">
                    <button class="btn btn-small red">
                        <i class="material-icons js-remove" record-id="${record._id}">delete</i>
                    </button>
                </div>
            </div>
        </div>
    </div>    
    `;
}

let records = [];
let modal;
const BASE_URL = '/api/record';
let instances_time, instances_date;

class RecordApi {
    static fetch() {
        return fetch(BASE_URL, {method: 'get'}).then(res => res.json());
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

    const elems_date = document.querySelectorAll('.datepicker');
    instances_date = M.Datepicker.init(elems_date);
    const elems_time = document.querySelectorAll('.timepicker');
    instances_time = M.Timepicker.init(elems_time);

    document.querySelector('#createRecord').addEventListener('click', onCreateRecord);

    document.querySelector('#records').addEventListener('click', onDeletePost);
    
});

function renderRecords(_records = []) {
    const $records = document.querySelector('#records');

    if (_records.length > 0) {
        const html = _records.map(record => card(record)).join(' ');
        $records.innerHTML = html;
    } else {
        $records.innerHTML = `<div class="center">No records</div>`;
    }
}


function onCreateRecord() {
    const $name = document.querySelector('#name');
    const $date = document.querySelector('#date');
    const $time = document.querySelector('#time');
    const $text = document.querySelector('#text');

    instances_date[0].date.setHours(instances_time[0].hours, instances_time[0].minutes);
    console.log(instances_date[0].date);


    if ($name.value && $date.value && $time.value) {
        const newRecord = {
            name: $name.value,
            date: instances_date[0].date,
            text: $text.value
        }

        //console.log(newRecord);

        RecordApi.create(newRecord).then(record => {
            records.push(record);
            //console.log(record);
            renderRecords(records);
        })
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
        const decision = confirm("Do you want to delete this record?");

        if (decision) {
            const id = event.target.getAttribute('record-id');

            RecordApi.remove(id).then(() => {
                const recordIndex = records.findIndex(record => record._id === id);
                records.splice(recordIndex, 1);
                renderRecords(records);
            })
        }
    }
}