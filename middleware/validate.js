const Joi = require('joi');

/* ================= VALIDATION MIDDLEWARE ================= */

function validate(schema) {
  return function (req, res, next) {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true
    });

    if (error) {
      const messages = error.details
        .map(d => d.message.replace(/['"]/g, ''))
        .join('; ');

      return res.status(400).json({
        success: false,
        message: messages
      });
    }

    req.body = value;
    next();
  };
}

/* ================= SCHEMAS ================= */

const schemas = {

  register: Joi.object({
    name: Joi.string().min(2).max(50).required()
      .messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 2 characters'
      }),

    email: Joi.string().email().lowercase().trim().required(),

    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
      .message('Password must include uppercase, lowercase, number, and special character')
      .required(),

    phone: Joi.string()
      .pattern(/^[6-9]\d{9}$/)
      .optional(),

    language: Joi.string()
      .valid('en','hi','mr','ta','bn')
      .default('en')
  }),

  login: Joi.object({
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().required()
  }),

  chat: Joi.object({
    message: Joi.string().trim().min(1).max(5000).required(),

    provider: Joi.string()
      .valid('openai','gemini','ollama')
      .default('openai'),

    language: Joi.string()
      .valid('en','hi','mr','ta','bn')
      .optional(),

    sessionId: Joi.string()
      .guid({ version: 'uuidv4' })
      .optional()
  })

};

module.exports = {
  validate,
  schemas
};