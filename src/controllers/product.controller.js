import { HTTP_STATUS } from "../common/http-status.common.js";
import Product from "../schemas/product.schema.js";

// tạo sản phẩm
export const createProduct = async (req, res) => {
  try {
    const body = req.body; // Lấy dữ liệu từ người dùng gửi lên

    const newProduct = await Product.create(body); // Tạo mới sản phẩm

    if (!newProduct) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Create product failed" });
    }

    return res.status(HTTP_STATUS.CREATED).json({
      message: "Create product succesfully",
      data: newProduct,
    });
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Server is error" });
  }
};

// lấy ra danh sách sản phẩm
export const getProduct = async (req, res) => {
  try {
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
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server is error" });
  }
};

// lấy ra sản phẩm theo id
export const getProductById = async (req, res) => {
  try {
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
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server is error" });
  }
};

// xóa sản phẩm
export const deleteProduct = async (req, res) => {
  try {
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
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server is error" });
  }
};

// method PUT: cập nhật sản phẩm theo id
export const updateProductById = async (req, res) => {
  try {
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
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: " Internal sever is error" });
  }
};
