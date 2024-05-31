import {
  checkIsIdProduct,
  createProductModel,
  deleteProductModel,
  getAllProductModel,
  getOneProductModel,
  updateProductModel,
} from "../models/product.model.js";

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
    const product = await createProductModel(body);

    if (!product) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Cannot create product",
        success: false,
      });
    }

    return messageResponse({
      res,
      status: httpStatus.OK,
      message: "Create product successfully",
      data: product,
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

    if (!checkIsIdProduct) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Id is not valid",
        success: false,
      });
    }

    const product = await updateProductModel(id, body);

    if (!product) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Cannot update product",
        success: false,
      });
    }

    return messageResponse({
      res,
      status: httpStatus.OK,
      message: "Update product successfully",
      data: product,
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
    if (!checkIsIdProduct) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Id is not valid",
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
