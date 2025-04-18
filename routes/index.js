const express = require('express')
const { prisma } = require('../src/utils/database')


const router = express.Router()

router.get('/', async (req, res) => {
  try {
    // Database connection check
    await prisma.$connect()

    const currentDate = new Date().toISOString() // Format the date as ISO string
    res.send({ msg: 'Hello world!', currentDateTime: currentDate, database: 'Connected' })
  } catch (error) {
    res.status(500).send({ msg: 'Database connection failed', error: error.message })
  } finally {
    await prisma.$disconnect()
  }
})

module.exports = router
