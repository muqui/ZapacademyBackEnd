// routes user
const express = require('express');
const router = express.Router();
const authorize = require('../_helpers/authorize')
// Require the controllers WHICH WE DID NOT CREATE YET!!
const client_controller = require('../controller/appController');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', client_controller.test);
//login route
router.post('/login', client_controller.login);
//register route
router.post('/register', client_controller.register);
//
router.get('/beneficiarios/:curp', client_controller.beneficiarios);




module.exports = router;