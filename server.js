require('rootpath')();
const cors = require('cors');
const cool = require('cool-ascii-faces')
var crypto = require('crypto');
var uuid = require('uuid');
var express = require('express');
const mysql  = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
const errorHandler = require('./app/_helpers/error-handler');
require('events').EventEmitter.prototype._maxListeners = 100;
const mysqlConexion = require('./app/model/db');
const PORT = process.env.PORT || 5000
var http = require('http');
var bodyParser = require('body-parser');

const app = express();

app.use(session({secret: "Shh, its a secret!"}));

//Routes
var routeLogin = require('./app/routes/approutes'); //importing route
var routeBeneficiario = require('./app/routes/beneficiarioroute'); //Ruta beneficiario
var routeUser = require('./app/routes/userroute'); //Ruta usuarios.
var routeEvent = require('./app/routes/eventRoute'); //Ruta eventos.

// serve files from the public directory
app.use(express.static('public'));
app.use(bodyParser.json());  
//app.use(cors());
app.use(bodyParser.urlencoded());
// global error handler
app.use(errorHandler);
app.use("/beneficiario/", routeBeneficiario);
app.use("/", routeLogin);

app.use("/usuario/", routeUser);
app.use("/evento/", routeEvent);
 
http.createServer(app).listen(PORT, () => {
    console.log("App is running on port " + PORT);
});


// serve the homepage
app.get('/cool', (req, res) => {
  res.send(cool());
});
