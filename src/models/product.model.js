import Product from "../schemas/product.schema.js";
import { isObjectIdOrHexString } from "mongoose";

// Get all product
export const getAllProductModel = () => {
  const product = Product.find();

  return product;
};

// Get one product
export const getOneProductModel = async (id) => {
  const product = await Product.findById(id);

  return product;
};

// Create product
export const createProductModel = async (body) => {
  const product = await Product.create(body);

  return product;
};

// Update product
export const updateProductModel = async (id, body) => {
  const product = await Product.findByIdAndUpdate(id, body, { new: true });

  return product;
};

// Delete product
export const deleteProductModel = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  return product;
};

// check id product
export const checkIsIdProduct = (id) => {
  return isObjectIdOrHexString(id);
};

// check product is exist
export const checkIsExistProduct = async (id) => {
  const product = await Product.findById({ _id: id });

  return product;
};
