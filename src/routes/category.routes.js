import {
  createCategory,
  deleteCategory,
  getCategoty,
  getCategotyById,
  updateCategoryById,
} from "../controllers/category.controller.js";

import { categorySchema } from "../validations/category.validation.js";
import express from "express";
import { validation } from "../middlewares/validation.middleware.js";

const router = express.Router();

router.post("/categories", validation(categorySchema), createCategory);
router.get("/categories", getCategoty);
router.get("/categories/:id", getCategotyById);
router.delete("/categories/:id", deleteCategory);
router.patch("/categories/:id", validation(categorySchema), updateCategoryById);

export default router;
