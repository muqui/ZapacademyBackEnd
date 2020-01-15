var crypto = require('crypto');
var uuid = require('uuid');
// Client controller
const Client = require('../model/appModel');
const mysqlConexion = require('../model/db');
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.login =   async function (req, res) {
    var post_data = req.body;
    //extract email and password from request
    var user_password = post_data.password;
    var email = post_data.email;

    mysqlConexion.query('SELECT * FROM user where email =?' ,[email], function(err,result,fields){
        mysqlConexion.on('error', function(err){
            console.log('[MySQL ERROR]', err);
        });
    
        console.log("Correo:  " + result[0].email);
        if(result && result.length){
            console.log("Resultado " + result[0].email);
            
            var salt = result[0].salt; 
            var encrypted_password = result[0].encryted_password; 
            var hashed_password = checkHashPassword(user_password,salt).passwordHash;
            console.log("Password " + encrypted_password); //encryted_password
            console.log("Hash " + hashed_password);
            if (encrypted_password == hashed_password)
                res.end(JSON.stringify(result[0])) // if password is true return all info of user.
            else
                res.end(JSON.stringify('Wrong password '));    
        }
       
    else{
      
       res.json('User not exist');
        
    }    
});

};

exports.register =   async function (req, res) {
    var post_data = req.body; // get post params
    console.log('uid : ' + uuid.v4());
    var uid = uuid.v4(); // get UUID v4 like '110ssfsfdsf-af0x-90333-casasksfnfdfn'
    var plaint_password = post_data.password // get password from post params
    var hast_data = saltHashPassword(plaint_password);
    var password =  hast_data.passwordHash; // get hash value
    var salt = hast_data.salt; //get salt

    var name = post_data.name;
    var email = post_data.email;
   
    mysqlConexion.query('SELECT * FROM user where email =?' ,[email], function(err,result,fields){
        mysqlConexion.on('error', function(err){
            console.log('[MySQL ERROR]', err);
        });
    
        
        if(result && result.length)
        res.json('User alredy exists!!!')
    else{
      
        mysqlConexion.query('INSERT INTO user(unique_id,name,email,encryted_password,salt,created_at,update_at) VALUES (?,?,?,?,?,NOW(),NOW())', [uid,name,email,password,salt], function(err,result,fields){
            mysqlConexion.on('error', function(err){
                console.log('[MySQL ERROR]', err);
                res.json('register error: ', err)
            });
            res.json('Register success');
        })
       
    }    
});

};

function checkHashPassword(user_password, salt){
    var passwordData = sha512(user_password,salt);
    return passwordData;
}
//password ULTIL
var genRamdomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex') // covert to hexa format
    .slice(0,length); //return required number of characters
};
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512',salt); //use SHA512
    hash.update(password);
    var value = hash.digest('hex');
    return{
        salt : salt,
        passwordHash: value
    };
};
function saltHashPassword(userPassword){
    var salt = genRamdomString(16);
    var passwordData = sha512(userPassword, salt);
    return passwordData;
}