import joi from "joi";

export const createProductValidate = joi.object({
  nameProduct: joi.string().required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot empty",
    "any.required": "Name is required",
  }),
  priceProduct: joi.number().required().messages({
    "number.base": "Price must be a number",
    "number.empty": "Price cannot empty",
    "any.required": "Price is required",
  }),
  descProduct: joi.string().allow("").messages({
    "string.base": "Desc must be a string",
  }),
  image: joi.string().required().messages({
    "string.base": "Image must be a string",
    "string.empty": "Image cannot empty",
    "any.required": "Image is required",
  }),
  category: joi.string().required().messages({
    "string.base": "Category must be a string",
    "string.empty": "Category cannot empty",
    "any.required": "Category is required",
  }),
  count: joi.number().required().messages({
    "number.base": "Count must be a number",
    "number.empty": "Count cannot empty",
    "any.required": "Count is required",
  }),
});
