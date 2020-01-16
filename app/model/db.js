//'user strict';
//const pool = require('generic-pool');
var mysql = require('mysql');


/*

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
 
  });


  connection.connect(function(err) {
    console.log("error conexion base de datos :  " + err);
    if (err) throw err;
});
*/

var db_config = {
  host     : 'localhost',
   user     : 'root',
   password : 'Fedora12',
   database : 'asistencia'
};

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.
  connection.connect(function(err) {              // The server is either down
  if(err) {                                     // or restarting (takes a while sometimes).
          console.log('error when connecting to db:', err);
          setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
          }                                     // to avoid a hot loop, and to allow our node script to
   });                                     // process asynchronous requests in the meantime.
                                           // If you're also serving http, display a 503 error.  
                                           
 connection.on('error',function(err){
   console.log('db error', err);
   if(err.code === 'PROTOCOL_CONNECTION_LOST'){
    handleDisconnect();   
   }
   else{
    throw err;     
   }
 }

 );                                          
}

handleDisconnect();

module.exports = connection;