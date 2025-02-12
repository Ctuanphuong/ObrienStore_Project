import Joi from 'joi'

export const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(55)
    .required()
    .pattern(/^\S.*$/)
    .messages({
      'string.empty': 'The "name" field cannot be empty',
      'string.min': 'Name must be at least {#limit} characters.',
      'string.max': 'Name cannot exceed {#limit} characters.',
      'any.required': 'The "name" field is required!',
      'string.pattern.base': 'No spaces allowed!'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Invalid email!',
      'string.empty': 'The "email" field cannot be empty!',
      'any.required': 'The "email" field is required!'
    }),
  phone: Joi.string()
    .trim()
    .pattern(/^(\+|0)?[0-9]{10,11}$/)
    .required()
    .messages({
      'string.base': 'Phone number must be a string of numbers!',
      'string.empty': "The 'phone number' field cannot be empty!",
      'string.pattern.base': 'Invalid phone number! ',
      'any.required': "The 'phone number' field is required!"
    }),
  password: Joi.string()
    .trim()
    .required()
    .min(6)
    .pattern(/^\S.*$/)
    .messages({
      'string.empty': "The 'password' field cannot be empty!",
      'string.min': 'Password must be at least {#limit} characters!',
      'any.required': "The 'password' field is required!",
      'string.pattern.base': 'No spaces allowed!'
    }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().trim().messages({
    'any.only': 'Re-enter password does not match!',
    'string.empty': "The 'confirm password' field cannot be empty!",
    'string.required': "The 'confirm password' field is required!"
  }),
  role: Joi.string(),
  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date())
})

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Invalid email!',
      'string.empty': 'The "email" field cannot be empty!',
      'any.required': 'The "email" field is required!'
    }),
  password: Joi.string().required().min(6).messages({
    'string.empty': "The 'password' field cannot be empty!",
    'string.min': 'Password must be at least {#limit} characters!',
    'any.required': "The 'password' field is required!"
  })
})
