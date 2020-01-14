const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Fedora12$',
  database : 'asistencia'
});

connection.connect();

var uid = "uid"; // get UUID v4 like '110ssfsfdsf-af0x-90333-casasksfnfdfn'

var name = "albert";
var password =  "hast_data.passwordHash" // get hash value
var salt = "hast_data.salt"; //get salt
var email = "muqui@hotmail.com";

/*
var sql = "INSERT INTO user (unique_id,name,email,encryted_password,salt,created_at,update_at) VALUES ('test_user', 'A','test_user', 'A','test_user', NOW(), NOW())";
connection.query(sql, function (err, result) {
     if (err) throw err;
     console.log("1 record inserted");
   
});
connection.end();
*/

connection.query('INSERT INTO user(unique_id,name,email,encryted_password,salt,created_at,update_at) VALUES (?,?,?,?,?,NOW(),NOW())', [uid,name,email,password,salt], function(err,result,fields){
  connection.on('error', function(err){
      console.log('[MySQL ERROR]', err);
     // res.json('register error: ', err)
  });
  //res.json('Register success');
})
connection.end();