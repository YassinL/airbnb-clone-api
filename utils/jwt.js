const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'ndinadiandoiappdad826doiajdiad75kdaj5478ksk';

exports.generateTokens = (userData) => {
  return jwt.sign(
    {
      email: userData.email,
      password: userData.password,
    },
    JWT_SIGN_SECRET,
    {
      expiresIn: '1h',
    }
  );
};
