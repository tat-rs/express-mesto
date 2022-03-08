const jwt = require('jsonwebtoken');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new ForbiddenError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
