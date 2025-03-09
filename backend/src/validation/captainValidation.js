const Joi = require("joi");

module.exports.captainRegisterSchema = Joi.object({
  firstname: Joi.string().trim().min(3).max(150).required().messages({
    "string.empty": "Firstname is required.",
    "string.min": "Firstname must be at least 3 characters long.",
    "string.max": "Firstname must be maximum 150 characters long.",
    "any.required": "Firstname is required.",
  }),

  lastname: Joi.string().trim().max(150).messages({
    "string.max": "Lastname must be maximum 150 characters long.",
  }),

  email: Joi.string().trim().email().required().messages({
    "string.email": "Please use a valid email.",
    "string.empty": "Email is required.",
    "any.required": "Email is required.",
  }),

  password: Joi.string()
    .min(6)
    .required()
    .pattern(
      new RegExp(
        "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{3,30}$"
      )
    )
    .messages({
      "string.min": "Password must be 6 characters long.",
      "string.empty": "Password is required.",
      "any.required": "Password is required.",
      "string.pattern.base":
        "Password must contain at least one letter, one number, and one special character.",
    }),

  socketId: Joi.string(),

  color: Joi.string().trim(),
  numberplate: Joi.string().trim(),
  type: Joi.string().trim(),
  capacity: Joi.number(),

  lat: Joi.number(),
  long: Joi.number(),
});
