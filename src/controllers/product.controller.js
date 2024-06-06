import {
  addIdProductToCategory,
  checkIsExistCategory,
  deleteIdProductFromCategory,
} from "../models/category.model.js";
import {
  checkIsExistProduct,
  checkIsIdProduct,
  createProductModel,
  deleteProductModel,
  getAllProductModel,
  getOneProductModel,
  updateProductModel,
} from "../models/product.model.js";

import { createProductValidate } from "../validates/product.validate.js";
import { httpStatus } from "../configs/http-status.config.js";
import { messageResponse } from "../utils/message.util.js";

/* Get all product */
export const getAllProduct = async (req, res) => {
  try {
    const product = await getAllProductModel();

    if (!product) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Cannot get product",
        success: false,
      });
    }

    return messageResponse({
      res,
      status: httpStatus.OK,
      message: "Get all product",
      data: product,
      success: true,
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

/* Get one product */
export const getOneProduct = async (req, res) => {
  try {
    const id = req.params.idProduct;
    const product = await getOneProductModel(id);

    if (!checkIsIdProduct) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Id is not valid",
        success: false,
      });
    }

    if (!product) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Cannot get product",
        success: false,
      });
    }

    return messageResponse({
      res,
      status: httpStatus.OK,
      message: "Get one product",
      data: product,
      success: true,
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

/* Create product */
export const createProduct = async (req, res) => {
  try {
    const body = req.body;
    // Validate
    const { error } = createProductValidate.validate(body, {
      abortEarly: false,
    });

    if (error) {
      const message = error.details.map((item) => ({
        message: item.message,
        name: item.context.label,
      }));

      return messageResponse({
        res,
        success: false,
        status: httpStatus.BAD_REQUEST,
        message: message,
      });
    }

    const product = await createProductModel(body);

    if (!product) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Cannot create product",
        success: false,
      });
    }

    // Check id category
    const isExistCategory = await checkIsExistCategory(body);
    if (!isExistCategory) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Category not found",
        success: false,
      });
    }

    // Tiến hành thêm id product vào mảng productIds của category
    const category = await addIdProductToCategory(body, product);

    if (!category) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Add product to category fail",
        success: false,
      });
    }

    return messageResponse({
      res,
      status: httpStatus.OK,
      message: "Create product successfully",
      data: product,
      success: true,
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

/* Update product */
export const updateProduct = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.idProduct;

    // Check định dạng
    if (!checkIsIdProduct) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Id is not valid",
        success: false,
      });
    }

    // Check id product có tồn tại ko
    const isExistProduct = await checkIsExistProduct(id);
    if (!isExistProduct) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Product not found",
        success: false,
      });
    }

    // Check id category
    const isExistCategory = await checkIsExistCategory(isExistProduct);
    if (!isExistCategory) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Category not found",
        success: false,
      });
    }

    // Xóa product id trong category
    // Tiến hành xóa id product vào mảng productIds của category
    const category = await deleteIdProductFromCategory(
      isExistCategory,
      isExistProduct
    );
    if (!category) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Add product to category fail",
        success: false,
      });
    }

    // Cập nhật sản phẩm
    const product = await updateProductModel(id, body);

    if (!product) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Cannot update product",
        success: false,
      });
    }

    // Checkcategory
    const isExistCategoryUpdate = await checkIsExistCategory(body);
    if (!isExistCategoryUpdate) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Category not found",
        success: false,
      });
    }

    // Tiến hành thêm id product vào mảng productIds của category
    const categoryUpdate = await addIdProductToCategory(body, product);

    if (!categoryUpdate) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Add product to category fail",
        success: false,
      });
    }

    return messageResponse({
      res,
      status: httpStatus.OK,
      message: "Update product successfully",
      data: product,
      success: true,
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

/* Delete product */
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.idProduct;
    // Check id có đúng định dạng hay ko
    if (!checkIsIdProduct) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Id is not valid",
        success: false,
      });
    }

    // Check id product có tồn tại ko
    const isExistProduct = await checkIsExistProduct(id);
    if (!isExistProduct) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Product not found",
        success: false,
      });
    }

    // Check id category
    const isExistCategory = await checkIsExistCategory(isExistProduct);
    if (!isExistCategory) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Category not found",
        success: false,
      });
    }

    // Xóa product id trong category
    // Tiến hành xóa id product vào mảng productIds của category
    const category = await deleteIdProductFromCategory(
      isExistCategory,
      isExistProduct
    );
    if (!category) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Add product to category fail",
        success: false,
      });
    }

    const product = await deleteProductModel(id);

    if (!product) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Cannot delete product",
        success: false,
      });
    }

    return messageResponse({
      res,
      status: httpStatus.OK,
      message: "Delete product successfully",
      data: product,
      success: true,
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
