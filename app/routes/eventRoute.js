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
router.get('/beneficiarios/:evento',authorize(), event_controller.beneficiarios);  //Regrasa lista de eventos de un beneficiario.

module.exports = router;