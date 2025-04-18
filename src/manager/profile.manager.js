
const { userDao } = require('../dao')
const UserResponseAdapter = require('../utils/adapter/UserResponse')

const userInfo = async (req) => {
    const user = await userDao.getUserById(req.user.id)
    const userResponse = new UserResponseAdapter(user)
    return { user: userResponse }
}

module.exports = {
  userInfo,
}
