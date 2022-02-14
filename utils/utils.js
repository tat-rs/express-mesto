const ERROR_CODE_NOCORRECT = 400;
const ERROR_CODE_UNDEFINED = 404;
const ERROR_CODE_DEFAULT = 500;
const SUCCESS_CODE_OK = 200;
const SUCCESS_CODE_CREATED = 201;

const handleError = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(ERROR_CODE_NOCORRECT).send({ message: 'Переданы некорректные данные' });
  } else {
    res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка на стороне сервера' });
  }
};

module.exports = {
  ERROR_CODE_NOCORRECT,
  ERROR_CODE_UNDEFINED,
  ERROR_CODE_DEFAULT,
  SUCCESS_CODE_OK,
  SUCCESS_CODE_CREATED,
  handleError,
};
