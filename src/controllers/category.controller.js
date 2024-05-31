import {
  checkIsIdCategory,
  createCategoryModel,
  deleteCategoryModel,
  findAllCategory,
  getOneCategoryModel,
  updateCategoryModel,
} from "../models/category.model.js";

import { httpStatus } from "../configs/http-status.config.js";
import { messageResponse } from "../utils/message.util.js";

/* Get all category */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await findAllCategory();

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
