const attachCookiesToResponse = require('./attachCookies');
const authenticateUser = require('./authenticateUser');
const {createJWT,isTokenValid} = require('./jwt');
const sendEmail = require('./sendEmail');
const {sendOTP,generateOTP} = require('./send&GenOTP')




module.exports = {
  attachCookiesToResponse,
  authenticateUser,
  createJWT,
  isTokenValid,
  sendEmail,
  sendOTP,
  generateOTP };
