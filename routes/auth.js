const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth')
const { 
  validateRegistration, 
  validateLogin,  
  handleValidationErrors // Make sure to import this
} = require('../middleware/validation');

// Add handleValidationErrors after the validation chains
router.post('/register', validateRegistration, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);
router.get('/profile', protect, getProfile);

module.exports = router;