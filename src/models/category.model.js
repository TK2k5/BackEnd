import Category from "../schemas/category.schema.js";
import { isObjectIdOrHexString } from "mongoose";

// get all category
export const findAllCategory = () => {
  const categories = Category.find();

  return categories;
};

// create category
export const createCategoryModel = async (body) => {
  const category = await Category.create(body);

  return category;
};

// update category
export const updateCategoryModel = async (id, body) => {
  const category = await Category.findByIdAndUpdate(id, body, { new: true });

  return category;
};

// get one category
export const getOneCategoryModel = async (id) => {
  const category = await Category.findById(id);

  return category;
};

// delete category
export const deleteCategoryModel = async (id) => {
  const category = await Category.findByIdAndDelete(id);

  return category;
};

// check id category
export const checkIsIdCategory = (id) => {
  return isObjectIdOrHexString(id);
};

// Check id catefory is exist
export const checkIsExistCategory = async (body) => {
  const category = await Category.findById({
    _id: body.categoryId,
  });

  return category;
};

// Thêm id product vào mảng productIds của category
export const addIdProductToCategory = async (body, product) => {
  const category = await Category.findByIdAndUpdate(
    { _id: body.categoryId },
    { $addToSet: { productIds: product._id } },
    { new: true }
  );

  return category;
};

// Tiến hành xóa id product vào mảng productIds của category
export const deleteIdProductFromCategory = async (
  isExistCategory,
  isExistProduct
) => {
  const category = await Category.findByIdAndUpdate(
    { _id: isExistCategory.id },
    { $pull: { productIds: isExistProduct._id } },
    { new: true }
  );

  return category;
};
