const Captain = require("../models/captainModel");
const Token = require("../models/tokenModel");
const ExpressError = require("../utility/expresserror");

module.exports.handleCaptainRegister = async (data) => {
  let {
    firstname,
    lastname,
    email,
    password,
    color,
    numberplate,
    type,
    capacity,
    lat,
    long,
  } = data;

  const isCaptain = await Captain.exists({ email });

  if (isCaptain) {
    throw new ExpressError(400, "Captain already exists.");
  }

  const captain = {
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      numberplate,
      type,
      capacity,
    },
    location: {
      lat,
      long,
    },
  };

  const newCaptain = await Captain.create(captain);
  return newCaptain;
};

module.exports.checkCaptain = async (data) => {
  let { email, password } = data;

  const captain = await Captain.findOne({ email }).select("+password");

  if (!captain) {
    throw new ExpressError(400, "Invalid email or password.");
  }

  const isPassword = await captain.comparePassword(password);
  if (!isPassword) {
    throw new ExpressError(400, "Invalid email or password.");
  }

  const captainId = captain._id;
  return captainId;
};

module.exports.blacklistCaptain = async (token) => {
  return await Token.create({ token });
};

module.exports.showProfile = async (id) => {
  
  const captain = await Captain.findById(id);

  if (!captain) {
    throw new ExpressError(401, "Profile does not exist.");
  }

  return captain
};
