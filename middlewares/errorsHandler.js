const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errMessage = err.message || 'Произошла ошибка на стороне сервера';

  res.status(statusCode).send({ message: errMessage, err });

  next();
};

module.exports = errorHandler;
