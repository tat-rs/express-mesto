const express = require('express');
/*
const auth = require('../middlewares/auth'); */

const userRouter = express.Router();

const {

  getUsers, getUserById, uptadeUserProfile, uptadeUserAvatar,

} = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', getUserById);

userRouter.patch('/users/me', uptadeUserProfile);

userRouter.patch('/users/me/avatar', uptadeUserAvatar);

module.exports = userRouter;
