const Joi = require('@hapi/joi')
const config = require('../../config.json')

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'staging', 'test').required(),
    PORT: Joi.number().default(3001),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().required(),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().required(),
    JWT_SECRET: Joi.string().required(),
  }).unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(config.development)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  ethereal: {
    user: envVars.ETHEREAL_USER,
    pass: envVars.ETHEREAL_PASS
  },
  jwt: {
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    secret: envVars.JWT_SECRET
  },
}
