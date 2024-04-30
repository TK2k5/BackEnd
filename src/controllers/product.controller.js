import { HTTP_STATUS } from "../common/http-status.common.js";
import Product from "../schemas/product.schema.js";
import { handleAsync } from "../utils/trycatch.js";

// tạo sản phẩm
export const createProduct = handleAsync(async (req, res) => {
  const body = req.body; // Lấy dữ liệu từ người dùng gửi lên

  const newProduct = await Product.create(body); // Tạo mới sản phẩm

  if (!newProduct) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Create product failed" });
  }

  return res.status(HTTP_STATUS.CREATED).json({
    message: "Create product successfully",
    data: newProduct,
  });
});

// lấy ra danh sách sản phẩm
export const getProduct = handleAsync(async (req, res) => {
  const products = await Product.find();

  if (!products) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "Get product failed" });
  }

  return res.status(HTTP_STATUS.OK).json({
    message: "Get product sucessfully",
    data: products,
  });
});

// lấy ra sản phẩm theo id
export const getProductById = handleAsync(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Get product fail",
    });
  }
  return res
    .status(HTTP_STATUS.OK)
    .json({ message: "Get product succesfully", data: product });
});

// xóa sản phẩm
export const deleteProduct = handleAsync(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: "Delete product fail",
    });
  }
  return res
    .status(HTTP_STATUS.OK)
    .json({ message: "Delete product succesfully", data: product });
});

// method PUT: cập nhật sản phẩm theo id
export const updateProductById = handleAsync(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = await Product.findByIdAndUpdate(id, body, { new: true });

  if (!product) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: "update product failed" });
  }

  return res.status(HTTP_STATUS.Ok).json({
    message: "update product sucessfully",
    data: product,
  });
});
