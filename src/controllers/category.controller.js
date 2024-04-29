import Category from "../schemas/category.schema.js";
import { HTTP_STATUS } from "../common/http-status.common.js";

// tạo danh mục
export const createCategory = async (req, res) => {
  try {
    const body = req.body;
    const category = await Category.create(body);

    if (!category) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "create category failed" });
    }

    return res.status(HTTP_STATUS.CREATED).json({
      message: "create category successfully",
      data: category,
    });
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server is error" });
  }
};

// lấy ra danh sách danh mục
export const getCategoty = async (req, res) => {
  try {
    const category = await Category.find();

    if (!category) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "get category failed" });
    }

    return res.status(HTTP_STATUS.OK).json({
      message: "get category sucessfully",
      data: category,
    });
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server is error" });
  }
};

// lấy ra danh sách danh mục theo id
export const getCategotyById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "get category failed" });
    }

    return res.status(HTTP_STATUS.OK).json({
      message: "get category sucessfully",
      data: category,
    });
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server is error" });
  }
};

// xóa danh mục
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "delete category failed" });
    }

    return res.status(HTTP_STATUS.OK).json({
      message: "delete category sucessfully",
      data: category,
    });
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server is error" });
  }
};

// cập nhật danh mục
export const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = await Category.findByIdAndUpdate(id, body, { new: true });

    if (!category) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "update category failed" });
    }

    return res.status(HTTP_STATUS.OK).json({
      message: "update category sucessfully",
      data: category,
    });
  } catch (error) {
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server is error" });
  }
};
