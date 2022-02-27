const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  ERROR_CODE_NOCORRECT,
  ERROR_CODE_UNDEFINED,
  ERROR_CODE_DEFAULT,
  SUCCESS_CODE_OK,
  SUCCESS_CODE_CREATED,
  SOLT_ROUND,
  handleError,
} = require('../utils/utils');

const optionsOfData = {
  new: true,
  runValidators: true,
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(SUCCESS_CODE_OK).send({ data: users }))
    .catch(() => res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка на стороне сервера' }));
};

const getUserMe = (req, res) => {
  User.findById({ _id: req.user._id })
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
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!email || !password) {
    return res.status(ERROR_CODE_NOCORRECT).send({ message: 'Неправильный email или пароль' });
  }

  return bcrypt.hash(password, SOLT_ROUND)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((createdUser) => res.status(SUCCESS_CODE_CREATED).send({ data: createdUser }))
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

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send(token);
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUserMe,
  getUserById,
  createUser,
  uptadeUserProfile,
  uptadeUserAvatar,
  login,
};
