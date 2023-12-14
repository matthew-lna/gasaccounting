const express = require('express');
const app = express();
const path = require('path');
const body_parser = require('body-parser');

const environment_middleware = require('./api/middleware/env');
const main_controller = require('./api/controllers/main');

app.use(body_parser.json({limit: '50mb'}));  // Convert request body to json
app.use(body_parser.urlencoded({extended: false},{limit: '50mb'}));  // To read request bodies
app.use(express.static(__dirname));

// Prevent CORS errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// App View
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/login', environment_middleware, main_controller.login);
app.post('/mysql_insert', environment_middleware, main_controller.mysql_insert);
app.post('/mysql_modify', environment_middleware, main_controller.mysql_modify);
app.post('/mysql_retrieve', environment_middleware, main_controller.mysql_retrieve);
app.post('/send_email', environment_middleware, main_controller.send_email);


// 404 page
app.use((req, res, next) => {
    const error = new Error("Not found!");
    error.status = 404;
    next(error);
});

// Catch and display uncaught errors
app.use((error, req, res, next) => {
    res.status(error.status || 500); 
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;
