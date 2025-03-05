const jwt = require("jsonwebtoken");

module.exports.createToken = (payload, accessKey, expiresIn)=>{
  return jwt.sign(payload, accessKey,{expiresIn})
}