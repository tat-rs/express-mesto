const express = require('express');

const userRouter = express.Router();

const {

  getUsers, getUserById, createUser, uptadeUserProfile, uptadeUserAvatar,

} = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', getUserById);

userRouter.post('/users', express.json(), createUser);

userRouter.patch('/users/me', express.json(), uptadeUserProfile);

userRouter.patch('/users/me/avatar', express.json(), uptadeUserAvatar);

module.exports = userRouter;
