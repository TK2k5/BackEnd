import { HTTP_STATUS } from "../common/http-status.common.js";

export const validation = (schema) => async (req, res, next) => {
  const body = req.body;

  try {
    await schema.validate(body);
    next();
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
  }
};
