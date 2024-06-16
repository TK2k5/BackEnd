import { loginValidation, registerValidation } from '../validations/auth.validation.js';

import { HTTP_STATUS } from '../common/http-status.common.js';

export const validationRegister = async (req, res, next) => {
  const body = req.body;

  // validate
  const { error } = registerValidation.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((item) => item.message);
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: errors, success: false });
  }

  req.user = body;

  next();
};

export const validationLogin = async (req, res, next) => {
  const body = req.body;

  // validate
  const { error } = loginValidation.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((item) => item.message);
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: errors, success: false });
  }

  req.user = body;

  next();
};
