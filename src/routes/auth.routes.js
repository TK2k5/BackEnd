import { loginController, registerController } from '../controllers/auth.controller.js';
import { validationLogin, validationRegister } from '../middlewares/auth.middleware.js';

import express from 'express';
import { wrapRequestHandler } from '../utils/handler.util.js';

const router = express.Router();

// register
router.post('/register', wrapRequestHandler(validationRegister), wrapRequestHandler(registerController));
router.post('/login', wrapRequestHandler(validationLogin), wrapRequestHandler(loginController));

export default router;
