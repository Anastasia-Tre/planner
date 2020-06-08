'use strict';

const fs = require('fs');
const Record = require('./record');

class Calendar {
  constructor() {
    this.path = './server/data.json';
  }

  checkfile() {
    try {
      this.file = fs.readFileSync(this.path, 'utf-8');
    } catch (error) {
      fs.writeFileSync(this.path, '[]');
    }
  }

  showAll() {
    this.checkfile();
    this.file = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
    return this.file;
  }

  save(record) {
    this.checkfile();
    this.file = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
    this.file.push(record);
    fs.writeFileSync(this.path, JSON.stringify(this.file, null, 2));
    return record;
  }

  remove(id) {
    this.checkfile();
    this.file = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
    const recordIndex = this.file.findIndex(record => record._id === id);
    this.file.splice(recordIndex, 1);
    fs.writeFileSync(this.path, JSON.stringify(this.file, null, 2));
  }

}

//generateEvents(1);

function writeToJSON(record) {
  const path = './server/data.json';
  const file = JSON.parse(fs.readFileSync(path, 'utf-8'));
  file.push(record);
  fs.writeFileSync(path, JSON.stringify(file, null, 2));
}

function randomInteger(min, max) {
  const rand = min + Math.random() * (max - min);
  return Math.floor(rand);
}

function generateEvents(n) {
  const names = [
    'Birthday', 'MeetUP', 'Shopping', 'Event', 'Meeting',
    'Game', 'Dinner', 'Lunch', 'Weekend', 'Task', 'Walking',
  ];
  const people = [
    'Mother', 'Father', 'Friend', 'Sister', 'Brother',
    'Aunt', 'Family', 'Friends', 'Boyfriend', 'Girlfriend',
  ];

  for (let i = 0; i < n; i++) {
    const name = names[randomInteger(0, names.length)] + ' with ' +
          people[randomInteger(0, people.length)];
    const date = new Date(2020, 4, randomInteger(1, 31), randomInteger(0, 23));
    const record = new Record(name, date);
    writeToJSON(record);
  }
}

module.exports = new Calendar();
