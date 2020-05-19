'use strict';

// Клас запись-событие

class Record {

  constructor(name, date, text) {
    this.name = name;
    this.date = date;
    this.text = text;
    this.id = this.getId();
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (typeof value !== 'string') {
      console.log('Not a string');
    }
    this._name = value;
  }

  get date() {
    return this._date;
  }

  set date(value) {
    if (value === '') {
      value = new Date();
    }
    this._date = value;
  }

  get text() {
    return this._text;
  }

  set text(value) {
    if (value === undefined) {
      value = '';
    }
    this._text = value;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    if (value === undefined) {
      value = 0;
    }
    this._id = value;
  }

  getId() {
    const str = this._name + this._date;
    return str.replace(/ /g, '');
  }
}


module.exports = Record;
