import Order from '../models/order.model.js';

export const orderService = {
  // create Order
  createOrder: async (body) => {
    return await Order.create(body);
  },

  // get Orders By User Id
  getOrdersByUserId: async (userId) => {
    return await Order.find({ userId }).populate([
      { path: 'products.productId', select: '_id nameProduct desc images' },
      { path: 'userId', select: '_id email' },
    ]);
  },

  // get all orders
  getAllOrders: async (query, option) => {
    return await Order.paginate(query, option);
  },
};
