import { checkEmailExist, createUser } from '../services/auth.service.js';
import { handleComparePassword, handleHashPassword } from '../utils/hash-password.util.js';

import { HTTP_STATUS } from '../common/http-status.common.js';
import { handleGenerateToken } from '../utils/jwt.util.js';

export const registerController = async (req, res) => {
  const body = req.user;

  // check email
  const user = await checkEmailExist(body.email);

  if (user) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Email already exist', success: false });
  }

  // hash password
  const hashPassword = await handleHashPassword({ password: body.password, saltNumber: 5 });

  // create user in db
  const newUser = await createUser({ ...body, password: hashPassword });

  if (!newUser) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'User not created', success: false });
  }

  // generate token
  const accessToken = await handleGenerateToken({ payload: { _id: newUser._id, email: newUser.email } });

  return res.status(HTTP_STATUS.CREATED).json({
    message: 'User created successfully',
    success: true,
    accessToken,
  });
};

export const loginController = async (req, res) => {
  const body = req.user;

  // check email
  const user = await checkEmailExist(body.email);

  if (!user) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Email not found', success: false });
  }

  // compare password
  const isMatch = await handleComparePassword({ password: body.password, hashPassword: user.password });
  if (!isMatch) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Password not match!', success: false });
  }

  // generate token
  const accessToken = await handleGenerateToken({ payload: { _id: user._id, email: user.email } });

  return res.status(HTTP_STATUS.CREATED).json({
    message: 'Login successfully',
    success: true,
    accessToken,
  });
};
