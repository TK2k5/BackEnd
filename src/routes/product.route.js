import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getOneProduct,
  updateProduct,
} from "../controllers/product.controller.js";

import { checkPermission } from "../middlewares/checkPermission.middleware.js";
import express from "express";

const router = express.Router();

router.get("/product", getAllProduct);
router.get("/product/:idProduct", getOneProduct);
router.post("/product", checkPermission, createProduct);
router.put("/product/:idProduct", checkPermission, updateProduct);
router.delete("/product/:idProduct", checkPermission, deleteProduct);

export default router;
