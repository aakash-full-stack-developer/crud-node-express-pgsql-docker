const Joi = require('@hapi/joi');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  })
}

const updateProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  })
}

module.exports = {
  createProduct,
  updateProduct
}
