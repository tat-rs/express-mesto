const express = require('express');

const userRouter = express.Router();

const {

  getUsers, getUserById, createUser, uptadeUserProfile, uptadeUserAvatar, login,

} = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', getUserById);

userRouter.patch('/users/me', uptadeUserProfile);

userRouter.patch('/users/me/avatar', uptadeUserAvatar);

userRouter.post('/signup', createUser);

userRouter.post('/signin', login);

module.exports = userRouter;
