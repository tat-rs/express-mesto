const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Введен некорректный email');
      }),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png')
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Введена некорректная ссылка');
      }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Введен некорректный email');
      }),
    password: Joi.string().required(),
  }),
});

const validateUptadeProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateUptadeAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Введена некорректная ссылка');
      }),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Введена некорректная ссылка');
      }),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const validateUserdId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validateRegister,
  validateLogin,
  validateUptadeProfile,
  validateUptadeAvatar,
  validateCreateCard,
  validateCardId,
  validateUserdId,
};
