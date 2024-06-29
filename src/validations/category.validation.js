import joi from 'joi';

export const createCategoryValidate = joi.object({
  nameCategory: joi.string().required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot empty',
    'any.required': 'Name is required',
  }),
  desc: joi.string().required().messages({
    'string.base': 'Desc must be a string',
    'string.empty': 'Desc cannot empty',
    'any.required': 'Desc is required',
  }),
  status: joi.string().required().default('inactive').messages({
    'string.base': 'Status must be a string',
    'string.empty': 'Status cannot empty',
    'any.required': 'Status is required',
  }),
  productIds: joi.string().allow('').messages({
    'string.base': 'ProductIds must be a string',
  }),
});
