import { HTTP_STATUS } from '../common/http-status.common.js';
import { handleVerifyToken } from '../utils/jwt.util.js';

export const verifyToken = (secretKey) => {
  const verifyToken = async (req, res, next) => {
    const bearerToken = req.headers['authorization'];

    if (!bearerToken) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Access denied!', success: false });
    }

    const token = bearerToken.split(' ')[1];

    // verify token
    const verifyToken = await handleVerifyToken({ token, secretKey: secretKey });
    if (!verifyToken) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Invalid token!', success: false });
    }

    req.user = verifyToken;

    next();
  };
  return verifyToken;
};
