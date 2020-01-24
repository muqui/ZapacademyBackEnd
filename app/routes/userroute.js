// routes user
const express = require('express');
const router = express.Router();
const authorize = require('../_helpers/authorize')
// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controller/userController');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', user_controller.test);
//login route


module.exports = router;