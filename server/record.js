'use strict';

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
    this._name = value === undefined ? '' : value;
  }

  get date() {
    return this._date;
  }
  set date(value) {
    this._date = value === undefined ? new Date() : value;
  }

  get text() {
    return this._text;
  }
  set text(value) {
    this._text = value === undefined ? '' : value;
  }

  getId() {
    return new Date().getTime();
  }
}

module.exports = Record;
