import {
  checkIsIdCategory,
  createCategoryModel,
  deleteCategoryModel,
  findAllCategory,
  getOneCategoryModel,
  updateCategoryModel,
} from "../models/category.model.js";

import { createCategoryValidate } from "../validates/category.validate.js";
import { httpStatus } from "../configs/http-status.config.js";
import { messageResponse } from "../utils/message.util.js";

/* Get all category */
export const getAllCategories = async (req, res) => {
  try {
    const params = req.query;
    const { _page = 1, _limit = 10, q } = params;
    const options = {
      page: _page,
      limit: _limit,
      // populate: [{ path: "productIds", select: "-categoryId" }],
      select: "-productIds",
    };

    const query = q
      ? {
          $and: [
            {
              $or: [
                { nameCategory: { $regex: new RegExp(q), $options: "i" } },
                { image: { $regex: new RegExp(q), $options: "i" } },
              ],
            },
          ],
        }
      : {};

    const categories = await findAllCategory(query, options);

    if (!categories) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Cannot get category",
        success: false,
      });
    }

    return messageResponse({
      res,
      success: true,
      status: httpStatus.OK,
      message: "Get all category",
      data: categories,
    });
  } catch (error) {
    return messageResponse({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal Server is error",
      success: false,
      data: error,
    });
  }
};

/* Create category */
export const createCategory = async (req, res) => {
  try {
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

      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: message,
        success: false,
      });
    }

    const category = await createCategoryModel(body);

    if (!category) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Cannot create category",
        success: false,
      });
    }

    return messageResponse({
      res,
      status: httpStatus.CREATED,
      message: "Create category successfully",
      success: true,
      data: category,
    });
  } catch (error) {
    return messageResponse({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal Server is error",
      success: false,
      data: error,
    });
  }
};

/* Update category */
export const updateCategory = async (req, res) => {
  try {
    const id = req.params.categoryId;
    const body = req.body;

    if (!checkIsIdCategory(id)) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Id is not valid",
        success: false,
      });
    }

    const category = await updateCategoryModel(id, body);

    if (!category) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Cannot update category",
        success: false,
      });
    }

    return messageResponse({
      res,
      status: httpStatus.OK,
      message: "Update category successfully",
      success: true,
      data: category,
    });
  } catch (error) {
    return messageResponse({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal Server is error",
      success: false,
      data: error,
    });
  }
};

/* Get one category */
export const getOneCategory = async (req, res) => {
  try {
    const id = req.params.categoryId;
    const category = await getOneCategoryModel(id);

    if (!checkIsIdCategory(id)) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Id is not valid",
        success: false,
      });
    }

    if (!category) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Cannot get category",
        success: false,
      });
    }

    return messageResponse({
      res,
      status: httpStatus.OK,
      message: "Get category successfully",
      success: true,
      data: category,
    });
  } catch (error) {
    return messageResponse({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal Server is error",
      success: false,
      data: error,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.categoryId;

    if (!checkIsIdCategory(id)) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Id is not valid",
        success: false,
      });
    }

    const category = await deleteCategoryModel(id);

    if (!category) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Cannot delete category",
        success: false,
      });
    }

    return messageResponse({
      res,
      status: httpStatus.OK,
      message: "Delete category successfully",
      success: true,
      data: category,
    });
  } catch (error) {
    return messageResponse({
      res,
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal Server is error",
      success: false,
      data: error,
    });
  }
};
