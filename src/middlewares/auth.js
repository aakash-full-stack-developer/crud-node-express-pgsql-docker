const passport = require('passport')
const httpStatus = require('http-status').status
const ApiError = require('../utils/ApiError')

const verifyCallback = (req, resolve, reject) => async (err, userWithPermission, info) => {
  if (err || info || !userWithPermission) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'))
  }
  req.user = { ...userWithPermission.user, userPermission: userWithPermission.userPermission }

  resolve()
}

const auth = () => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next)
  })
    .then(() => next())
    .catch((err) => next(err))
}

module.exports = { auth }
