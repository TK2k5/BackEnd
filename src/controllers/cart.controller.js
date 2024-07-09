import { HTTP_STATUS } from '../common/http-status.common.js';
import { cartService } from '../services/cart.service.js';
import { checkUserExist } from '../services/user.service.js';
import { productService } from '../services/product.service.js';

export const cartController = {
  // add to cart
  addCart: async (req, res) => {
    const body = req.body;
    const { userId, ...product } = body;

    // check user tồn tại hay không
    const userExist = await checkUserExist(userId);
    if (!userExist) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: 'User not found',
        success: false,
      });
    }
    // check product tồn tại hay không
    const productExist = await productService.getProductById(product.productId);
    if (!productExist) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Product not found',
        success: false,
      });
    }

    // lấy giỏ hàng của user
    const result = await cartService.getCartsByUserId(userId);
    if (!result) {
      // tạo mới giỏ hàng
      const newCart = await cartService.createCart(userId, []);

      // thêm sản phẩm vào giỏ hàng
      newCart.carts.push(product);

      // tính tổng tiền
      const total =
        productExist.sale > 0
          ? product.quantity * (productExist.price - productExist.sale)
          : product.quantity * productExist.price;

      newCart.total = total;
      await newCart.save();

      return res.status(HTTP_STATUS.OK).json({
        message: 'Add to cart successfully',
        success: true,
        data: newCart,
      });
    }
  },
};
