const { ERROR_CODE_CONFLICT } = require('../utils/utils');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_CONFLICT;
    this.message = message;
  }
}

module.exports = ConflictError;
