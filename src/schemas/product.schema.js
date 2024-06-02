import mongoose from "mongoose";

const productSChema = new mongoose.Schema(
  {
    nameProduct: {
      type: String,
      required: true,
    },
    priceProduct: {
      type: Number,
      required: true,
      default: 0,
    },
    descProduct: {
      type: String,
      required: false,
      default: "",
    },
    image: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Product = new mongoose.model("Product", productSChema);

export default Product;
