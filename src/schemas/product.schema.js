import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
productSChema.plugin(mongoosePaginate);

const Product = new mongoose.model("Product", productSChema);

export default Product;
