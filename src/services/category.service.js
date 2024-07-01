import Category from '../models/category.model.js';

export const createCategoryService = async (body) => {
  const newBrand = await Category.create(body);

  return newBrand;
};

// get all categories
export const getAllCategories = async () => {
  const categories = await Category.find().populate([{ path: 'products', select: '-category -brand' }]);
  return categories;
};

// get category by id
export const getCategoryByIdService = async (id) => {
  const category = await Category.findById({ _id: id });

  return category;
};

// update category
export const updateCategoryService = async (id, body) => {
  const category = await Category.findByIdAndUpdate({ _id: id }, body, { new: true });
  return category;
};

// Check id category is exist
export const checkIsExistCategory = async (body) => {
  const category = await Category.findById({
    _id: body.category,
  });

  return category;
};

// Thêm id product vào mảng products của category
export const addIdProductToCategory = async (body, product) => {
  const category = await Category.findByIdAndUpdate(
    { _id: body.category },
    { $addToSet: { products: product._id } },
    { new: true },
  );

  return category;
};

// Xóa id product khỏi mảng products của category
export const deleteIdProductFromCategory = async (isExistCategory, isExistProduct) => {
  const category = await Category.findByIdAndUpdate(
    { _id: isExistCategory.id },
    { $pull: { products: isExistProduct._id } },
    { new: true },
  );

  return category;
};
