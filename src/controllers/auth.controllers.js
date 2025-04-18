const httpStatus = require('http-status').status
const catchAsync = require('../utils/catchasync.func')
const { authManager, userManager } = require('../manager')
const ApiSuccessResponse = require('../utils/apiresponse.func')

const register = catchAsync(async (req, res) => {
  const data = await userManager.registerUser(req.body)
  res.status(httpStatus.CREATED).send(new ApiSuccessResponse(data, httpStatus.CREATED, 'OTP Sent succesfully !!'))
})

const login = catchAsync(async (req, res) => {
  const data = await authManager.authenticateUser(req.body)
  res.status(httpStatus.OK).send(new ApiSuccessResponse(data, httpStatus.OK, 'OTP Sent succesfully !!'))
})

const verifyOTPUser = catchAsync(async (req, res) => {
  const data = await authManager.verifyOTPUser(req.body)
  res.status(httpStatus.OK).send(new ApiSuccessResponse(data, httpStatus.OK, 'OTP Verified succesfully !!'))

})

module.exports = {
  register, login, verifyOTPUser
}
