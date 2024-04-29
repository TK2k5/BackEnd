import mongoose from "mongoose";

// Schemas
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
const Product = mongoose.model("Product", productSchema); // Đang lưu vào collection Product

export default Product;
