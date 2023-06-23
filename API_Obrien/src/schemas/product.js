import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(3).required().trim().messages({
    "string.min": 'The "name" field must be more than 3 characters!',
    "string.empty": 'The "name" field cannot be empty!',
    "any.required": 'The "name" field is required!',
  }),
  price: Joi.number().min(1).required().messages({
    "number.base": 'The "price" field is only allowed to enter numbers!',
    "number.min": 'The "price" must be greater than {{#limit}}!',
    "number.empty": 'The "price" field cannot be empty!',
    "any.required": 'The "price" field is required!',
  }),
  quantity: Joi.number().min(1).required().messages({
    "number.base": 'The "quantity" field is only allowed to enter number!',
    "number.min": 'The "quantity" must be greater than {{#limit}}!',
    "number.empty": 'The "quantity" field cannot be empty!',
    "any.required": 'The "quantity" field is required!',
  }),
  description: Joi.string().required().trim().messages({
    "string.empty": 'The "description" field cannot be empty!',
    "any.required": 'The "description" field is required!',
  }),
  images: Joi.array().min(1).required().messages({
    "array.base": 'The field "images" must be an array !',
    "array.min": 'The "images" field must contain at least {{#limit}} image !',
    "any.required": 'The "images" field is required !',
  }),
  categoryId: Joi.string().required().trim().messages({
    "string.base": 'The field "categoryId" must be a string.',
    "string.empty": 'The "categoryId" field cannot be empty!',
    "any.required": 'The field "categoryId" is required.',
  }),
  // rating: Joi.number().min(1).required().messages({
  //   "number.base": 'The "rating" field is only allowed to enter number!',
  //   "number.min": 'The "rating" must be greater than {{#limit}}!',
  //   "number.empty": 'The "rating" field cannot be empty!',
  //   "any.required": 'The "rating" field is required!',
  // }),
  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
});

export const productSchemaUpdate = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().min(3).required().trim().messages({
    "string.min": 'The "name" field must be more than 3 characters!',
    "string.empty": 'The "name" field cannot be empty!',
    "any.required": 'The "name" field is required!',
  }),
  price: Joi.number().min(1).required().messages({
    "number.base": 'The "price" field is only allowed to enter numbers!',
    "number.min": 'The "price" must be greater than {{#limit}}!',
    "number.empty": 'The "price" field cannot be empty!',
    "any.required": 'The "price" field is required!',
  }),
  quantity: Joi.number().min(1).required().messages({
    "number.base": 'The "quantity" field is only allowed to enter number!',
    "number.min": 'The "quantity" must be greater than {{#limit}}!',
    "number.empty": 'The "quantity" field cannot be empty!',
    "any.required": 'The "quantity" field is required!',
  }),
  description: Joi.string().required().trim().messages({
    "string.empty": 'The "description" field cannot be empty!',
    "any.required": 'The "description" field is required!',
  }),
  images: Joi.array().min(1).required().messages({
    "array.base": 'The field "images" must be an array !',
    "array.min": 'The "images" field must contain at least {{#limit}} image !',
    "any.required": 'The "images" field is required !',
  }),
  categoryId: Joi.string().required().trim().messages({
    "string.base": 'The field "categoryId" must be a string.',
    "string.empty": 'The "categoryId" field cannot be empty!',
    "any.required": 'The field "categoryId" is required.',
  }),
  // rating: Joi.number().min(1).required().messages({
  //   "number.base": 'The "rating" field is only allowed to enter number!',
  //   "number.min": 'The "rating" must be greater than {{#limit}}!',
  //   "number.empty": 'The "rating" field cannot be empty!',
  //   "any.required": 'The "rating" field is required!',
  // }),
});
