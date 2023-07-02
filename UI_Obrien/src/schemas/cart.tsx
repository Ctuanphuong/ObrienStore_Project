import Joi from 'joi'

export const CheckOutSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string()
    .trim()
    .min(3)
    .max(55)
    .required()
    .pattern(/^\S.*$/)
    .messages({
      'string.empty': 'The "name" field cannot be empty!',
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
  shippingAddress: Joi.string()
    .trim()
    .min(6)
    .max(255)
    .required()
    .pattern(/^\S.*$/)
    .messages({
      'string.empty': 'The "address" field cannot be empty!',
      'string.min': 'Address must be at least {#limit} characters.',
      'string.max': 'Address cannot exceed {#limit} characters.',
      'any.required': 'The "address" field is required!',
      'string.pattern.base': 'No spaces allowed!'
    }),
  orderNotes: Joi.string(),
  paymentMethod: Joi.required().messages({
    'any.required': 'The "payment method" field is required!'
  })
})
