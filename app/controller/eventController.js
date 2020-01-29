// Conexion a mysql
const mysqlConexion = require('../model/db');


//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.create =   async function (req, res) {
    var post_data = req.body;

    var fecha_inicio = post_data.fecha_inicio;
    var fecha_fin =  post_data.fecha_fin;
    var nombre = post_data.nombre; 
        const id = req.session.user_id ;
        console.log('RECUPEAR SESSION ID = ', id);
        mysqlConexion.query('INSERT INTO event(fechaInicio, fechafin, nombre, user_id) VALUES (?,?,?,?)', [fecha_inicio,fecha_fin, nombre, id], function(err,result,fields){
            mysqlConexion.on('error', function(err){
                console.log('[MySQL ERROR]', err);
                res.json('register error: ', err)
            });
            res.json('Register success');
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