//'user strict';

var mysql = require('mysql');


//Conexion a Mysql

const connection = mysql.createConnection({
   
  host     : 'bied0ycmppx0keqba99d-mysql.services.clever-cloud.com',
    user     : 'ueqm39ayixoqyrc6',
    password : 'oCmq7FZk6EkuWbOMW3Ik',
    database : 'bied0ycmppx0keqba99d'
   /*
   host     : 'localhost',
   user     : 'root',
   password : 'Fedora12',
   database : 'asistencia'
 */
  });


  connection.connect(function(err) {
    console.log("error conexion base de datos :  " + err);
    if (err) throw err;
});

module.exports = connection;