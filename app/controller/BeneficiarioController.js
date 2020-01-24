const mysqlConexion = require('../model/db');
//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};
//Regresa beneficiario
exports.beneficiario = function (req, res) {
    var curp = req.params.curp;
    mysqlConexion.query('SELECT * FROM beneficiary where CURP =?' ,[curp], function(err,result,fields){
        mysqlConexion.on('error', function(err){
            console.log('[MySQL ERROR]', err);
        });
    
        
        if(result && result.length){
            console.log("Resultado " + result[0].email);
                res.end(JSON.stringify(result[0])) // if password is true return all info of user.
        }
       
    else{
      
       res.json('User not exist');
        
    }    
});
 
};

exports.create =   async function (req, res) {
    var post_data = req.body;

    var CURP = post_data.curp;
    var nombre = post_data.nombre;
    var apellido_paterno = post_data.apellido_paterno;
    var apellido_materno = post_data.apellido_materno;
    var sexo = post_data.sexo;
    var calle = post_data.calle;
    var numero_int = post_data.numero_int;
    var numero_ext = post_data.numero_ext;
    var cp = post_data.cp;
    var colonia = post_data.colonia;
    var municipio = post_data.municipio;
    var estado = post_data.estado;
    var telefono = post_data.telefono;
    var celular = post_data.celular;

    
   
    mysqlConexion.query('SELECT * FROM beneficiary where CURP =?' ,[CURP], function(err,result,fields){
        mysqlConexion.on('error', function(err){
            console.log('[MySQL ERROR]', err);
        });
    
        
        if(result && result.length)
        res.json('Beneficiario alredy exists!!!')
    else{
        const id = req.session.user_id ;
        console.log('RECUPEAR SESSION ID = ', id);
       // const sql = "INSERT INTO beneficiary(CURP,nombre,apellido_paterno,apellido_materno,sexo,calle,numero_ext,numero_int,codigo,colonia,municipio,estado,telefono,celular, user_id) VALUES ('CODA920508MJCNZL00','Diana','Prince','De Themyscira','MUJER','AGUA FRIA','8',NULL,45180,'AGUA FRIA','ZAPOPAN','JALISCO',NULL,'3312121200', 1)";
       // mysqlConexion.query( sql, function(err,result,fields){
   
        mysqlConexion.query('INSERT INTO beneficiary(CURP,nombre,apellido_paterno,apellido_materno,sexo,calle,numero_ext,numero_int,codigo,colonia,municipio,estado,telefono,celular, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [CURP,nombre,apellido_paterno,apellido_materno,sexo,calle,numero_int,numero_ext,cp,colonia,municipio,estado,telefono,celular,id], function(err,result,fields){
            mysqlConexion.on('error', function(err){
                console.log('[MySQL ERROR]', err);
                res.json('register error: ', err)
            });
            res.json('Register success');
        })
       
    }    
});

};

//Regresa lista de beneficiarios
exports.lista = function (req, res) {
    //select * from beneficiario where CURP LIKE '%nAVARRo%' OR nombre LIKE '%Navarro%' OR apellido_paterno LIKE '%Navarro%' OR apellido_materno LIKE '%navarro%';

    var filtro = req.params.filtro;
        mysqlConexion.query("SELECT * FROM beneficiary where CURP LIKE CONCAT('%', ?,  '%') OR nombre LIKE CONCAT('%', ?,  '%') OR apellido_paterno LIKE CONCAT('%', ?,  '%') OR apellido_materno LIKE CONCAT('%', ?,  '%')  " ,[filtro, filtro, filtro, filtro], function(err,result,fields){
    
        mysqlConexion.on('error', function(err){
            console.log('[MySQL ERROR]', err);
        });
    
        
        if(result && result.length){
            console.log("Resultado " + result[0].email);
            
            
           
           
           
           
                res.end(JSON.stringify(result)) 
           
                 
        }
       
    else{
      
       res.json('User not exist');
        
    }    
});
 
};