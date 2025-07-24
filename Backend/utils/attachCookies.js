const { createJWT } = require('./jwt');

const attachCookiesToResponse = ({ res, user }) => {
  if (!user) throw new Error('User payload missing in attachCookiesToResponse');
  
  const token = createJWT(user);
  const oneDay = 1000 * 60 * 60 * 24;

   res.cookie('accesstoken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneDay),
    sameSite: 'Lax',
  });
};

module.exports = attachCookiesToResponse;
