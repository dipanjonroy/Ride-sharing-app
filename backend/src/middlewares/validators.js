const ExpressError = require("../utility/expresserror");
const { loginSchema } = require("../validation/authValidation");
const { captainRegisterSchema } = require("../validation/captainValidation");
const { userRegisterSchema } = require("../validation/userValidation");

module.exports.validateUser = (req, res, next) => {
  let { error } = userRegisterSchema.validate(req.body);
  console.log(error);
  if (error) {
    throw new ExpressError(401, error.details[0].message);
  } else {
    next();
  }
};

module.exports.validateAuth = (req, res, next) => {
  let { error } = loginSchema.validate(req.body);
  console.log(error);
  if (error) {
    throw new ExpressError(401, error.details[0].message);
  } else {
    next();
  }
};

module.exports.validateCaptain = (req, res, next) => {
  let { error } = captainRegisterSchema.validate(req.body);

  if (error) {
    throw new ExpressError(401, error.details[0].message);
  } else {
    next();
  }
};
