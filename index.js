const httpStatus = require('http-status').status
const express = require('express')
//prisma define

const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const passport = require('passport')
const { jwtStrategy } = require('./src/config/passport')

const xss = require('xss-clean')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const session = require('express-session')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const config = require('./src/config/config')
const ApiError = require('./src/utils/ApiError')
const { errorConverter, errorHandler } = require('./src/utils/error')

const oneDay = 1000 * 60 * 60 * 24

const indexRouter = require('./routes/index')
const routes = require('./routes/v1')
const { checkPrismaConnection } = require('./src/utils/database')

const app = express()


// Logging
app.use(logger('dev'))

// Security Middleware
app.use(helmet())
app.use(xss())

// Time out for all requests
// app.use(timeout('1000s'))

// Body Parsing Middleware
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))

// Session Configuration
app.use(
  session({
    secret: 'SECRET',
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  })
)
// To limit request payload size
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))

// CSP helps prevent cross-site scripting (XSS) attacks by controlling which sources of content are allowed to be loaded and executed on your page. You can set the CSP header using the helmet middleware
app.use(helmet.xContentTypeOptions())

// The X-Content-Type-Options header helps prevent browsers from MIME-sniffing and forcing the content type to adhere to what is declared in the response.
app.use(helmet.frameguard({ action: 'deny' }))

// The X-Frame-Options header helps prevent clickjacking attacks by controlling whether your page can be loaded within a frame or iframe.
app.use(helmet.xssFilter())

// The X-XSS-Protection header helps prevent reflected XSS attacks by enabling the browser's built-in XSS filter
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }))

// HSTS header instructs browsers to only access your application over HTTPS, enhancing security against man-in-the-middle attacks.
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }))

const corsOptions = {
  origin: '*'
}
app.use(cors(corsOptions))

// parse json request
app.use(express.json())

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// set security HTTP heades
app.use(helmet())

// sanitize request
app.use(xss())
// gzip compression
app.use(compression())

app.use(express.static(path.join(__dirname, 'public')))

// Passport Initialization
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)
app.use(passport.session())

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
})


app.use('/', indexRouter, apiLimiter)
app.use('/v1', routes, apiLimiter)


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Page Not found'))
})

// Convert & Handle Errors
app.use(errorConverter)
app.use(errorHandler)

let server;
checkPrismaConnection().then((res) => {
  if (!res) {
    console.error('❌ Cannot start the server: Database connection failed.');
    process.exit(1); // Stop the server if Prisma is not connected
  }
   server = app.listen(config.port, () => {
    console.info(`Server listening on port ${config.port}`)
  })
}).catch((err) => {
  console.error('❌ Cannot start the server: Database connection failed.');
  process.exit(1); // Stop the server if Prisma is not connected
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Page Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error) => {
  console.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  console.info('SIGTERM recieved')
  if (server) {
    server.close()
  }
})

module.exports = app