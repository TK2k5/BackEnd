import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
} from "../controllers/category.controller.js";

import express from "express";

const router = express.Router();

router.get("/category", getAllCategories);

// Create Category
router.post("/category", createCategory);

//update category
router.put("/category/:categoryId", updateCategory);

//get one category
router.get("/category/:categoryId", getOneCategory);

//delete category
router.delete("/category/:categoryId", deleteCategory);

export default router;
