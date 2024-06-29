import Brand from '../models/brand.model.js';
import { HTTP_STATUS } from '../common/http-status.common.js';
import { checkIsId } from '../middlewares/check-id.middleware.js';
import { createBrandValidate } from '../validations/brand.validation.js';

/* Create brand */
export const createBrand = async (req, res) => {
  const body = req.body;

  // Validate
  const { error } = createBrandValidate.validate(body, {
    abortEarly: false,
  });

  if (error) {
    const message = error.details.map((item) => ({
      message: item.message,
      name: item.context.label,
    }));

    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: message,
      success: false,
    });
  }

  const brand = await Brand.create(body);

  if (!brand) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Cannot create brand',
      success: false,
    });
  }

  return res.status(HTTP_STATUS.OK).json({
    message: 'Create brand successfully',
    success: true,
    data: brand,
  });
};

/* Get all brand */
export const getAllBrand = async (req, res) => {
  const params = req.query;
  const { _page = 1, _limit = 10, q } = params;
  const options = {
    page: _page,
    limit: _limit,
  };

  const query = q
    ? {
        $and: [
          {
            $or: [
              { nameBrand: { $regex: new RegExp(q), $options: 'i' } },
              { country: { $regex: new RegExp(q), $options: 'i' } },
            ],
          },
        ],
      }
    : {};

  const brands = await Brand.paginate(query, options);

  if (!brands) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Cannot get brand',
      success: false,
    });
  }

  return res.status(HTTP_STATUS.OK).json({
    message: 'Get brand successfully',
    success: true,
    data: brands,
  });
};

/* Delete brand */
export const deleteBrand = async (req, res) => {
  const id = req.params.brandId;

  if (!checkIsId(id)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Id is not valid',
      success: false,
    });
  }

  const brand = await Brand.findByIdAndDelete(id);

  if (!brand) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Cannot delete brand',
      success: false,
    });
  }

  return res.status(HTTP_STATUS.OK).json({
    message: 'Delete brand successfully',
    success: true,
    data: brand,
  });
};

/* Get one brand */
export const getOneBrand = async (req, res) => {
  const id = req.params.brandId;

  if (!checkIsId(id)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Id is not valid',
      success: false,
    });
  }

  const brand = await Brand.findById(id);

  if (!brand) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Cannot get brand',
      success: false,
    });
  }

  return res.status(HTTP_STATUS.OK).json({
    message: 'Get brand successfully',
    success: true,
    data: brand,
  });
};

/* Update brand */
export const updateBrand = async (req, res) => {
  const id = req.params.brandId;
  const body = req.body;

  if (!checkIsId(id)) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Id is not valid',
      success: false,
    });
  }

  const brand = await Brand.findByIdAndUpdate(id, body, { new: true });

  if (!brand) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Cannot update brand',
      success: false,
    });
  }

  return res.status(HTTP_STATUS.OK).json({
    message: 'Update brand successfully',
    success: true,
    data: brand,
  });
};
