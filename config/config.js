// Validation
const Joi = require("joi");

// Register Validation

const registerValidation = (data) => {
  const registerSchema = Joi.object({
    name: Joi.string().min(6).required(),
    username: Joi.string().trim().min(6).max(12).required(),
    email: Joi.string().min(8).required().email(),
    phone: Joi.number().min(100000000).max(99999999999999).required(),
    password: Joi.string().min(6).max(14).required(),
    picture: Joi.string(),
  });
  return registerSchema.validate(data);
};

// Login Validation

const loginValidation = (data) => {
  const loginSchema = Joi.object({
    // username: Joi.string().trim().min(6).max(12).required(),
    email: Joi.string().min(8).required().email(),
    // phone: Joi.number().min(100000000).max(99999999999999).required(),
    password: Joi.string().min(6).max(14).required(),
  });
  return loginSchema.validate(data);
};

// Edit Validation

const editValidation = (data) => {
  const registerSchema = Joi.object({
    name: Joi.string().min(6).required(),
    username: Joi.string().trim().min(6).max(12).required(),
    email: Joi.string().min(8).required().email(),
    phone: Joi.number().min(100000000).max(99999999999999).required(),
    password: Joi.string().min(6).max(14).required(),
  });
  return registerSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.editValidation = editValidation;
