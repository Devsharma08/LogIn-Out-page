const User = require('../model/UserModel');
const { BadRequest, UnauthenticatedError } = require('../error');
const crypto = require('crypto');
const {
  attachCookiesToResponse,
  authenticateUser,
  createJWT,
  isTokenValid,
  sendEmail,
  sendOTP,
  generateOTP } = require('../utils')

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
  const html = `<p>Forgot password? Click <a href="${resetURL}">here</a> to reset. Valid for 10 minutes.</p>`;

  try {
    await sendEmail({ to: email, subject: 'Password Reset', html });
    res.status(200).json({ msg: 'Reset link sent to your email' });
  } catch (error) {
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


const sendOTPToEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email not registered" });
  }

  const generatedOtp = generateOTP(); // e.g., Math.floor(100000 + Math.random() * 900000).toString()

user.otp = generatedOtp;
user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 mins
await user.save();

console.log('Sent OTP:', generatedOtp)
console.log('OTP expire: ', user.otpExpiry)


  const message = `<p>OTP is <b> ${generatedOtp} </b> and will be expired in <b> ${user.otpExpiry} </b></p>`;

  try {
    await sendEmail({
      to: user.email,
      subject: 'OTP verification',
      html: message,
    });

    res.status(200).json({ msg: 'OTP sent to your email' });
  } catch (err) {
   user.otpExpiry = undefined;
    user.otp = undefined;
    await user.save();
    res.status(500).json({ msg: 'Email could not be sent' });
  }
};




const verifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new BadRequest('User not found'));
  }

  if (user.otp !== otp || user.otpExpiry < Date.now()) {
    return next(new BadRequest('Invalid or expired OTP'));
  }

  // OTP is valid
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  const tokenUser = { name: user.name, userId: user._id };
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(200).json({
    success: true,
    user: tokenUser,
    message: 'OTP verified, logged in successfully',
  });
};

const getAllData = async(req,res) =>{
  console.log(req.userId);
}



module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  sendOTPToEmail,
  verifyOTP,
  getAllData
};
