const BadRequestError = require('./BadRequestError');
const ConflictError = require('./ConflictError');
const ForbiddenError = require('./ForbiddenError');
const NotFoundError = require('./NotFoundError');
const UnauthorizatedError = require('./UnauthorizatedError');

module.exports = {
  BadRequestError,
  ForbiddenError,
  ConflictError,
  NotFoundError,
  UnauthorizatedError,
};
