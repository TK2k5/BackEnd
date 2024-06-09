import joi from "joi";

export const createUserValidate = joi.object({
  name: joi.string().required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot empty",
    "any.required": "Name is required",
  }),
  email: joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.empty": "Email cannot empty",
    "any.required": "Email is required",
  }),
  password: joi.string().min(6).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password cannot empty",
    "any.required": "Password is required",
  }),
  confirmPassword: joi.string().required().valid(joi.ref("password")).messages({
    "any.only": "Password is not match",
    "any.required": "Password cannot empty",
  }),
  role: joi.string().required().default("Customer").messages({
    "string.base": "Role must be a string",
    "string.empty": "Role cannot empty",
    "any.required": "Role is required",
  }),
  phone: joi.string().required().messages({
    "string.base": "Phone must be a string",
    "string.empty": "Phone cannot empty",
    "any.required": "Phone is required",
  }),
  address: joi.string().required().messages({
    "string.base": "Address must be a string",
    "string.empty": "Address cannot empty",
    "any.required": "Address is required",
  }),
});
