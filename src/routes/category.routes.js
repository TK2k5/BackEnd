import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getOneCategory,
  updateCategory,
} from '../controllers/category.controller.js';

import express from 'express';
import { wrapRequestHandler } from '../utils/handler.util.js';

const router = express.Router();

// get all category
router.get('/category', wrapRequestHandler(getAllCategory));

// create category
router.post('/category', wrapRequestHandler(createCategory));

// update category
router.patch('/category/:categoryId', wrapRequestHandler(updateCategory));

// get one category
router.get('/category/:categoryId', wrapRequestHandler(getOneCategory));

// delete category
router.delete('/category/:categoryId', wrapRequestHandler(deleteCategory));

export default router;
