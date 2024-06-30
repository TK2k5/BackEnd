import Brand from '../models/brand.model.js';

// create brand
export const createBrandService = async (body) => {
  const newBrand = await Brand.create(body);

  return newBrand;
};

// get all brand
export const getAllBrand = async () => {
  const brands = await Brand.find();

  return brands;
};

// get one brand
export const getBrandByIdService = async (brandId) => {
  const brand = await Brand.findById({ _id: brandId });

  return brand;
};

// update brand
export const updateBrandService = async (brandId, body) => {
  const brand = await Brand.findByIdAndUpdate({ _id: brandId }, body, { new: true });

  return brand;
};
