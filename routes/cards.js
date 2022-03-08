const express = require('express');

const {
  validateCreateCard,
  validateCardId,
} = require('../middlewares/validation');

const cardRouter = express.Router();

const {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/cards', getCards);

cardRouter.post('/cards', validateCreateCard, createCard);

cardRouter.delete('/cards/:cardId', validateCardId, deleteCardById);

cardRouter.put('/cards/:cardId/likes', validateCardId, likeCard);

cardRouter.delete('/cards/:cardId/likes', validateCardId, dislikeCard);

module.exports = cardRouter;
