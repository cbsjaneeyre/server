/* eslint-disable array-callback-return */

// yarn start and curl http://localhost:3000/date to run the server

const express = require('express');

const app = express();

const limit = 10;
const interval = 1000;
const PORT = 3000;

let connections = [];

app.get('/date', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  connections.push(res);
});

let timer = 0;

const currentDate = new Date().toUTCString();

setTimeout(function run () {
  console.log(timer);

  if (++timer > limit) {
    connections.map(res => {
      res.write(`terminal stopped running on: ${currentDate}.\n`);
      res.end();
    });

    connections = [];
    timer = 0;
  }

  connections.map((res) => {
    res.write(`current date is: ${currentDate}.\n`);
  });

  setTimeout(run, interval);
}, interval);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
