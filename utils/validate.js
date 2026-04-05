const Joi = require('joi');

// User schemas
const userRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('viewer', 'analyst', 'admin'),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Transaction schema
const transactionSchema = Joi.object({
  amount: Joi.number().min(0).required(),
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.string().min(1).max(50).required(),
  date: Joi.date(),
  notes: Joi.string().max(500),
});

// Validation middleware
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  userRegisterSchema,
  userLoginSchema,
  transactionSchema,
  validate,
};
