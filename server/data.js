'use strict';

const fs = require('fs').promises;

class Calendar {
  constructor() {
    this.path = './server/data.json';
  }

  async checkfile() {
    try {
      this.file = await fs.readFile(this.path, 'utf-8');
    } catch (error) {
      await fs.writeFile(this.path, '[]');
    }
  }

  async showAll() {
    this.checkfile();
    this.file = await fs.readFile(this.path, 'utf-8');
    return JSON.parse(this.file);
  }

  async save(record) {
    this.checkfile();
    this.file = await fs.readFile(this.path, 'utf-8');
    const records = JSON.parse(this.file);
    records.push(record);
    await fs.writeFile(this.path, JSON.stringify(records, null, 2));
    return record;
  }

  async remove(id) {
    this.checkfile();
    this.file = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    const recordIndex = this.file.findIndex(record => record._id === id);
    this.file.splice(recordIndex, 1);
    await fs.writeFile(this.path, JSON.stringify(this.file, null, 2));
  }
}

module.exports = new Calendar();
