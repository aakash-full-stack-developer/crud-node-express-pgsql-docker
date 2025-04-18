const express = require('express')
const authRoute = require('./auth.route')
const profileRoute = require('./profile.route')
const productRoute = require('./product.route')

const router = express.Router()

router.use('/auth', authRoute)
router.use('/profile', profileRoute)
router.use('/product', productRoute)

module.exports = router
