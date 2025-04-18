const geoip = require("geoip-lite");
const httpStatus = require('http-status').status
const ApiError = require('../utils/ApiError')

const restrictedCountries = [
  "AF", // Afghanistan
  "IR", // Iran
  "SY", // Syria
  "RU", // Russia
  "KP", // North Korea
  "CU", // Cuba
  "SD", // Sudan
  "VE", // Venezuela
  "BY", // Belarus
  "LY", // Libya
  "YE", // Yemen
];


const blockRestrictedCountries = () => (req, res, next) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.connection.remoteAddress;

  // const geo = geoip.lookup("49.43.33.163");
  const geo = geoip.lookup(ip);
  const countryCode = geo?.country;
  if (restrictedCountries.includes(countryCode)) {
    return next(new ApiError(httpStatus.FORBIDDEN, "Access from your country is not allowed."))
  }
  next();
};

module.exports = blockRestrictedCountries