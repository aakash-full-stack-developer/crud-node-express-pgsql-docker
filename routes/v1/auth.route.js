const express = require('express')
const validate = require('../../src/middlewares/validate')
const authValidation = require('../../src/validations/auth.validation')
const authController = require('../../src/controllers/auth.controllers')
const blockRestrictedCountries = require('../../src/middlewares/countryvalidate')

const router = express.Router()

router.post('/register', blockRestrictedCountries(), validate(authValidation.register), authController.register)
router.post('/login', blockRestrictedCountries(), validate(authValidation.login), authController.login)
router.post('/verify-otp', blockRestrictedCountries(), validate(authValidation.verifyOTP), authController.verifyOTPUser)

module.exports = router
