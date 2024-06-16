import User from '../models/user.model.js';

// check email is already exist
export const checkEmailExist = async (email) => {
  const user = await User.findOne({ email });

  return user;
};

// create user
export const createUser = async (data) => {
  const user = await User.create(data);

  return user;
};
