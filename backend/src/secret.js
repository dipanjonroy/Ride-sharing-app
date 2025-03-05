require("dotenv").config();

const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGODB_URL;

const clientUrl = process.env.CLIENT_URL;

const jwtUserRegisterKey = process.env.JWT_USER_REGISTER_ACCESS_KEY;
const jwtCaptainRegisterKey = process.env.JWT_CAPTAIN_REGISTER_ACCESS_KEY;

const userAccessKey = process.env.JWT_USER_ACCESS_KEY;
const captainAccessKey = process.env.JWT_CAPTAIN_ACCESS_KEY;


const smtpUsername = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;

module.exports = {
  port,
  dbUrl,
  jwtUserRegisterKey,
  jwtCaptainRegisterKey,
  smtpUsername,
  smtpPassword,
  clientUrl,
  userAccessKey,
  captainAccessKey,
};
