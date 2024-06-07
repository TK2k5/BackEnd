import joi from "joi";

export const createCategoryValidate = joi.object({
  nameCategory: joi.string().required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot empty",
    "any.required": "Name is required",
  }),
  image: joi.string().required().messages({
    "string.base": "Image must be a string",
    "string.empty": "Image cannot empty",
    "any.required": "Image is required",
  }),
  productIds: joi.string().allow("").messages({
    "string.base": "ProductIds must be a string",
  }),
});
