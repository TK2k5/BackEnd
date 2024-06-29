import { createBrand, deleteBrand, getAllBrand, getOneBrand, updateBrand } from '../controllers/brand.controller.js';

import express from 'express';
import { wrapRequestHandler } from '../utils/handler.util.js';

const router = express.Router();

// create brand
router.post('/brand', wrapRequestHandler(createBrand));

// get all brand
router.get('/brand', wrapRequestHandler(getAllBrand));

// get one brand
router.get('/brand/:brandId', wrapRequestHandler(getOneBrand));

// delete brand
router.delete('/brand/:brandId', wrapRequestHandler(deleteBrand));

// update brand
router.patch('/brand/:brandId', wrapRequestHandler(updateBrand));

export default router;
