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
  const captainData = await handleCaptainRegister(req.body);

  const token = createToken(newCaptain, jwtCaptainRegisterKey, "10m");

  const emailData = {
    email: captainData.email,
    subject: "Captain Registration",
    html: `<h1>Click on the link to register as a captain</h1>
    <a href="${clientUrl}/api/captains/verify/${token}">Verify</a>`,
  };

  await sendEmail(emailData);

  res.json({ token, message: "Verification email sent." });
};

module.exports.verify = async (req, res) => {
  let { token } = req.body;

  const decoded = jwt.verify(token, jwtCaptainRegisterKey);

  const newCaptain = await createCaptain(decoded);

  res.json({ newCaptain, message: "Captain registered successfully." });
};

module.exports.login = async (req, res) => {
  const captain = await checkCaptain(req.body);

  const captainToken = createToken({captain}, captainAccessKey, "1h");

  res.cookie("captainToken", captainToken, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: true,
    samesite: "none",
  });

  res.json({ message: "Login successful." });
};

module.exports.logout = async(req,res)=>{
  res.clearCookie("captainToken");

  let {captainToken} = req.cookies;

  await blacklistCaptain(captainToken);

  res.json({message:"Logout successful."});
  
}

module.exports.profile = async(req,res)=>{
  const {captainToken} = req.cookies;
  if(!captainToken){
    throw new ExpressError(401,"Unauthorized. Please login.");
  }
  const decoded = jwt.verify(captainToken,captainAccessKey);

  const profile = await showProfile(decoded.captain);

  res.json({profile});
}