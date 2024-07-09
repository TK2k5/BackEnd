import Cart from '../models/cart.model.js';

export const cartService = {
  // get carts by userId
  getCartsByUserId: async (userId) => {
    return Cart.findOne({ userId });
  },
  // createCart
  createCart: async (userId, carts) => {
    const newCart = new Cart({
      userId,
      carts,
    });

    return newCart.save();
  },
};
