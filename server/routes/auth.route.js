const express = require('express');
const { register_post } = require('../controllers/authController');
const { userRegValidation } = require('../models/user');

// Initialize router
const router = express.Router();

/**
 * Auth Routes
 */
router.post('/register',userRegValidation, register_post);


module.exports = router;