// routes events
const express = require('express');
const router = express.Router();
//const authorize = require('./_helpers/authorize');
const authorize = require('../_helpers/authorize');
// Require the controllers WHICH WE DID NOT CREATE YET!!
const event_controller = require('../controller/eventController');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', event_controller.test);
// Crea Un  evento
router.post('/',authorize(), event_controller.create);  // Crea un evento
router.post('/beneficiario',authorize(), event_controller.beneficiario);  //Asigna beneficiarios a un evento  Relacion muchos a muchos
router.post('/notificacion',authorize(), event_controller.notificacion);  //Asigna beneficiarios a un evento  Relacion muchos a muchos
router.post('/asistencia',authorize(), event_controller.asistencia);  //Asigna beneficiarios a un evento  Relacion muchos a muchos
router.get('/eventos/:evento',authorize(), event_controller.eventos);  //Regrasa lista con los beneficiarios de un evento
router.get('/eventos/',authorize(), event_controller.listaEventos);  //Regresa uns lista con todos los eventos vigentes.
router.get('/beneficiarios/:curp',authorize(), event_controller.beneficiarios);  //Regrasa lista de eventos de un beneficiario.
router.post('/asistencia/verificar',authorize(), event_controller.validarAsistencia);  //Valida asistencia del beneficiario.
router.post('/asistencia/evidencia',authorize(), event_controller.evidencia);  //Sube evidencia al server.

module.exports = router;