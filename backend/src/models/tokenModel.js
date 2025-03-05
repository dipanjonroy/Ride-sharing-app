const { Schema, model } = require("mongoose");

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

const Token = model("Token", tokenSchema);

module.exports = Token;
