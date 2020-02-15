// routes client
const express = require('express');
const router = express.Router();
//const authorize = require('./_helpers/authorize');
const authorize = require('../_helpers/authorize');
// Require the controllers WHICH WE DID NOT CREATE YET!!
const beneficiario_controller = require('../controller/BeneficiarioController');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', beneficiario_controller.test);
// Crea beneficiario
router.post('/',authorize(), beneficiario_controller.create);
// Regresa 1 beneficiario
router.get('/:curp',authorize(), beneficiario_controller.beneficiario);
//Regresa lista de beneficiarios a partir de la curp (LIKE)
router.get('/list/:curp',authorize(), beneficiario_controller.beneficiarios);
//Regresa  1 benificiario si esta en la lista de evento a firmar asisitencia.
router.get('/:curp/:evento', authorize(), beneficiario_controller.beneficiarioCurpEvento);
//Regresa lista de beneficiarios si esta en la lista del evento a firmar asistencia
router.get('/lista/:filtro/:evento', authorize(), beneficiario_controller.beneficiarioCurpEventoLista);
router.get('/listadatos/:nombre/:primerapellido/:segundoapellido/:evento', authorize(), beneficiario_controller.beneficiarioDatosEventoLista);



module.exports = router;