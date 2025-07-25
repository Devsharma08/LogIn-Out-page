const jwt = require('jsonwebtoken'); // ✅ You missed this line

const attachCookiesToResponse = ({ res, user }) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.cookie('accesstoken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });
};

module.exports = attachCookiesToResponse;

