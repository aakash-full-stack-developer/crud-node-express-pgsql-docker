const { prisma } = require('../utils/database');

const getUserByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } })
}

module.exports = {
  getUserByEmail
}