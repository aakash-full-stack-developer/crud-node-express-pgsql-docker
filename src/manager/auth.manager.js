const { userDao, tokenDao } = require('../dao')
const bcrypt = require('bcryptjs')
const ApiError = require('../utils/ApiError')
const { otpTemplate } = require('../utils/emailTemplate/template')
const { emailService } = require('../services')
const httpStatus = require('http-status').status

const authenticateUser = async (body) => {
  const user = await userDao.getUserByEmail(body.email);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Email Address')
  }

  const otp = `${Math.floor(100000 + Math.random() * 900000)}`

  const variables = {
    otp,
  }

  const finalHTML = otpTemplate.content.replace(/\{(\w+)\}/g, (match, variableName) => {
    if (variables.hasOwnProperty(variableName)) {
      return variables[variableName]
    }
    return match
  })
  if(user.email){
    await emailService.sendHTMLEmail(user.email, 'info@testproject.in', otpTemplate.subject, finalHTML)

  }

  await userDao.updateUserById(user.id, {otp})

  const isPasswordMatch = await bcrypt.compare(body.password, user.password)
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Password')
  }
  
  return true;
}

const verifyOTPUser = async (body) => {
  const user = await userDao.getUserByEmailAndOTP(body.email, body.otp);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid OTP')
  }
  const tokens = await tokenDao.generateAuthTokens(user)
  return { user, tokens }
}

module.exports = {
  authenticateUser,
  verifyOTPUser
}
