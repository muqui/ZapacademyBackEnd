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


module.exports = router;