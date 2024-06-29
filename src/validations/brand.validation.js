import joi from 'joi';

export const createBrandValidate = joi.object({
  nameBrand: joi.string().required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot empty',
    'any.required': 'Name is required',
  }),
  desc: joi.string().required().messages({
    'string.base': 'Desc must be a string',
    'string.empty': 'Desc cannot empty',
    'any.required': 'Desc is required',
  }),
  country: joi.string().required().messages({
    'string.base': 'Country must be a string',
    'string.empty': 'Country cannot empty',
    'any.required': 'Country is required',
  }),
});
