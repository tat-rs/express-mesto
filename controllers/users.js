const User = require('../models/user');

const ERROR_CODE_NOCORRECT = 400;
const ERROR_CODE_UNDEFINED = 404;
const ERROR_CODE_DEFAULT = 500;
const SUCCESS_CODE_OK = 200;
const SUCCESS_CODE_CREATED = 201;

const optionsOfData = {
  new: true,
  runValidators: true,
};

const handleError = (err, res) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(ERROR_CODE_NOCORRECT).send({ message: 'Переданы некорректные данные' });
  } else {
    res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка на стороне сервера' });
  }
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(SUCCESS_CODE_OK).send({ data: users }))
    .catch(() => res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка на стороне сервера' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(SUCCESS_CODE_OK).send({ data: user });
      } else {
        res.status(ERROR_CODE_UNDEFINED).send({ message: 'Пользователь с таким id не найден' });
      }
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(SUCCESS_CODE_CREATED).send({ data: user }))
    .catch((err) => {
      handleError(err, res);
    });
};

const uptadeUserProfile = (req, res) => {
  const { name, about } = req.body;

  if (!req.body.name || !req.body.about) {
    return res.status(ERROR_CODE_UNDEFINED).send({ message: 'Переданы некорректные данные' });
  }

  return User.findByIdAndUpdate(req.user._id, { name, about }, optionsOfData)
    .then((user) => {
      if (user) {
        res.status(SUCCESS_CODE_OK).send({ data: user });
      } else {
        res.status(ERROR_CODE_UNDEFINED).send({ message: 'Пользователь с таким id не найден' });
      }
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const uptadeUserAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!req.body.avatar) {
    return res.status(ERROR_CODE_UNDEFINED).send({ message: 'Переданы некорректные данные' });
  }

  return User.findByIdAndUpdate(req.user._id, { avatar }, optionsOfData)
    .then((user) => {
      if (user) {
        res.status(SUCCESS_CODE_OK).send({ data: user });
      } else {
        res.status(ERROR_CODE_UNDEFINED).send({ message: 'Пользователь с таким id не найден' });
      }
    })
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  uptadeUserProfile,
  uptadeUserAvatar,
};
