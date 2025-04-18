const express = require('express')
const { auth } = require('../../src/middlewares/auth')
const profileController = require('../../src/controllers/profile.controller')
const blockRestrictedCountries = require('../../src/middlewares/countryvalidate')

const router = express.Router()

router.get('/me', auth(), blockRestrictedCountries(), profileController.userInfo)

module.exports = router
