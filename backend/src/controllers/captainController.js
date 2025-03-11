const {
  jwtCaptainRegisterKey,
  clientUrl,
  captainAccessKey,
} = require("../secret");
const {
  handleCaptainRegister,
  createCaptain,
  checkCaptain,
  blacklistCaptain,
  showProfile,
} = require("../services/captainServices");
const ExpressError = require("../utility/expresserror");
const { createToken } = require("../utility/jsonwebtoken");
const sendEmail = require("../utility/sendEmail");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  await handleCaptainRegister(req.body);

  res.json({ success: true, message: "Captain registered successfully." });
};

module.exports.login = async (req, res) => {
  const captain = await checkCaptain(req.body);

  const captainToken = createToken({ captain }, captainAccessKey, "1h");

  res.cookie("captainToken", captainToken, {
    maxAge: 1000 * 60 * 60,
    httpOnly: false,
    secure: false,
    samesite: "Lax",
  });

  res.json({
    success: true,
    message: "Login successfully",
  });
};

module.exports.logout = async (req, res) => {
  res.clearCookie("captainToken");

  let { captainToken } = req.cookies;

  await blacklistCaptain(captainToken);

  res.json({ message: "Logout successful." });
};

module.exports.profile = async (req, res) => {
  const captainId = req.captain;
  if (!captainId) {
    throw new ExpressError(401, "Unauthorized. Please login.");
  }
  const profile = await showProfile(captainId);

  res.json({ profile });
};
