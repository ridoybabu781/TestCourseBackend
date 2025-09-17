const Joi = require("joi");

const role = ["user", "instructor", "admin"];

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  role: Joi.string()
    .required()
    .valid(...role)
    .default("user"),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

module.exports = {
  userSchema,
  loginSchema,
};
