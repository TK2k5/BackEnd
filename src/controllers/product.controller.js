import { addIdProductToBrand, checkIsExistBrand, deleteIdProductFromBrand } from '../services/brand.service.js';
import {
  addIdProductToCategory,
  checkIsExistCategory,
  deleteIdProductFromCategory,
} from '../services/category.service.js';
import { checkIsExistProduct, productService } from '../services/product.service.js';

import { HTTP_STATUS } from '../common/http-status.common.js';

// option product
export const optionProduct = (params) => {
  const options = {
    page: _page,
    limit: _limit,
    populate: [
      { path: 'category', select: '_id nameCategory images desc' },
      { path: 'brand', select: '_id nameBrand images desc' },
      ...params.populate,
    ],
  };
};

// create Product
export const createProduct = async (req, res) => {
  const body = req.body;

  const newProduct = await productService.addProduct(body);
  if (!newProduct) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Create Product faild!', success: false });
  }

  // Check id category
  const isExistCategory = await checkIsExistCategory(body);
  if (!isExistCategory) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Category not found!', success: false });
  }

  // Check id Brand
  const isExistBrand = await checkIsExistBrand(body);
  if (!isExistBrand) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Brand not found!', success: false });
  }

  // Tiến hành thêm id product vào mảng productIds của category và brand
  const [category, brand] = await Promise.all([
    addIdProductToCategory(body, newProduct),
    addIdProductToBrand(body, newProduct),
  ]);

  if (!category) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Add product to category failed!', success: false });
  }

  if (!brand) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Add product to brand failed!', success: false });
  }

  return res.status(HTTP_STATUS.OK).json({ message: 'Create Product success!', success: true, data: newProduct });
};

// get Products
export const getProducts = async (req, res) => {
  const params = req.query;
  const { _page = 1, _limit = 10, q } = params;
  const options = {
    page: _page,
    limit: _limit,
    populate: [
      { path: 'category', select: '_id nameCategory images desc' },
      { path: 'brand', select: '_id nameBrand images desc' },
    ],
  };
  const query = q
    ? {
        $and: [
          {
            $or: [
              { nameProduct: { $regex: new RegExp(q), $options: 'i' } },
              { image: { $regex: new RegExp(q), $options: 'i' } },
            ],
          },
        ],
      }
    : {};

  const result = await productService.getAllProducts(query, options);

  if (!result) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Get Products faild!', success: false });
  }

  return res.status(HTTP_STATUS.OK).json({ message: 'Get Products success!', success: true, ...result });
};

// get category by id
export const getProductById = async (req, res) => {
  const { productId } = req.params;

  const result = await productService.getProductById(productId);
  if (!result) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Get cateogry faild!', success: false });
  }

  return res.status(HTTP_STATUS.OK).json({ message: 'Get cateogry success!', success: true, data: result });
};

export const getProductWithStatus = async (req, res) => {
  const { status } = req.query;

  getProductById();
};

// update Product
export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const body = req.body;

  // Check id product có tồn tại ko
  const isExistProduct = await checkIsExistProduct(productId);
  if (!isExistProduct) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Product not found!', success: false });
  }

  // Check id category
  const isExistCategory = await checkIsExistCategory(isExistProduct);
  if (!isExistCategory) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Category not found!', success: false });
  }

  // Check id Brand
  const isExistBrand = await checkIsExistBrand(isExistProduct);
  if (!isExistBrand) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Brand not found!', success: false });
  }

  // Xóa product id trong category
  // Tiến hành xóa id product ra khỏi mảng products của category
  const [category, brand] = await Promise.all([
    deleteIdProductFromCategory(isExistCategory, isExistProduct),
    deleteIdProductFromBrand(isExistBrand, isExistProduct),
  ]);

  if (!category || !brand) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Delete product id failed!', success: false });
  }

  const result = await productService.updateProduct(productId, body);
  if (!result) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Update Product faild!', success: false });
  }

  // Checkcategory
  const isExistCategoryUpdate = await checkIsExistCategory(body);
  if (!isExistCategoryUpdate) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Category not found!', success: false });
  }

  // Tiến hành thêm id product vào mảng products của category và brand
  const [categoryUpdate, brandUpdate] = await Promise.all([
    addIdProductToCategory(body, result),
    addIdProductToBrand(body, result),
  ]);

  if (!categoryUpdate || !brandUpdate) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Add product failed!', success: false });
  }

  return res.status(HTTP_STATUS.OK).json({ message: 'Update Product success!', success: true, data: result });
};

// Delete product
export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  // Check id product có tồn tại ko
  const isExistProduct = await checkIsExistProduct(productId);
  if (!isExistProduct) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Product not found!', success: false });
  }

  // Check id category
  const isExistCategory = await checkIsExistCategory(isExistProduct);
  if (!isExistCategory) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Category not found!', success: false });
  }

  // Check id Brand
  const isExistBrand = await checkIsExistBrand(isExistProduct);
  if (!isExistBrand) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Brand not found!', success: false });
  }

  // Xóa product id trong category
  // Tiến hành xóa id product ra khỏi mảng products của category
  const [category, brand] = await Promise.all([
    deleteIdProductFromCategory(isExistCategory, isExistProduct),
    deleteIdProductFromBrand(isExistBrand, isExistProduct),
  ]);

  if (!category || !brand) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Delete product id failed!', success: false });
  }

  const product = await productService.deleteProduct(productId);

  if (!product) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Delete product failed!', success: false });
  }

  return res.status(HTTP_STATUS.OK).json({ message: 'Delete product successfully!', success: true, data: product });
};
