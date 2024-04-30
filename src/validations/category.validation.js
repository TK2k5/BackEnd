import * as yup from "yup";

export const categorySchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  image: yup.string().required("Image is required"),
});
