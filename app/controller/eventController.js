// Conexion a mysql
const mysqlConexion = require('../model/db');
const fileUpload = require('express-fileupload');


//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};



exports.create =   async function (req, res) {
    //await sleep(1000);
    var post_data = req.body;
    var idx ;
    var fecha_inicio = post_data.fecha_inicio;
    var fecha_fin =  post_data.fecha_fin;
    var nombre = post_data.nombre; 
    var id = post_data.id;
       // const id = req.session.user_id ;
        console.log('RECUPEAR SESSION ID = ', id);
        await mysqlConexion.query('INSERT INTO event(fechaInicio, fechafin, nombre, user_id) VALUES (?,?,?,?)', [fecha_inicio,fecha_fin, nombre, id], function(err,resultG,fields){
            mysqlConexion.on('error', function(err){
                console.log('[MySQL ERROR]', err);
                res.json('register error: ', err)
            });
            //console.log("Employee Id:- " + result.insertId);
            
            
               /*
                
                    mysqlConexion.query('select id from beneficiary', function(err,resultB,fields){
                    mysqlConexion.on('error', function(err){
                        console.log('[MySQL ERROR]', err);
                        res.json('register error: ', err)
                    });
                    for(var attributename in resultB){
                        const idx =  resultG.insertId;
                       console.log(attributename+": "+ resultB[attributename].id + " Id  "+ fields[0].identity);
                         mysqlConexion.query('INSERT INTO beneficiaryEvent(beneficiary_id, event_id) VALUES (?,?)', [resultB[attributename].id ,idx], function(err,result,fields){
                            mysqlConexion.on('error', function(err){
                                console.log('[MySQL ERROR]', err);
                                res.json('register error: ', err)
                            });
                          
                        })
                     
                    
                    }
                  
                })

            */
            mysqlConexion.query('select id from beneficiary', function(err,resultB,fields){
            mysqlConexion.on('error', function(err){
                console.log('[MySQL ERROR]', err);
                res.json('register error: ', err)
            });
            for(var attributename in resultB){
               
               console.log(attributename+": "+ resultB[attributename].id + " Id  "+ idx);
                 mysqlConexion.query('INSERT INTO beneficiaryEvent(beneficiary_id, event_id) VALUES (?,?)', [resultB[attributename].id ,idx], function(err,result,fields){
                    mysqlConexion.on('error', function(err){
                        console.log('[MySQL ERROR]', err);
                        res.json('register error: ', err)
                    });
                  
                })
             
            
            }
          
        })
           idx =  resultG.insertId;
            res.json(resultG.insertId)
      
        })
  
        
};

exports.beneficiario =   async function (req, res) {
    var post_data = req.body;

    var beneficiary_id = post_data.beneficiary_id;
    var event_id =  post_data.event_id;
    var nombre = post_data.nombre; 
        const id = req.session.user_id ;
        console.log('RECUPEAR SESSION ID = ', id);
        mysqlConexion.query('INSERT INTO beneficiaryEvent(beneficiary_id, event_id) VALUES (?,?)', [beneficiary_id,event_id], function(err,result,fields){
            mysqlConexion.on('error', function(err){
                console.log('[MySQL ERROR]', err);
                res.json('register error: ', err)
            });
            res.json('Register success');
        })
};

