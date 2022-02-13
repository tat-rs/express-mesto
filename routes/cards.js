const express = require('express');

const cardRouter = express.Router();

const { getCards, createCard, deleteCardById } = require('../controllers/cards');

cardRouter.get('/cards', getCards);

cardRouter.post('/cards', express.json(), createCard);

cardRouter.delete('/cards/:cardId', deleteCardById);

module.exports = cardRouter;
