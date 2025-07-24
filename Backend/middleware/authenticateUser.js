const { isTokenValid } = require('../utils/jwt');
const { UnauthenticatedError } = require('../error');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError('Authentication invalid: No token');
  }

  try {
    const payload = isTokenValid(token);
    req.user = {
      userId: payload.userId,
      name: payload.name,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid: Bad token');
  }
};

module.exports = authenticateUser;
