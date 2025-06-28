const Joi = require("joi");

const groupValidator = Joi.object({
  name: Joi.string().required(),
  subject: Joi.string().required(),
  created_by: Joi.string().required()
});

module.exports = {
  groupValidator
};
