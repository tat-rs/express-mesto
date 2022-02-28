const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { ERROR_CODE_UNDEFINED } = require('./utils/utils');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const {
  createUser,
  login,
} = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorsHandler');

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signup', createUser);

app.use(cookieParser());

app.post('/signin', login);

app.use(auth);

app.use(userRouter);

app.use(cardRouter);

app.use(errorHandler);

app.use((req, res) => {
  res.status(ERROR_CODE_UNDEFINED).send({ message: 'Страница по указанному маршруту не найдена' });
});

app.listen(PORT);
