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

module.exports = new Calendar();
