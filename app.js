const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const {
  createUser,
  login,
} = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorsHandler');
const NotFoundError = require('./errors/NotFoundError');
const { validateRegister, validateLogin } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);

app.post('/signup', validateRegister, createUser);

app.use(cookieParser());

app.post('/signin', validateLogin, login);

app.use(auth);

app.use(userRouter);

app.use(cardRouter);

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена'));
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
