import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
} from "../controllers/product.controller.js";

import express from "express";

const router = express.Router();

router.get("/product", getAllProduct);
router.get("/product/:idProduct", getOneProduct);
router.post("/product", createProduct);
router.put("/product/:idProduct", updateProduct);
router.delete("/product/:idProduct", deleteProduct);

export default router;
