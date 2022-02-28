const Card = require('../models/card');

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../errors/errors');

const {
  SUCCESS_CODE_OK,
  SUCCESS_CODE_CREATED,
} = require('../utils/utils');

const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.status(SUCCESS_CODE_OK).send({ data: cards }))
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  if (!name || !link) {
    throw new BadRequestError('Не указаны название и/или ссылка карточки');
  }

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(SUCCESS_CODE_CREATED).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(`Переданы некорректные данные${err.errors.link ? `: ${err.errors.link.message}` : ''}`));
      } else {
        next(err);
      }
    });
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      } else if (String(card.owner) === String(req.user._id)) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((deletedCard) => {
            res.status(SUCCESS_CODE_OK).send({ data: deletedCard });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        throw new ForbiddenError('Нельзя удалять карточки другого пользователя');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.status(SUCCESS_CODE_OK).send({ data: card });
      } else {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.status(SUCCESS_CODE_OK).send({ data: card });
      } else {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
