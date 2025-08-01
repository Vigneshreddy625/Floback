import { Order } from '../models/orders.model.js';
import { Product } from '../models/product.model.js';
import { Fabric } from '../models/fabricc.model.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';
import { Cart } from '../models/cart.model.js';

export const clearCartForOrder = async (userId) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new Error('Cart not found for user');
  }

  cart.items = [];
  cart.subtotal = 0;
  cart.total = 0;
  cart.shippingMethod = 'Standard'; 

  await cart.save();
};

export const placeOrder = async (req, res) => {
  const {
    user,
    items,
    subtotal,
    tax,
    total,
    shipping,
    paymentMethod,
    shippingAddress: clientShippingAddress,
  } = req.body;

  if (
    !user ||
    !items ||
    items.length === 0 ||
    subtotal === undefined ||
    tax === undefined ||
    total === undefined ||
    shipping === undefined ||
    !clientShippingAddress ||
    !clientShippingAddress.name ||
    !clientShippingAddress.mobile ||
    !clientShippingAddress.locality ||
    !clientShippingAddress.street ||
    !clientShippingAddress.city ||
    !clientShippingAddress.district ||
    !clientShippingAddress.state ||
    !clientShippingAddress.country ||
    !clientShippingAddress.postalCode
  ) {
    return res.status(400).json({
      message: 'Missing required order details or shipping address fields.',
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const orderItems = items.map((item) => ({
      itemType: item.itemType,
      itemId: item.itemId,
      quantity: item.quantity,
      price: item.price,
      title: item.title,
      imageUrl: item.imageUrl,
      color: item.color,
      size: item.size,
      material: item.material,
      pattern: item.pattern,
    }));

    const newOrder = new Order({
      user: user,
      items: orderItems,
      subtotal: subtotal,
      tax: tax,
      total: total,
      shipping: shipping,
      paymentMethod: paymentMethod || 'Cash on Delivery',
      shippingAddress: clientShippingAddress,
      orderStatus: 'Pending',
    });

    const userId = user._id || user.id;

    const savedOrder = await newOrder.save({ session });

    await session.commitTransaction();
    session.endSession();

    await clearCartForOrder(user);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order: savedOrder.toObject({ getters: true, virtuals: false }),
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error('Error placing order:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: 'Order ID collision, please try again.' });
    }

    res
      .status(500)
      .json({ message: 'Failed to place order. Please try again later.' });
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const allowedStatuses = [
      'Pending',
      'Processing',
      'Shipped',
      'Delivered',
      'Cancelled',
      'Returned',
      'Failed',
    ];

    if (!allowedStatuses.includes(orderStatus)) {
      throw new ApiError(400, 'Invalid order status.');
    }

    const order = await Order.findById(orderId);

    if (!order) {
      throw new ApiError(404, 'Order not found.');
    }

    if (['Delivered', 'Cancelled'].includes(order.orderStatus)) {
      throw new ApiError(400, `Cannot update a ${order.orderStatus} order.`);
    }

    order.orderStatus = orderStatus;

    if (orderStatus === 'Shipped') {
      order.shippedAt = new Date();
    } else if (orderStatus === 'Delivered') {
      order.deliveredAt = new Date();
    } else if (orderStatus === 'Cancelled') {
      order.cancelledAt = new Date();
    }

    await order.save();

    return res
      .status(200)
      .json(new ApiResponse(200, order, 'Order status updated successfully.'));
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: User not authenticated.',
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { user: userId };
    if (req.query.status) {
      const allowedStatuses = [
        'Pending',
        'Processing',
        'Shipped',
        'Delivered',
        'Cancelled',
        'Returned',
        'Failed', // ADDED: Missing status
      ];
      if (allowedStatuses.includes(req.query.status)) {
        filter.orderStatus = req.query.status;
      } else {
        return res.status(400).json({
          success: false,
          message: `Invalid order status: ${req.query.status}. Allowed values are: ${allowedStatuses.join(', ')}.`,
        });
      }
    }

    const sort = { createdAt: -1 };

    const orders = await Order.find(filter)
      .populate({
        path: 'user',
        select: 'username email',
      })
      .populate({
        path: 'items.itemId', // CORRECTED: Use itemId instead of productId
        select: 'name price mainImageUrl', // CORRECTED: Use correct field names
      })
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const totalOrders = await Order.countDocuments(filter);
    const totalPages = Math.ceil(totalOrders / limit);

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No orders found for this user matching the criteria.',
        data: [],
        pagination: {
          totalOrders: 0,
          currentPage: page,
          totalPages: 0,
          limit: limit,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Orders fetched successfully.',
      data: orders,
      pagination: {
        totalOrders: totalOrders,
        currentPage: page,
        totalPages: totalPages,
        limit: limit,
      },
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);

    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred while fetching orders.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const {
      search = '',
      status = '',
      amountRange = '',
      sortBy = 'date',
      page = 1,
      limit = 20,
    } = req.query;

    let filter = {};

    if (search) {
      filter.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { 'items.title': { $regex: search, $options: 'i' } },
        { 'shippingAddress.name': { $regex: search, $options: 'i' } },
        { 'shippingAddress.mobile': { $regex: search, $options: 'i' } },
      ];
    }

    if (status && status !== 'any') {
      const statusMap = {
        paid: 'Processing',
        delivered: 'Delivered',
        completed: 'Delivered',
        pending: 'Pending',
        cancelled: 'Cancelled', 
        shipped: 'Shipped', 
        returned: 'Returned', 
        failed: 'Failed', 
      };
      filter.orderStatus = statusMap[status] || status;
    }

    if (amountRange && amountRange !== 'any') {
      switch (amountRange) {
        case '0-99':
          filter.total = { $gte: 0, $lte: 99 };
          break;
        case '100-1500':
          filter.total = { $gte: 100, $lte: 1500 };
          break;
        case '1501+':
          filter.total = { $gte: 1501 };
          break;
      }
    }

    let sort = {};
    switch (sortBy) {
      case 'amount':
        sort = { total: -1 };
        break;
      case 'date':
      default:
        sort = { createdAt: -1 };
        break;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const orders = await Order.find(filter)
      .populate('user')
      .populate('items.itemId') 
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    const total = await Order.countDocuments(filter);
    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit),
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1,
      },
      filters: {
        search,
        status,
        amountRange,
        sortBy,
      },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};
