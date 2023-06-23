import Joi from "joi";

export const categorySchema = Joi.object({
  name: Joi.string().required().trim().messages({
    "string.empty": 'The "name" field cannot be empty!',
    "any.required": 'The "name" field is required!',
  }),
  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
});

export const categoryUpdateSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required().trim().messages({
    "string.empty": 'The "name" field cannot be empty!',
    "any.required": 'The "name" field is required!',
  }),
  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
});
