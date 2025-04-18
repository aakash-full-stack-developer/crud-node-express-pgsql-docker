const ApiError = require('../utils/ApiError')
const httpStatus = require('http-status').status
const bcrypt = require('bcryptjs')
const { prisma } = require('../utils/database')
const { otpTemplate } = require('../utils/emailTemplate/template')
const { emailService } = require('../services')


const createUser = async (userBody) => {
  const { email, password } = userBody;

  const existingUser = await prisma.user.findFirst({
    where: {
      email
    }
  });  
  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists');
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
  if(email){
    await emailService.sendHTMLEmail(email, 'info@testproject.in', otpTemplate.subject, finalHTML)
  }

  const hashedPassword = await bcrypt.hash(password, 8)
  await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      otp,
    }
  })
  return true;
}

const getUserByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } })
}

const getUserByQuery = async (query) => {
  return prisma.user.findFirst({ where: query })
}

const getUserByEmailAndOTP= async (email, otp) =>{
  const user = await getUserByQuery({email, otp});
  return user;
}
const getUserById = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) {
    return null
  }
  return user
}

const updateUserById = async (userId, updatedUserInfo) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })
  if (updatedUserInfo.password) {
    const salt = await bcrypt.genSalt(8)
    updatedUserInfo.password = await bcrypt.hash(updatedUserInfo.password, salt)
  }
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updatedUserInfo,
  });

  return updatedUser
}
  
const updateUser = async (userId, updatedUserInfo) => {
  return prisma.user.update({
    where: { id: userId },
    data: updatedUserInfo, 
  });
};

module.exports = {
  createUser,
  getUserByEmail,
  updateUserById,
  updateUser,
  getUserById,
  getUserByQuery,
  getUserByEmailAndOTP
}
