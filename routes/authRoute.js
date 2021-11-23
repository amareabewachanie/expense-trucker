const express = require('express');
const router = express.Router();

/**
 * Import controller that handles the actual work
 */

const authController = require('../controllers/authController');
/**
 * Defining our routes
 */

router.route('/login').post(authController.login);
router.route('/register').post(authController.register);
module.exports = router;
