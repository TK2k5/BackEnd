import * as yup from "yup";

export const productSchema = yup.object({
  name: yup.string().required("Name is required"),
  price: yup.string().required("Price is required"),
  isActive: yup.boolean().required(),
});
