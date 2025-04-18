const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const config = require('./config')
const { userDao } = require('../dao')

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify = async (payload, done) => {
  try {
    const user = await userDao.getUserById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    const userWithPermission = { user, userPermission: {} }
    done(null, userWithPermission);
  } catch (error) {
    done(error, false);
  }
};


const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

module.exports = {
  jwtStrategy,
}
