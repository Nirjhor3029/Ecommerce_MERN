const express = require('express');
const { register_post, login_post, getUser_get } = require('../controllers/authController');
const { authCheck_middleware } = require('../middleware/authMiddleware');
const { userRegValidation, userLoginValidation } = require('../models/user');

// Initialize router
const router = express.Router();

/**
 * Auth Routes
 */
router.get('/',authCheck_middleware, getUser_get);

router.post('/register',userRegValidation, register_post);
router.post('/login',userLoginValidation, login_post);


module.exports = router;