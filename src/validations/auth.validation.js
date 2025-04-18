const Joi = require('@hapi/joi');
const { password } = require('./custom.validation')

const register = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(password),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({ "any.only": "Confirm password must match password." }),
  })
}

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(password),
  })
}

const verifyOTP = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
  })
}

module.exports = {
  register,
  login,
  verifyOTP
}
