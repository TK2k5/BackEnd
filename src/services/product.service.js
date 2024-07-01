import Product from '../models/product.model.js';

// create brand
export const createProductService = async (body) => {
  const newProduct = await Product.create(body);

  return newProduct;
};

// get all Product
export const getAllProducts = async () => {
  const product = await Product.find();

  return product;
};

// check product is exist
export const checkIsExistProduct = async (id) => {
  const product = await Product.findById({ _id: id });

  return product;
};

// update Product
export const updateProductService = async (id, body) => {
  const product = await Product.findByIdAndUpdate({ _id: id }, body, { new: true });
  return product;
};

export const deleteProductService = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  return product;
};

// get Product by id
export const getProductByIdService = async (id) => {
  const product = await Product.findById({ _id: id });

  return product;
};
