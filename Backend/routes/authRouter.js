const express = require('express');
const router = express.Router();
const { register, login, logout ,forgotPassword,resetPassword,verifyOTP, sendOTPToEmail, getAllData} = require('../controller/AuthController');
const authenticateUser = require('../utils/authenticateUser')

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/verify', authenticateUser, (req, res) => {
  res.status(200).json({ msg: 'User verified', user: req.user });
});
router.post('/send-otp', sendOTPToEmail);
router.post('/verify-otp', verifyOTP);


module.exports = router;
