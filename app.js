const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const app = express();

const { PORT = 3000 } = process.env;

app.use((req, res, next) => {
  req.user = {
    _id: '6208b13b0fd1b5cc4b086d29',
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(userRouter);

app.use(cardRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен через порт ${PORT}`);
});
