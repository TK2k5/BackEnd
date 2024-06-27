import { changePasswordController, getUserInfo, getUsers, updateStatus } from '../controllers/user.controller.js';

import { checkPermission } from '../middlewares/check-permission.middleware.js';
import express from 'express';
import { validationChangePassword } from '../middlewares/user.middleware.js';
import { verifyToken } from '../middlewares/verify-token.middleware.js';
import { wrapRequestHandler } from '../utils/handler.util.js';

const router = express.Router();

// change password
router.patch(
  '/change-password',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(validationChangePassword),
  wrapRequestHandler(changePasswordController),
);

// get user info
router.get('/me', wrapRequestHandler(verifyToken), wrapRequestHandler(getUserInfo));

// get users
router.get(
  '/users',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(checkPermission),
  wrapRequestHandler(getUsers),
);

// update status user
router.patch(
  '/user/:userId/:status',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(checkPermission),
  wrapRequestHandler(updateStatus),
);

export default router;
