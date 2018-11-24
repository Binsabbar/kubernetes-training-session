'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/arithmetic_operations/:operator', (req, res) => {
  console.log(`incomding request from: ${req.connection.remoteAddress}\n` 
             +`operator: ${req.params.operator} with ${req.query.a} and ${req.query.b}`);

  if (!req.query.a || !req.query.b) {
    res.status(400).send('querystring a and b are required')
  } else {
    var a = parseInt(req.query.a)
    var b = parseInt(req.query.b)
    var result = 0;
    
    switch (req.params.operator) {
      case 'add':
        var result = a + b;
        break;
      case 'sub':
        var result = a - b;
        break;
      default:
          res.status(400).send('invalid operation')
          return
    }
    res.status(200).send(String(result)) 
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);