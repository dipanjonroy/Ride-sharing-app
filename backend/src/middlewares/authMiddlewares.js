const jwt = require("jsonwebtoken");
const { userAccessKey } = require("../secret");
const ExpressError = require("../utility/expresserror");
const Token = require("../models/tokenModel");

module.exports.isLoggedInUser = async (req, res, next) => {
  try {
    let { token } = req.cookies;

    if (!token) {
      throw new ExpressError(401, "Unauthorized access, please login.");
    }

    const blackListToken = await Token.exists({ token });

    if (blackListToken) {
      throw new ExpressError(401, "Unauthorized access, please login.");
    }

    const decode = jwt.verify(token, process.env.JWT_USER_ACCESS_KEY);

    req.user = decode.userId;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports.isLoggedOutUser = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    const blackListToken = await Token.exists({ token });

    if (blackListToken) {
      res.clearCookie("token");
    }
    if (token) {
      throw new ExpressError(401, "You are already logged in.");
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports.isLoggedInCaptain = async (req, res, next) => {
  try {
    let { captainToken } = req.cookies;
    const blackListToken = await Token.exists({ captainToken });

    if (blackListToken) {
      throw new ExpressError(401, "Unauthorized access, please login.");
    }

    if (!captainToken) {
      throw new ExpressError(401, "Unauthorized access, please login.");
    }

    const decoded = jwt.verify(
      captainToken,
      process.env.JWT_CAPTAIN_ACCESS_KEY
    );

    req.captain = decoded.captain;

    console.log(req.captain);

    next();
  } catch (err) {
    next(err);
  }
};

module.exports.isLoggedOutCaptain = async (req, res, next) => {
  try {
    let { captainToken } = req.cookies;
    const blackListToken = await Token.exists({ captainToken });

    if (blackListToken) {
      res.clearCookie("token");
    }
    if (captainToken) {
      throw new ExpressError(401, "You are already logged in.");
    }

    next();
  } catch (err) {
    next(err);
  }
};
