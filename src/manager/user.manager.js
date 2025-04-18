const { userDao, tokenDao } = require('../dao/')
const ApiError = require('../utils/ApiError')
const httpStatus = require('http-status').status

const registerUser = async (body) => { 
  try {
    const data = await userDao.createUser(body);
    return { data }
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message || 'Something went wrong !!')
  }
}

module.exports = {
  registerUser
}

