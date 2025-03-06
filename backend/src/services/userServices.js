const User = require("../models/userModel");
const { jwtUserRegisterKey, clientUrl } = require("../secret");
const ExpressError = require("../utility/expresserror");
const { createToken } = require("../utility/jsonwebtoken");
const sendEmail = require("../utility/sendEmail");
const jwt = require("jsonwebtoken")

module.exports.handleUserRegister = async (data) => {
  const isUserExist = await User.exists({ email: data.email });
  if (isUserExist) {
    throw new ExpressError(401, "User is already exist.");
  }

  return await User.create(data);
};

// module.exports.handleUserVerify = async(token)=>{
//   let decoded = jwt.verify(token.token, jwtUserRegisterKey);


//   return await User.create(decoded);
// }
