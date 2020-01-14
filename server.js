const cool = require('cool-ascii-faces')

const express = require('express');

const PORT = process.env.PORT || 5000
var http = require('http');
var bodyParser = require('body-parser');

const app = express();

// serve files from the public directory
app.use(express.static('public'));
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded());



http.createServer(app).listen(PORT, () => {
    console.log("App is running on port " + PORT);
});


// serve the homepage
app.get('/cool', (req, res) => {
  res.send(cool());
});
