const cool = require('cool-ascii-faces')
var crypto = require('crypto');
var uuid = require('uuid');
var express = require('express');
const mysql  = require('mysql');
var bodyParser = require('body-parser');

const mysqlConexion = require('./app/model/db');
const PORT = process.env.PORT || 5000
var http = require('http');
var bodyParser = require('body-parser');

const app = express();
var routes = require('./app/routes/approutes'); //importing route

// serve files from the public directory
app.use(express.static('public'));
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded());
app.use("/", routes);


http.createServer(app).listen(PORT, () => {
    console.log("App is running on port " + PORT);
});


// serve the homepage
app.get('/cool', (req, res) => {
  res.send(cool());
});
