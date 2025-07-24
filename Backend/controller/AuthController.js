const User = require('../model/UserModel');
const { BadRequest, UnauthenticatedError } = require('../error');
const attachCookiesToResponse = require('../utils/attachCookies');
const { createJWT } = require('../utils/jwt');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail'); 

// @desc    Register user
const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new BadRequest('All fields are required'));
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new BadRequest('Email already exists'));
  }

  const user = await User.create({ name, email, password });

  const tokenUser = { name: user.name, userId: user._id };
  console.log('Token User:', tokenUser);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(201).json({
    success: true,
    user: tokenUser,
    message: 'User registered successfully',
  });
};

// @desc    Login user
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequest('Please provide email and password'));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new UnauthenticatedError('Invalid credentials'));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new UnauthenticatedError('Invalid credentials'));
  }

  const tokenUser = { name: user.name, userId: user._id };
  console.log('Token User:', tokenUser);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(200).json({
    success: true,
    user: tokenUser,
    message: 'Login successful',
  });
};

// @desc    Logout user
const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ success: true, message: 'Logout successful' });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: 'Please provide email' });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: 'User not found' });

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

 const resetURL = `http://localhost:4200/reset-password/${resetToken}`;


  const message = `<p>Forgot your password? Click to reset: <a href="${resetURL}">Reset</a></p>`;

  try {
    await sendEmail({
      to: user.email,
      subject: 'Password Reset',
      html: message,
    });

    res.status(200).json({ msg: 'Reset token sent to email' });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500).json({ msg: 'Email could not be sent' });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ msg: 'Token invalid or expired' });

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({ msg: 'Password reset successful' });
};



module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword
};
