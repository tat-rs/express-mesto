const express = require('express');

const userRouter = express.Router();

const {

  getUsers, getUserById, uptadeUserProfile, uptadeUserAvatar, getUserMe,

} = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/users/me', getUserMe);

userRouter.get('/users/:userId', getUserById);

userRouter.patch('/users/me', uptadeUserProfile);

userRouter.patch('/users/me/avatar', uptadeUserAvatar);

module.exports = userRouter;
