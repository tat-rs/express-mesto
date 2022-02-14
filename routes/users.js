const express = require('express');

const userRouter = express.Router();

const {

  getUsers, getUserById, createUser, uptadeUserProfile, uptadeUserAvatar,

} = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', getUserById);

userRouter.post('/users', createUser);

userRouter.patch('/users/me', uptadeUserProfile);

userRouter.patch('/users/me/avatar', uptadeUserAvatar);

module.exports = userRouter;
