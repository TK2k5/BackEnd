import { isObjectIdOrHexString } from "mongoose";

// check is id
export const checkIsId = (id) => {
  return isObjectIdOrHexString(id);
};
