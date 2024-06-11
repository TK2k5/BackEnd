import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
} from "../controllers/category.controller.js";

import { checkPermission } from "../middlewares/checkPermission.middleware.js";
import express from "express";

const router = express.Router();

router.get("/category", getAllCategories);

// Create Category
router.post("/category", checkPermission, createCategory);

//update category
router.put("/category/:categoryId", checkPermission, updateCategory);

//get one category
router.get("/category/:categoryId", getOneCategory);

//delete category
router.delete("/category/:categoryId", checkPermission, deleteCategory);

export default router;
