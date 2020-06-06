'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const recordRouter = require('./server/routes');

const port = 5000;
const clientPath = path.join(__dirname, 'client');

const app = express();
app.use(bodyParser.json());
app.use('/api/record', recordRouter);
app.use(express.static(clientPath));

app.listen(port, () => {
  console.log(`Server has been started on port ${port}`);
});
