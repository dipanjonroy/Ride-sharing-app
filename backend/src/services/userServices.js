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

  // const token = createToken(data, jwtUserRegisterKey, "10m");

  // const emailData = {
  //   email: data.email,
  //   subject: "Uber account verification",
  //   html: `<h2>Hello ${data.firstname}</h2>
  //   <p>To activate the account, please click the link below.</p>
  //   <a href="${clientUrl}/api/users/verify/${token}">Activate</a>
  //   `,
  // };

  // await sendEmail(emailData);
  return await User.create(data);
};

// module.exports.handleUserVerify = async(token)=>{
//   let decoded = jwt.verify(token.token, jwtUserRegisterKey);


//   return await User.create(decoded);
// }
