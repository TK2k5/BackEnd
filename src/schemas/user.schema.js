import mongoose from "mongoose";
import mongoosepaginate from "mongoose-paginate-v2";

export const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "Customer",
      enum: ["Customer", "Admin", "Staff"],
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.plugin(mongoosepaginate);
const User = mongoose.model("User", userSchema);

export default User;
