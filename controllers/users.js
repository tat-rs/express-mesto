const User = require('../models/user');

const optionsOfData = {
  new: true,
  runValidators: true,
  upsert: true,
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        res.status(404).send({ message: 'Пользователь с таким id не найден' });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const uptadeUserProfile = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  if (req.body.name && req.body.about) {
    User.findByIdAndUpdate(userId, { name, about }, optionsOfData)
      .then((user) => res.status(200).send({ data: user }))
      .catch((err) => res.status(500).send({ message: err.message }));
  } else {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

const uptadeUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  if (req.body.avatar) {
    User.findByIdAndUpdate(userId, { avatar }, optionsOfData)
      .then((user) => {
        res.status(200).send({ data: user });
      })
      .catch((err) => res.status(500).send({ message: err.message }));
  } else {
    res.status(500).send({ message: 'Произошла ошибка' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  uptadeUserProfile,
  uptadeUserAvatar,
};
