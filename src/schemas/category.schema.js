import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const categorySchema = new mongoose.Schema(
  {
    nameCategory: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    productIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
categorySchema.plugin(mongoosePaginate);

const Category = new mongoose.model("Category", categorySchema);

export default Category;
