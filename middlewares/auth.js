const jwt = require('jsonwebtoken');
const { ERROR_UNAUTHORIZATED } = require('../utils/utils');

const handleAuthError = (res) => {
  res.status(ERROR_UNAUTHORIZATED).send({ message: 'Необходима авторизация' });
};

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};
