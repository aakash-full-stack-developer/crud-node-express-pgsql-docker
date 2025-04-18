const jwt = require('jsonwebtoken');
const httpStatus = require('http-status').default;
const config = require('../config/config');
const userDao = require('./user.dao');
const ApiError = require('../utils/ApiError');
const { prisma } = require('../utils/database');
const { TokenType } = require('@prisma/client');


const generateToken = (userId, expires, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(new Date(expires).getTime() / 1000),
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expires, type, userType, blacklisted = false, session = null) => {
  return await prisma.token.create({
    data: {
      token,
      userId,
      expires,
      type,
      userType,
      blacklisted,
    },
  });
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await prisma.token.findFirst({
    where: {
      token,
      type,
      userId: payload.sub,
      blacklisted: false,
    },
  });
  if (!tokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Token not found');
  }
  return tokenDoc;
};

const generateAuthTokens = async (user, session = null) => {
  const accessTokenExpires = new Date(Date.now() + config.jwt.accessExpirationMinutes * 60 * 1000);
  const refreshTokenExpires = new Date(Date.now() + config.jwt.refreshExpirationDays * 24 * 60 * 60 * 1000);
  const accessToken = generateToken(user.id, accessTokenExpires);
  const refreshToken = generateToken(user.id, refreshTokenExpires);
  
  await saveToken(refreshToken, user.id, refreshTokenExpires, TokenType.refresh, user.userType, false, session)

  return {
    access: { token: accessToken, expires: accessTokenExpires },
    refresh: { token: refreshToken, expires: refreshTokenExpires },
  };
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
};
