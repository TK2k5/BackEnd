import {
  checkIdUser,
  createUserModel,
  deleteUserModel,
  getAllUserModel,
  getOneUserModel,
  updateUserModel,
} from "../models/user.model.js";

import { createUserValidate } from "../validates/user.validate.js";
import { httpStatus } from "../configs/http-status.config.js";
import { messageResponse } from "../utils/message.util.js";

/* Get all user */
export const getAllUser = async (req, res) => {
  try {
    const user = await getAllUserModel();

    if (!user) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Cannot get user",
        success: false,
      });
    }

    return messageResponse({
      res,
      status: httpStatus.OK,
      message: "Get all user",
      success: true,
      data: user,
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

/* Get one user */
export const getOneUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await getOneUserModel(id);

    if (!checkIdUser(id)) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Id is not valid",
        success: false,
      });
    }

    if (!user) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Cannot get user",
        success: false,
      });
    }

    return messageResponse({
      res,
      status: httpStatus.OK,
      message: "Get user successfully",
      data: user,
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

/* Create user */
export const createUser = async (req, res) => {
  try {
    const body = req.body;

    const { error } = createUserValidate.validate(body, {
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

    const user = await createUserModel(body);

    if (!user) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Cannot create user",
        success: false,
      });
    }

    return messageResponse({
      res,
      status: httpStatus.OK,
      message: "Create user successfully",
      data: user,
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

/* Update user */
export const updateUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const body = req.body;

    // id check
    if (!checkIdUser(id)) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Id is not valid",
        success: false,
      });
    }

    const user = await updateUserModel(id, body);

    if (!user) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Cannot update user",
        success: false,
      });
    }

    return messageResponse({
      res,
      status: httpStatus.OK,
      message: "Update user successfully",
      data: user,
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

/* Delete user */
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.userId;

    const user = await deleteUserModel(id);

    if (!checkIdUser(id)) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Id is not valid",
        success: false,
      });
    }

    if (!user) {
      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Cannot delete user",
        success: false,
      });
    }

    return messageResponse({
      res,
      status: httpStatus.OK,
      message: "Delete user successfully",
      data: user,
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
