import User from "../schemas/user.schema.js";
import { isObjectIdOrHexString } from "mongoose";

// get all user
export const getAllUserModel = () => {
  const user = User.find();

  return user;
};

// get one user
export const getOneUserModel = async (id) => {
  const user = await User.findById(id);

  return user;
};

// create user
export const createUserModel = async (body) => {
  const user = await User.create(body);

  return user;
};

// update user
export const updateUserModel = async (id, body) => {
  const user = await User.findByIdAndUpdate(id, body, { new: true });

  return user;
};

// delete user
export const deleteUserModel = async (id) => {
  const user = await User.findByIdAndDelete(id);

  return user;
};

// check id user
export const checkIdUser = (id) => {
  return isObjectIdOrHexString(id);
};

// check email có tồn tại chưa
export const checkIsExistUser = async (body) => {
  const user = await User.findOne({ email: body.email });

  return user;
};
