import { HTTP_STATUS } from '../common/http-status.common.js';
import { TypeRole } from '../common/type.common.js';
import { cartService } from '../services/cart.service.js';
import { checkUserExist } from '../services/user.service.js';
import { productService } from '../services/product.service.js';

export const cartController = {
  // total calculate
  totalCalculate: (productExist, product) => {
    const total =
      productExist.sale > 0
        ? product.quantity * (productExist.price - productExist.sale)
        : product.quantity * productExist.price;

    return total;
  },

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
    const result = await cartService.getCarts(userId);
    if (!result) {
      // tạo mới giỏ hàng
      const newCart = await cartService.createCart(userId, []);

      // thêm sản phẩm vào giỏ hàng
      newCart.carts.push(product);

      // tính tổng tiền
      const total = cartController.totalCalculate(productExist, product);

      newCart.total = total;
      await newCart.save();

      return res.status(HTTP_STATUS.OK).json({
        message: 'Add to cart successfully',
        success: true,
      });
    }

    // lấy giỏ hàng của user nếu user đã có giỏ hàng
    const { carts } = result;

    // check product tồn tại trong giỏ hàng hay chưa
    const productExitInCart = carts.filter((item) => item.productId.toString() === product.productId);

    // nếu tồn tại rồi thì cập nhật số lượng
    if (productExitInCart) {
      for (var i = 0; i < productExitInCart.length; i++) {
        // check color & size có trùng không
        if (productExitInCart[i].color === product.color && productExitInCart[i].size === product.size) {
          productExitInCart[i].quantity += product.quantity;
          // tính tổng tiền
          const total = cartController.totalCalculate(productExist, productExitInCart[i]);
          result.total = total;
          await result.save();
          return res.status(HTTP_STATUS.OK).json({
            message: 'Add to cart successfully',
            success: true,
          });
        }
      }

      // nếu không trùng thì thêm mới vào giỏ hàng
      if (productExitInCart.color !== product.color || productExitInCart.size !== product.size) {
        // thêm sản phẩm vào giỏ hàng
        carts.push(product);

        // tính tổng tiền
        const total = cartController.totalCalculate(productExist, product);

        result.total += total;
        await result.save();

        return res.status(HTTP_STATUS.OK).json({
          message: 'Add to cart successfully',
          success: true,
        });
      }
    }

    // nếu chưa chưa tồn tại thêm mới vào giỏ hàng
    else {
      // thêm sản phẩm vào giỏ hàng
      carts.push(product);

      // tính tổng tiền
      const total = cartController.totalCalculate(productExist, product);

      result.total += total;
      await result.save();

      return res.status(HTTP_STATUS.OK).json({
        message: 'Add to cart successfully',
        success: true,
      });
    }
  },

  // get cart by userId
  getCartByUserId: async (req, res) => {
    const { _id, role } = req.user;
    const params = req.query;
    const { statusUser } = params;

    let query = {};
    // kiểm tra role của user vaf check params có là 1 obejct rỗng hay không
    if (role !== TypeRole.ADMIN && Object.keys(params).length > 0) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        message: 'You do not have permission to access',
        success: false,
      });
    }

    if (statusUser) {
      query = { status: statusUser };
    }

    query = { ...query, userId: _id };

    // lấy giỏ hàng của user
    const result = await cartService.getCartsByUserId(query, params);
    if (!result) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: 'Cart not found',
        success: false,
      });
    }

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get cart successfully',
      success: true,
      data: result,
    });
  },
};
