import * as dotenv from "dotenv";

import {
  checkIdUser,
  checkIsExistUser,
  createUserModel,
  deleteUserModel,
  getAllUserModel,
  getOneUserModel,
  updateUserModel,
} from "../models/user.model.js";
import {
  loginValidate,
  registerValidate,
} from "../validates/authen.validate.js";

import User from "../schemas/user.schema.js";
import bcrypt from "bcrypt";
import { createUserValidate } from "../validates/user.validate.js";
import { httpStatus } from "../configs/http-status.config.js";
import jwt from "jsonwebtoken";
import { messageResponse } from "../utils/message.util.js";

dotenv.config();

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

export const userController = {
  // register user
  register: async (req, res) => {
    try {
      // body request
      const body = req.body;
      const { error } = registerValidate.validate(body, {
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

      // check email đã tồn tại chưa
      const isExistUser = await checkIsExistUser(body);
      if (isExistUser) {
        return messageResponse({
          res,
          status: httpStatus.BAD_REQUEST,
          message: "Email đã tồn tại",
          success: false,
        });
      }

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(body.password, salt);

      // Tạo user
      const newUser = await User.create({
        ...body,
        password: hashPassword,
      });
      if (!newUser) {
        return messageResponse({
          res,
          status: httpStatus.BAD_REQUEST,
          message: "Register failed",
          success: false,
        });
      }

      const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET, {
        expiresIn: "1m",
      });

      return messageResponse({
        res,
        status: httpStatus.BAD_REQUEST,
        message: "Register successfully",
        success: false,
        body: token,
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
  },
  //login
  login: async (req, res) => {
    try {
      const body = req.body;

      // validate
      const { error } = loginValidate.validate(body, {
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

      // check email đã tồn tại chưa
      const isExistUser = await checkIsExistUser(body);
      if (!isExistUser) {
        return messageResponse({
          res,
          status: httpStatus.BAD_REQUEST,
          message: "Email không tồn tại",
          success: false,
        });
      }

      // check password
      const isValidPassword = await bcrypt.compare(
        body.password,
        isExistUser.password
      );

      if (!isValidPassword) {
        return messageResponse({
          res,
          status: httpStatus.BAD_REQUEST,
          message: "Mật khẩu không chính xác",
          success: false,
        });
      }

      if (isExistUser && isValidPassword) {
        const token = jwt.sign(
          { _id: isExistUser._id },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "1m",
          }
        );

        const { password, ...user } = isExistUser._doc;
        return res.status(httpStatus.OK).json({
          message: "Login successfully",
          success: true,
          accessToken: token,
          email: user.email,
          id: user._id,
          role: user.role,
        });
      }
    } catch (error) {
      return messageResponse({
        res,
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Internal Server is error",
        success: false,
        data: error,
      });
    }
  },
};