exports.notificacion =   async function (req, res) {  //registra cunado se hace una notificacion al beneficiario.
    var post_data = req.body;

    var fecha = post_data.fecha;
    var event_id =  post_data.event_id;
    var user_id = post_data.user_id;
    var beneficiary_id = post_data.beneficiary_id; 
        const id = req.session.user_id ;
        console.log('RECUPEAR SESSION ID = ', id);
        mysqlConexion.query('INSERT INTO notice(fecha, event_id, user_id, beneficiary_id) VALUES (?,?,?,?)', [fecha,event_id,user_id, beneficiary_id, ], function(err,result,fields){
            mysqlConexion.on('error', function(err){
                console.log('[MySQL ERROR]', err);
                res.json('register error: ', err)
            });
            res.json('Register success');
        })
};
exports.asistencia =   async function (req, res) {  //registra asistencia del beneficiario al evento.
    var post_data = req.body;
    var status = post_data.status;
    var fecha = post_data.fecha;
    var event_id =  post_data.event_id;
    var user_id = post_data.user_id;
    var beneficiary_id = post_data.beneficiary_id; 
    var imagen = post_data.imagen;
    //Comprueba asistencia
    mysqlConexion.query('select * from attendance where event_id = ? and beneficiary_id = ?' ,[event_id,beneficiary_id], function(err,result,fields){
        mysqlConexion.on('error', function(err){
            console.log('[MySQL ERROR]', err);
        });
    
        
        if(result && result.length)
        res.json('exists')
    else{
         
        mysqlConexion.query('INSERT INTO attendance(status, fecha, event_id, user_id, beneficiary_id, imagen) VALUES (?,?,?,?,?,?)', [status, fecha,event_id,user_id, beneficiary_id, imagen], function(err,result,fields){
            mysqlConexion.on('error', function(err){
                console.log('[MySQL ERROR]', err);
                res.json('register error: ', err)
            });
            res.json('Register success');
        })
      
   
       
    }    
});
   



    
};
exports.eventos =   async function (req, res) {  // regresa lista con los beneficiarios de un evento.
    var evento = req.params.evento;
       // const id = req.session.user_id ;
       // console.log('RECUPEAR SESSION ID = ', id);
        mysqlConexion.query('select b.* from beneficiary as b JOIN beneficiaryEvent as be ON b.id = be.beneficiary_id  JOIN event as e ON e.id = be.event_id where e.id = ?', [evento ], function(err,result,fields){
            mysqlConexion.on('error', function(err){
                console.log('[MySQL ERROR]', err);
                res.json('register error: ', err)
            });
          //  res.end(JSON(result)) ;
           res.end(JSON.stringify(result)) ;
        })
};
exports.beneficiarios =   async function (req, res) {  // regresa lista  de eventos de un beneficiario.
    var evento = req.params.evento;
       // const id = req.session.user_id ;
       // console.log('RECUPEAR SESSION ID = ', id);
        mysqlConexion.query('select e.id, e.nombre as nombreEvento, b.id as id_beneficiario from event as e JOIN beneficiaryEvent as be ON e.id = be.event_id  JOIN beneficiary as b ON b.id = be.beneficiary_id where b.id = ?', [evento ], function(err,result,fields){
            mysqlConexion.on('error', function(err){
                console.log('[MySQL ERROR]', err);
                res.json('register error: ', err)
            });
          //  res.end(JSON(result)) ;
           res.end(JSON.stringify(result)) ;
        })
};

exports.listaEventos =   async function (req, res) {  // regresa una lista con los eventos vigentes
    var evento = req.params.evento;
       // const id = req.session.user_id ;
       // console.log('RECUPEAR SESSION ID = ', id);
        mysqlConexion.query('select * from event where fechaInicio > now()', [evento ], function(err,result,fields){
            mysqlConexion.on('error', function(err){
                console.log('[MySQL ERROR]', err);
                res.json('register error: ', err)
            });
          //  res.end(JSON(result)) ;
           res.end(JSON.stringify(result)) ;
        })
};


exports.validarAsistencia =   async function (req, res) {  //registra asistencia del beneficiario al evento.
    var post_data = req.body;
    var event_id =  post_data.event_id;
    var beneficiary_id = post_data.beneficiary_id; 
    
    //Comprueba asistencia
    mysqlConexion.query('select * from attendance where event_id = ? and beneficiary_id = ?' ,[event_id,beneficiary_id], function(err,result,fields){
        mysqlConexion.on('error', function(err){
            console.log('[MySQL ERROR]', err);
        });       
        if(result && result.length)
        res.json('exists') 
        else
        res.json('no_exists')

});    
};


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  exports.evidencia = function (req, res) {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let avatar = req.files.avatar;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
           // avatar.mv('./uploads/' + avatar.name);
           avatar.mv('./public/data/' + avatar.name);
            //send response
            //res.send('success');
            console.log('nOMBRE E= ', avatar.name);
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
};