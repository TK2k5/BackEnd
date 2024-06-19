import * as dotenv from 'dotenv';

import {
  loginController,
  registerController,
  resetPasswordController,
  sendEmailController,
} from '../controllers/auth.controller.js';
import {
  validationLogin,
  validationRegister,
  validationResetPassword,
  validationSendEmail,
} from '../middlewares/auth.middleware.js';

import { changePasswordController } from '../controllers/user.controller.js';
import express from 'express';
import { validationChangePassword } from '../middlewares/user.middleware.js';
import { verifyToken } from '../middlewares/verify-token.middleware.js';
import { wrapRequestHandler } from '../utils/handler.util.js';

dotenv.config();
const router = express.Router();

// register
router.post('/register', wrapRequestHandler(validationRegister), wrapRequestHandler(registerController));
// login
router.post('/login', wrapRequestHandler(validationLogin), wrapRequestHandler(loginController));
// send email when user forget password
router.post('/send-email', wrapRequestHandler(validationSendEmail), wrapRequestHandler(sendEmailController));
// reset password
router.put(
  '/reset-password',
  wrapRequestHandler(verifyToken(process.env.SEND_EMAIL_SECRET_KEY)),
  wrapRequestHandler(validationResetPassword),
  wrapRequestHandler(resetPasswordController),
);
// change password
router.patch(
  '/change-password',
  wrapRequestHandler(validationChangePassword),
  wrapRequestHandler(changePasswordController),
);

export default router;
