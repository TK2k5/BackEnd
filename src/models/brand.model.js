import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const brandSchema = new mongoose.Schema(
  {
    nameBrand: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

brandSchema.plugin(mongoosePaginate);

const Brand = mongoose.model('brand', brandSchema);

export default Brand;
