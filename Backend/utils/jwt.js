const jwt = require('jsonwebtoken');

const createJWT = (payload) => {
  if (!payload) throw new Error("JWT payload is missing!");
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};


const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  createJWT,
  isTokenValid,
};
