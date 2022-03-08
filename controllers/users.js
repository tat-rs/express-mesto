const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizatedError,
} = require('../errors/errors');
const User = require('../models/user');

const {
  SUCCESS_CODE_OK,
  SUCCESS_CODE_CREATED,
  SOLT_ROUND,
} = require('../utils/utils');

const optionsOfData = {
  new: true,
  runValidators: true,
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(SUCCESS_CODE_OK).send({ data: users }))
    .catch(next);
};

const getUserMe = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (user) {
        res.status(SUCCESS_CODE_OK).send({ data: user });
      } else {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
    })
    .catch((err) => {
      next(err);
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(SUCCESS_CODE_OK).send({ data: user });
      } else {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Не передан email или пароль');
  }

  return bcrypt.hash(password, SOLT_ROUND)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => res.status(SUCCESS_CODE_CREATED).send({
      data: {
        name, about, avatar, email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(`Переданы некорректные данные${err.errors.email ? `: ${err.errors.email.message}` : ''}`));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

const uptadeUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  if (!req.body.name || !req.body.about) {
    throw new BadRequestError('Переданы некорректные данные');
  }

  return User.findByIdAndUpdate(req.user._id, { name, about }, optionsOfData)
    .then((user) => {
      if (user) {
        res.status(SUCCESS_CODE_OK).send({ data: user });
      } else {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const uptadeUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  if (!req.body.avatar) {
    throw new BadRequestError('Переданы некорректные данные');
  }

  return User.findByIdAndUpdate(req.user._id, { avatar }, optionsOfData)
    .then((user) => {
      if (user) {
        res.status(SUCCESS_CODE_OK).send({ data: user });
      } else {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(err.errors.avatar.message));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Не передан email или пароль');
  }

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
      res.send({ token });
    })
    .catch((err) => {
      next(new UnauthorizatedError(err.message));
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
