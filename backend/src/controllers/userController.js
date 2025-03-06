const { userAccessKey } = require("../secret");
const {
  handleUserRegister,
  handleUserVerify,
} = require("../services/userServices");

const jwt = require("jsonwebtoken");
const ExpressError = require("../utility/expresserror");
const User = require("../models/userModel");
const { createToken } = require("../utility/jsonwebtoken");
const Token = require("../models/tokenModel");

module.exports.userRegister = async (req, res) => {
  await handleUserRegister(req.body);
  res.status(209).json({
    success: true,
    message: "Register is successfully",
  });
};

// module.exports.userVerify = async (req, res) => {
//   //let {token} = req.params;
//   const newUser = await handleUserVerify(req.body);
//   res.send(newUser);
// };

module.exports.login = async (req, res) => {
  let { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ExpressError(401, "Invalid email or password.");
  }

  const isPassword = await user.comparePassword(password);

  if (!isPassword) {
    throw new ExpressError(401, "Invalid email or password.");
  }

  const userId = user._id;

  const token = createToken({ userId }, userAccessKey, "1h");

  res.cookie("token", token, {
    maxAge: 1000 * 60 * 60,
    httpOnly: false,
    secure: false,
    sameSite: "Lax",
  });
  res.json({ success: true, message: "Logged in successfully." });
};

module.exports.logout = async (req, res) => {
  res.clearCookie("token");
  let { token } = req.cookies;

  await Token.create({ token });
  res.json({ message: "Logged out successfully." });
};

module.exports.userProfile = async (req, res) => {
  let { token } = req.cookies;
  if (!token) {
    throw new ExpressError(401, "Unauthorized");
  }

  let decoded = jwt.verify(token, userAccessKey);

  if (!decoded) {
    throw new ExpressError(401, "Unauthorized");
  }

  const user = await User.findById(decoded.userId);

  res.json({
    success: true,
    user,
  });
};
