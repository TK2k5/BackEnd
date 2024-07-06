import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductWithStatus,
  getProducts,
  updateProduct,
  updateStatus,
} from '../controllers/product.controller.js';

import { checkPermission } from '../middlewares/check-permission.middleware.js';
import express from 'express';
import { productMiddleware } from '../middlewares/product.middleware.js';
import { verifyToken } from '../middlewares/verify-token.middleware.js';
import { wrapRequestHandler } from '../utils/handler.util.js';

const router = express.Router();

// create product
router.post(
  '/product',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(checkPermission),
  wrapRequestHandler(productMiddleware),
  wrapRequestHandler(createProduct),
);

// get all product
router.get('/product', wrapRequestHandler(getProducts));

// get by id
router.get('/product/:productId', wrapRequestHandler(getProductById));

// get product with status
router.get('/products/:status/:deleted', wrapRequestHandler(getProductWithStatus));

// router update status
router.patch(
  '/product/:productId',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(checkPermission),
  wrapRequestHandler(updateStatus),
);
// update
router.patch(
  '/product/:productId',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(checkPermission),
  wrapRequestHandler(updateProduct),
);

// delete
router.delete(
  '/product/:productId',
  wrapRequestHandler(verifyToken),
  wrapRequestHandler(checkPermission),
  wrapRequestHandler(deleteProduct),
);
export default router;
