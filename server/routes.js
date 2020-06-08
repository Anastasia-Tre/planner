'use strict';

const express = require('express');
const router = express.Router();
const Calendar = require('./data.js');
const Record = require('./record');

router.get('/', async (req, res) => {
  const records = await Calendar.showAll();
  res.status(200).json(records);
});

router.post('/', async (req, res) => {
  const newRecord = new Record(
    req.body.name,
    req.body.date,
    req.body.text,
    req.body.id
  );
  await Calendar.save(newRecord);
  res.status(201).json(newRecord);
});

router.delete('/:id', async (req, res) => {
  await Calendar.remove(req.params.id);
  res.status(200).json({
    message: 'Deleted'
  });
});

module.exports = router;
