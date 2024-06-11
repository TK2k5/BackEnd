import { getOneUserModel } from "../models/user.model.js";
import { httpStatus } from "../configs/http-status.config.js";
import jwt from "jsonwebtoken";
import { messageResponse } from "../utils/message.util.js";

export const checkPermission = async (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    messageResponse({
      res,
      status: httpStatus.UNAUTHORIZED,
      message: "Access denied",
    });
  }

  token = token.split(" ")[1];

  if (!token) {
    messageResponse({
      res,
      status: httpStatus.UNAUTHORIZED,
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await getOneUserModel(decoded._id);

    if (!user) {
      messageResponse({
        res,
        status: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
      });
    }

    if (user.role !== "Admin") {
      messageResponse({
        res,
        status: httpStatus.FORBIDDEN,
        message: "Forbidden",
      });
    }

    next();
  } catch (error) {
    messageResponse({
      res,
      status: httpStatus.UNAUTHORIZED,
      message: "Unauthorized",
      data: error,
    });
  }
};

export const checkAuth = async (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    messageResponse({
      res,
      status: httpStatus.UNAUTHORIZED,
      message: "Access denied",
    });
  }

  token = token.split(" ")[1];

  if (!token) {
    messageResponse({
      res,
      status: httpStatus.UNAUTHORIZED,
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.userId = decoded._id;

    next();
  } catch (error) {
    messageResponse({
      res,
      status: httpStatus.UNAUTHORIZED,
      message: "Unauthorized",
      data: error,
    });
  }
};
