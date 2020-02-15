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
      
       res.json({});
        
    }    
});
 
};

//Regresa lista de beneficiarios 
exports.todosbeneficiarios = function (req, res) {
    
    mysqlConexion.query("SELECT * FROM beneficiary " , function(err,result,fields){
        mysqlConexion.on('error', function(err){
            console.log('[MySQL ERROR]', err);
        });
    
        
        if(result && result.length){
          
                res.end(JSON.stringify(result)) 
        }
       
    else{
      
       res.json([]);
        
    }    
});
 
};

//Regresa lista de beneficiarios a partir de su curp los beneficiarios
exports.beneficiarios = function (req, res) {
    var curp = req.params.curp;
    mysqlConexion.query("SELECT * FROM beneficiary where CURP  LIKE CONCAT('%', ?,  '%')" ,[curp], function(err,result,fields){
        mysqlConexion.on('error', function(err){
            console.log('[MySQL ERROR]', err);
        });
    
        
        if(result && result.length){
            console.log("Resultado " + result);
                res.end(JSON.stringify(result)) // if password is true return all info of user.
        }
       
    else{
      
       res.json('User not exist sss');
        
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
    var codigo = post_data.cp;
    var colonia = post_data.colonia;
    var municipio = post_data.municipio;
    var estado = post_data.estado;
    var telefono = post_data.telefono;
    var celular = post_data.celular;

    console.log("Curp =" + req.body.curp);
   
    mysqlConexion.query('SELECT * FROM beneficiary where CURP =?' ,[CURP], function(err,result,fields){
        mysqlConexion.on('error', function(err){
            console.log('[MySQL ERROR]', err);
        });
    
        
        if(result && result.length)
        res.json('Beneficiario alredy exists!!!')
    else{
        const id = req.session.user_id ;
        console.log('RECUPEAR SESSION ID = ', id);
       //      const sql = "INSERT INTO beneficiary(CURP,nombre,apellido_paterno,apellido_materno,sexo,calle,numero_ext,numero_int,codigo,colonia,municipio,estado,telefono,celular, user_id) VALUES ('CONA','nombre','Prince','De Themyscira','MUJER','AGUA FRIA','8',NULL,45180,'AGUA FRIA','ZAPOPAN','JALISCO',NULL,'3312121200', ?)";
     //mysqlConexion.query( sql, [id],function(err,result,fields){
     mysqlConexion.query('INSERT INTO beneficiary(CURP,nombre,apellido_paterno,apellido_materno,sexo,calle,numero_ext,numero_int,codigo,colonia,municipio,estado,telefono,celular, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
                                                 [CURP,nombre,apellido_paterno,apellido_materno,sexo,calle,numero_ext,numero_int,codigo,colonia,municipio,estado,telefono,celular,id], function(err,result,fields){
        mysqlConexion.on('error', function(err){
                console.log('[MySQL ERROR]', err);
                res.json('register error: ', err)
            });
            res.json('Register success');
        })
       
    }    
});

};



/*
Regresa beneficiario si esta en la lista del eventa para registrar asistencia
Campos recibidos : curp del beneficiario, id del evento
*/

exports.beneficiarioCurpEvento = function (req, res) {
    var curp = req.params.curp;  //recibe la CURP del Beneficiario
    var evento = req.params.evento;  // recibe el id de evento
    
    console.log('curp =',curp);
    console.log('evento= ',evento);
    mysqlConexion.query('select b.* from beneficiary as b JOIN beneficiaryEvent as be ON b.id = be.beneficiary_id  JOIN event as e ON e.id = be.event_id where e.id = ? and b.CURP = ?', [evento, curp ], function(err,result,fields){
        mysqlConexion.on('error', function(err){
            console.log('[MySQL ERROR]', err);
            res.json('register error: ', err)
        });
      
      // res.end(JSON.stringify(result)) ;
      if(result && result.length)
      res.end(JSON.stringify(result[0])) 
      else
      res.json({ });
    })

 
};


/*
Regresa Lista beneficiario si esta en la lista del eventa para registrar asistencia
Campos recibidos : curp del beneficiario, id del evento
La busqueda se realiza con la curp del beneficiario.
*/

exports.beneficiarioCurpEventoLista = function (req, res) {
    var curp = req.params.filtro;  //recibe la CURP del Beneficiario
    var evento = req.params.evento;  // recibe el id de evento
    
    console.log('curp =',curp);
    console.log('evento= ',evento);
    mysqlConexion.query("select b.* from beneficiary as b JOIN beneficiaryEvent as be ON b.id = be.beneficiary_id  JOIN event as e ON e.id = be.event_id where e.id = ? and b.CURP LIKE CONCAT('%', ?,  '%')", [evento, curp ], function(err,result,fields){
        mysqlConexion.on('error', function(err){
            console.log('[MySQL ERROR]', err);
            res.json('register error: ', err)
        });
      
        res.end(JSON.stringify(result)) 
    })

 
};

//select b.* from beneficiary as b JOIN beneficiaryEvent as be ON b.id = be.beneficiary_id  JOIN event as e ON e.id = be.event_id where e.id = 1 or b.nombre like '%Diana%' or b.apellido_paterno like '%Prince%' or b.apellido_materno like '%Corona%';
/*
Regresa Lista de  beneficiario si esta en la lista del eventa para registrar asistencia
Campos recibidos : id del evento, nombre, primer apellido, segundo apellido.
La busqueda se realiza con la curp del beneficiario.
*/

exports.beneficiarioDatosEventoLista = function (req, res) {
    var nombre = req.params.nombre;  //recibe nombre del Beneficiario
    var primerApellido = req.params.primerapellido;  //recibe nombre del Beneficiario
    var segundoApellido = req.params.segundoapellido;  //recibe nombre del Beneficiario
    var evento = req.params.evento;  // recibe el id de evento
    
    
    mysqlConexion.query("select b.* from beneficiary as b JOIN beneficiaryEvent as be ON b.id = be.beneficiary_id  JOIN event as e ON e.id = be.event_id where e.id = ? and b.nombre like CONCAT('%', ?,  '%') and b.apellido_paterno like CONCAT('%', ?,  '%') and b.apellido_materno like CONCAT('%', ?,  '%')", [evento, nombre, primerApellido, segundoApellido ], function(err,result,fields){
        mysqlConexion.on('error', function(err){
            console.log('[MySQL ERROR]', err);
            res.json('register error: ', err)
        });
      
        res.end(JSON.stringify(result)) 
    })

 
};