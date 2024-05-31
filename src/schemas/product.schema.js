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
    },
    descProduct: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Product = new mongoose.model("Product", productSChema);

export default Product;
