const httpStatus = require('http-status').status
const catchAsync = require('../utils/catchasync.func')
const ApiSuccessResponse = require('../utils/apiresponse.func')
const { profileManager } = require('../manager')

const userInfo = catchAsync(async (req, res) => {
  const data = await profileManager.userInfo(req)
  res.status(httpStatus.OK).send(new ApiSuccessResponse(data, httpStatus.OK, 'User Retrieved successfully'))
})

module.exports = {
  userInfo,
}
