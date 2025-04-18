const nodemailer = require('nodemailer')
const config = require('../config/config')
const logger = require('../config/logger')
const decodeEntities = require('./../utils/decodeEntities')

const transport = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: config.ethereal.user,
    pass: config.ethereal.pass
  }
})

if (transport) {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch((e) => logger.warn('Unable to connect to email server. Check SMTP configuration in .env', e))
} else {
  logger.warn('Email transport not initialized. Check your email configuration.')
}

async function sendHTMLEmail (to, from, subject, htmlContent, replyTo = '', cc = []) {
  try {
    logger.info('emailService: sendHTMLEmail')
    const headers = {}
    return new Promise(async (resolve, reject) => {
      const htmlRendered = decodeEntities(htmlContent)
      transport.sendMail(
        {
          from,
          to,
          cc,
          subject,
          text: htmlRendered,
          html: htmlRendered,
          replyTo,
          headers
        },
        (err, info) => {
          if (err) {
            logger.error(err)
            return reject(err)
          }
          logger.info('emailService: email sent sendHTMLEmail')
          return resolve(info) // info.envelope,info.messageId
        }
      )
    })
  } catch (err) {
    console.log('emailService: sendHTMLEmail -> err', err)
  }
}

module.exports = {
  sendHTMLEmail,
}