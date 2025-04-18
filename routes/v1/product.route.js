const express = require('express')
const { auth } = require('../../src/middlewares/auth')
const productValidation = require('../../src/validations/product.validation')
const productController = require('../../src/controllers/product.controller')
const validate = require('../../src/middlewares/validate')
const blockRestrictedCountries = require('../../src/middlewares/countryvalidate')

const router = express.Router()

router.post('/', auth(), blockRestrictedCountries(), validate(productValidation.createProduct), productController.createProduct)
router.get('/', auth(), blockRestrictedCountries(), productController.productList)
router.get('/:productId', auth(), blockRestrictedCountries(), productController.getSingleProduct)
router.patch('/:productId', auth(), blockRestrictedCountries(), validate(productValidation.updateProduct), productController.updateProduct)
router.delete('/:productId', auth(), blockRestrictedCountries(), productController.deleteProduct)

module.exports = router
