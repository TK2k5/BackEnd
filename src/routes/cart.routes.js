import { addToCartMiddleware } from '../middlewares/cart.middleware.js';
import { cartController } from '../controllers/cart.controller.js';
import express from 'express';
import { verifyToken } from '../middlewares/verify-token.middleware.js';
import { wrapRequestHandler } from '../utils/handler.util.js';

const router = express.Router();

router.post(
  '/cart',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(addToCartMiddleware),
  wrapRequestHandler(cartController.addCart),
);

export default router;
