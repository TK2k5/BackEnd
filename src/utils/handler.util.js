import { HTTP_STATUS } from '../common/http-status.common.js';

export const wrapRequestHandler = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message, success: false });
    }
  };
};
