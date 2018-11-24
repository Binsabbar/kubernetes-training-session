'use strict';

const express = require('express');
const request = require('request');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const BACK_END_IP = process.env.BACK_END_IP
const BACK_END_PORT = 8080

// App
const app = express();
app.get('/add/:a/:b', (req, res) => {
  console.log(`Server IP:  ${req.connection.localAddress}`);
  snedRequest(req.params.a, 
              req.params.b,
              'add', 
              body => res.send(`api response: ${body}`), 
              _ => res.status(500).send('something went wrong'));
});

app.get('/sub/:a/:b', (req, res) => {
  console.log(`Server IP:  ${req.connection.localAddress}`);
  snedRequest(req.params.a, 
              req.params.b, 
              'sub', 
              body => res.send(`api response: ${body}`), 
              _ => res.send('something went wrong')
  );
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


function snedRequest(a, b, operation, callback, err) {
  console.log(`snedRequest - ${operation} for ${a}:${b}`);
  request.get(
    `http://${BACK_END_IP}:${BACK_END_PORT}/arithmetic_operations/${operation}?a=${a}&b=${b}`,
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        callback(body);
      } else {
        console.log('ERROR:' + body)
        err();
      }
    }
  );
}