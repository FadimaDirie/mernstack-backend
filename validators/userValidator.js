const Joi = require("joi");

const registerValidator = Joi.object({
  full_name: Joi.string().required().messages({
    'string.empty': 'Full name is required',
    'string.min': 'Full name must be at least 3 characters'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'string.empty': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password is required'
  }),
  type: Joi.string().valid('student', 'admin', 'user').default('student')
});

const loginValidator = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'string.empty': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required'
  })
});

module.exports = {
  registerValidator,
  loginValidator
};
