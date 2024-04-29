import {
  createCategory,
  deleteCategory,
  getCategoty,
  getCategotyById,
  updateCategoryById,
} from "../controllers/category.controller.js";

import express from "express";

const router = express.Router();

router.post("/categories", createCategory);
router.get("/categories", getCategoty);
router.get("/categories/:id", getCategotyById);
router.delete("/categories/:id", deleteCategory);
router.patch("/categories/:id", updateCategoryById);

export default router;
