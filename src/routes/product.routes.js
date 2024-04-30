import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateProductById,
} from "../controllers/product.controller.js";

import express from "express";
import { productSchema } from "../validations/product.validation.js";
import { validation } from "../middlewares/validation.middleware.js";

const router = express.Router();

// routers

// Tạo ra sản phẩm
// POST /api/products
router.post("/products", validation(productSchema), createProduct);
// Lấy ra danh sách sản phẩm
// GET /api/products
router.get("/products", getProduct);
// Lấy ra 1 sản phẩm theo id
// GET /api/products/:id
router.get("/products/:id", getProductById);
// Xóa sản phẩm
// DELETE /api/products/:id
router.delete("/products/:id", deleteProduct);
// cập nhật sản phẩm
// PUT /api/products/:id
router.put("/products/:id", validation(productSchema), updateProductById);
// PATCH /api/products/:id
router.patch("/products/:id", validation(productSchema), updateProductById);

export default router;
