import { HTTP_STATUS } from '../common/http-status.common.js';
import { orderService } from '../services/order.service.js';

export const orderController = {
  optionOrder: (params) => {
    const { _limit = 10, _page = 1, q, populate, ...rest } = params;

    let populateDefault = [
      { path: 'products.productId', select: '_id nameProduct desc images' },
      { path: 'userId', select: '_id email' },
    ];
    if (populate) {
      if (Array.isArray(populate)) {
        populateDefault = [...populateDefault, ...populate];
      } else {
        populateDefault.push(populate);
      }
    }
    let query = {};
    if (q) {
      query = {
        $and: [
          {
            $or: [{ nameProduct: { $regex: new RegExp(q), $options: 'i' } }],
          },
        ],
      };
    }
    // filter status
    if (rest.status) {
      query = {
        ...query,
        status: rest.status,
      };
    }

    const option = {
      limit: parseInt(_limit),
      page: parseInt(_page),
      populate: populateDefault,
    };
    return { option, query };
  },
  // create order
  createOrder: async (req, res) => {
    const { _id } = req.user;

    // check userId có trùng nhau hay không
    if (_id !== req.body.userId) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({ message: 'Unauthorized!', success: false });
    }

    // thêm mới đơn hàng
    const newOrder = await orderService.createOrder(req.body);

    if (!newOrder) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Create category faild!', success: false });
    }

    return res.status(HTTP_STATUS.CREATED).json({ message: 'Create category success!', success: true });
  },

  // get order by id
  getOrdersByUserId: async (req, res) => {
    const { _id } = req.user;
    const { userId } = req.params;

    // check userId có trùng nhau hay không
    if (_id !== userId) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({ message: 'No Permission!', success: false });
    }

    // lấy danh sách đơn hàng theo userId
    const orders = await orderService.getOrdersByUserId(_id);

    if (!orders) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Order not found!', success: false });
    }

    return res.status(HTTP_STATUS.OK).json({ message: 'Get order success!', success: true, data: orders });
  },

  // get all orders
  getAllOrders: async (req, res) => {
    const { _limit = 10, _page = 1, q, status } = req.query;
    const { option, query } = orderController.optionOrder({
      _limit,
      _page,
      q,
      status,
    });

    // startDate: 2024-07-16T14:36:52.972+00:00
    // endDate: 2024-07-16T14:36:52.972+00:00
    // datediff = endDate - startDate => dayjs(endDate).diff(dayjs(startDate), 'day')
    // tiềm kieems trong db createdAt >= startDate && createdAt <= endDate

    const orders = await orderService.getAllOrders(query, option);

    if (!orders) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Order not found!', success: false });
    }

    return res.status(HTTP_STATUS.OK).json({ message: 'Get order success!', success: true, ...orders });
  },
};

// date: dayjs, moment, date-fns
// tìm kiếm đơn hàng dựa vào startDate, endDate & email
