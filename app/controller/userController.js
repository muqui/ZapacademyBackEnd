const mysqlConexion = require('../model/db');
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the User controller!');
};
//Regresa la lista de los usuarios userslist
exports.userslist = function (req, res) {
   
        mysqlConexion.query('select * from user', function(err,result,fields){
            mysqlConexion.on('error', function(err){
                console.log('[MySQL ERROR]', err);
                res.json('register error: ', err)
            });
        
           res.end(JSON.stringify(result)) ;
        })
};

//Regresa un usuario mediante su ID
exports.user = function (req, res) {
    var id = req.params.id;
       
        mysqlConexion.query('select * from user where id = ? ',[id], function(err,result,fields){
            mysqlConexion.on('error', function(err){
                console.log('[MySQL ERROR]', err);
                res.json('register error: ', err)
            });
          if(result)
           res.end(JSON.stringify(result[0])) ;
           else
           res.end(JSON.stringify([])) ;

        })
};

