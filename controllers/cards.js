const Card = require('../models/card');

const {
  ERROR_CODE_UNDEFINED,
  ERROR_CODE_DEFAULT,
  SUCCESS_CODE_OK,
  SUCCESS_CODE_CREATED,
  handleError,
} = require('../utils/utils');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.status(SUCCESS_CODE_OK).send({ data: cards }))
    .catch(() => res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка на стороне сервера' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(SUCCESS_CODE_CREATED).send({ data: card });
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.status(SUCCESS_CODE_OK).send({ data: card });
      } else {
        res.status(ERROR_CODE_UNDEFINED).send({ message: 'Передан несуществующий _id карточки' });
      }
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.status(SUCCESS_CODE_OK).send({ data: card });
      } else {
        res.status(ERROR_CODE_UNDEFINED).send({ message: 'Передан несуществующий _id карточки' });
      }
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.status(SUCCESS_CODE_OK).send({ data: card });
      } else {
        res.status(ERROR_CODE_UNDEFINED).send({ message: 'Передан несуществующий _id карточки' });
      }
    })
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
