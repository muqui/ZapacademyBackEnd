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
router.post('/', beneficiario_controller.create);
// Regresa 1 beneficiario
router.get('/:curp', beneficiario_controller.beneficiario);
//Regresa lista de beneficiarios 
router.get('/lista/:filtro', beneficiario_controller.lista);


module.exports = router;