const Joi = require("joi");

module.exports.userRegisterSchema = Joi.object({
  firstname: Joi.string().trim().min(3).max(150).required().messages({
    "string.min": "Firstname must be at least 3 characters long.",
    "string.empty": "Firstname can't be empty.",
    "any.required": "Firstname is required.",
  }),

  lastname: Joi.string().trim(),

  email: Joi.string().email().trim().required().messages({
    "string.email": "Email is not valid",
    "any.required": "Email is required.",
  }),

  password: Joi.string()
    .min(6)
    .pattern(
      new RegExp(
        "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{3,30}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one letter, one number, and one special character.",
      "string.empty": "Password cannot be empty.",
      "any.required": "Password is required.",
    }),
});
