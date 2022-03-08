const express = require('express');

const {
  validateUptadeProfile,
  validateUptadeAvatar,
  validateUserdId,
} = require('../middlewares/validation');

const userRouter = express.Router();

const {

  getUsers, getUserById, uptadeUserProfile, uptadeUserAvatar, getUserMe,

} = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/users/me', getUserMe);

userRouter.get('/users/:userId', validateUserdId, getUserById);

userRouter.patch('/users/me', validateUptadeProfile, uptadeUserProfile);

userRouter.patch('/users/me/avatar', validateUptadeAvatar, uptadeUserAvatar);

module.exports = userRouter;
