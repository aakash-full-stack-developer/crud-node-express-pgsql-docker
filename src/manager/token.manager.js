const { tokenDao } = require('../dao')

const generateAuthTokens = async (user) => {
  const tokens = await tokenDao.generateAuthTokens(user)
  return tokens
}

module.exports = {
  generateAuthTokens
}
