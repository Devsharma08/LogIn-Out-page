
const { isTokenValid } = require('./jwt');
const {UnauthenticatedError} = require('../error');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies?.accesstoken;
  if (!token) next(new UnauthenticatedError('Authentication failed'))
  try {
    const payload = isTokenValid(token);
    req.user = payload;
    next();
  } catch (err) {
     next(new UnauthenticatedError('Invalid token'));
  }
};

module.exports = authenticateUser;