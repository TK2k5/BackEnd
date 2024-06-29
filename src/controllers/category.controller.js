import Category from '../models/category.model.js';
import { HTTP_STATUS } from '../common/http-status.common.js';
import { checkIsId } from '../middlewares/check-id.middleware.js';
import { createCategoryValidate } from '../validations/category.validation.js';

/* Get all category */
export const getAllCategory = async (req, res) => {
  const params = req.query;
  const { _page = 1, _limit = 10, q } = params;
  const options = {
    page: _page,
    limit: _limit,
    select: '-productIds',
  };

  const query = q
    ? {
        $and: [
          {
            $or: [
              { nameCategory: { $regex: new RegExp(q), $options: 'i' } },
              { desc: { $regex: new RegExp(q), $options: 'i' } },
            ],
          },
        ],
      }
    : {};

  const categories = await Category.paginate(query, options);

  if (!categories) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Cannot get category',
      success: false,
    });
  }

  return res.status(HTTP_STATUS.OK).json({
    message: 'Get all category successfully',
    success: true,
    data: categories,
  });
};

/* Create category */
export const createCategory = async (req, res) => {
  const body = req.body;

  // Validate
  const { error } = createCategoryValidate.validate(body, {
    abortEarly: false,
  });

  if (error) {
    const message = error.details.map((item) => ({
      message: item.message,
      name: item.context.label,
    }));

    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: message,
      success: false,
    });
  }

  const category = await Category.create(body);

  if (!category) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Cannot create category',
      success: false,
    });
  }

  return res.status(HTTP_STATUS.OK).json({
    message: 'Create category successfully',
    success: true,
    data: category,
  });
};

/* Update category */
export const updateCategory = async (req, res) => {
  const id = req.params.categoryId;
  const body = req.body;

  if (!checkIsId(id)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Id is not valid',
      success: false,
    });
  }

  const category = await Category.findByIdAndUpdate(id, body, { new: true });

  if (!category) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Cannot update category',
      success: false,
    });
  }

  return res.status(HTTP_STATUS.OK).json({
    message: 'Update category successfully',
    success: true,
    data: category,
  });
};

/* Get one category */
export const getOneCategory = async (req, res) => {
  const id = req.params.categoryId;

  if (!checkIsId(id)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Id is not valid',
      success: false,
    });
  }

  const category = await Category.findById(id).populate({
    path: 'productIds',
    select: '-categoryId -category',
  });

  if (!category) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Cannot get category',
      success: false,
    });
  }

  return res.status(HTTP_STATUS.OK).json({
    message: 'Get category successfully',
    success: true,
    data: category,
  });
};

/* Delete category */
export const deleteCategory = async (req, res) => {
  const id = req.params.categoryId;

  if (!checkIsId(id)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Id is not valid',
      success: false,
    });
  }

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Cannot delete category',
      success: false,
    });
  }

  return res.status(HTTP_STATUS.OK).json({
    message: 'Delete category successfully',
    success: true,
    data: category,
  });
};
