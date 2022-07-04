const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../utils/config');
const { AuthError } = require('../Errors/AuthError');
const { errMsg } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(errMsg.authorizationErrMsg);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    throw new AuthError(errMsg.unauthorizedErrMsg);
  }
  req.user = payload;
  next();
};
