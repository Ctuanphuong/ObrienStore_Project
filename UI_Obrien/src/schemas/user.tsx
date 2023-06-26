import Joi from 'joi'

export const emailSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Invalid email!',
      'string.empty': 'The "email" field cannot be empty!',
      'any.required': 'The "email" field is required!'
    })
})

export const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .trim()
    .required()
    .min(6)
    .pattern(/^\S.*$/)
    .messages({
      'string.empty': 'New password field cannot be empty!',
      'string.min': 'Password must be at least {#limit} characters!',
      'any.required': 'New password field is required!',
      'string.pattern.base': 'No spaces allowed!'
    }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().trim().messages({
    'any.only': 'Confirm new password does not match!',
    'string.empty': 'Confirm new password field cannot be empty!',
    'string.required': 'Confirm new password field is required!'
  })
})

export const verifyTokenSchema = Joi.object({
  verifyToken: Joi.string().trim().required().messages({
    'string.empty': "The 'Verify code' field cannot be empty!",
    'any.required': "The 'Verify code' field is required!"
  })
})
