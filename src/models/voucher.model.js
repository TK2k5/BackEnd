import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const validateDateFormat = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(date.toISOString().substring(0, 10));
};

const validateCode = (code) => {
  const regex = /^COL\d{10}$/;
  return regex.test(code);
};

const VoucherSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      validate: [validateCode, 'Định dạng sai. Định dạng đúng là COL1234567890'],
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      default: 'active',
      enum: ['active', 'inactive'],
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
    },
    startDate: {
      type: Date,
      validate: [validateDateFormat, 'Định dạng sai. Định dạng đúng là YYYY-MM-DD'],
    },
    endDate: {
      type: Date,
      validate: [validateDateFormat, 'Định dạng sai. Định dạng đúng là YYYY-MM-DD'],
    },
    voucherPrice: {
      type: Number,
      default: 0,
    },
    applicablePrice: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

VoucherSchema.plugin(mongoosePaginate);

const Voucher = mongoose.model('Voucher', VoucherSchema);

export default Voucher;
