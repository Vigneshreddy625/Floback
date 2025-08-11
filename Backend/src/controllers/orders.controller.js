import { Order } from '../models/orders.model.js';
import { Product } from '../models/product.model.js';
import { Fabric } from '../models/fabricc.model.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';
import { Cart } from '../models/cart.model.js';
import { sendEmail } from '../utils/sendEmail.js';

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

  const validationErrors = [];

  if (!user) {
    validationErrors.push({
      field: 'user',
      message: 'User information is required',
    });
  }

  if (!items) {
    validationErrors.push({
      field: 'items',
      message: 'Items array is required',
    });
  } else if (items.length === 0) {
    validationErrors.push({
      field: 'items',
      message: 'At least one item is required in the order',
    });
  }

  if (subtotal === undefined || subtotal === null) {
    validationErrors.push({
      field: 'subtotal',
      message: 'Subtotal is required',
    });
  }

  if (tax === undefined || tax === null) {
    validationErrors.push({
      field: 'tax',
      message: 'Tax amount is required',
    });
  }

  if (total === undefined || total === null) {
    validationErrors.push({
      field: 'total',
      message: 'Total amount is required',
    });
  }

  if (shipping === undefined || shipping === null) {
    validationErrors.push({
      field: 'shipping',
      message: 'Shipping cost is required',
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

    console.log(user);

    const userId = user._id || user.id;

    const savedOrder = await newOrder.save({ session });

    await session.commitTransaction();
    session.endSession();

    await clearCartForOrder(user);

    try {
      const orderHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; margin: 20px auto;">
          <tr>
            <td style="padding: 40px 30px;">
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #2c3e50; margin-bottom: 20px;">Thank you for your order, ${user.name || 'Customer'}!</h2>
                <p style="font-size: 16px; margin-bottom: 20px;">Your order <strong>#${savedOrder.orderId}</strong> has been placed successfully and is being processed.</p>

                <h3 style="color: #34495e; margin-top: 30px; margin-bottom: 20px; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Order Summary:</h3>
                
                <!-- Order Items -->
                <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
                  ${orderItems
                    .map(
                      (item) => `
                  <tr style="border-bottom: 1px solid #eee;">
                    <td style="width: 80px; padding: 15px 10px;">
                      <img src="${item.imageUrl}" alt="${item.title}" 
                           style="width: 70px; height: 70px; object-fit: cover; border-radius: 5px; display: block;"
                           onerror="this.src='https://via.placeholder.com/70x70?text=Image'">
                    </td>
                    <td style="padding: 15px 10px;">
                      <p style="margin: 0; font-weight: bold; font-size: 16px; color: #2c3e50;">${item.title}</p>
                      <p style="margin: 5px 0; color: #7f8c8d;">Quantity: ${item.quantity} × ₹${(item.price).toFixed(0)}</p>
                      <p style="margin: 5px 0; font-weight: bold; color: #27ae60;">Subtotal: ₹${(item.quantity * item.price).toFixed(0)}</p>
                    </td>
                  </tr>
                  `
                    )
                    .join('')}
                </table>

                <!-- Order Totals -->
                <table width="100%" cellpadding="5" cellspacing="0" style="margin-top: 30px; border-top: 2px solid #ecf0f1;">
                  <tr>
                    <td style="text-align: right; padding: 10px; font-size: 16px;">
                      <strong>Subtotal:</strong>
                    </td>
                    <td style="text-align: right; padding: 10px; font-size: 16px; width: 100px;">
                      ₹${(subtotal).toFixed(0)}
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: right; padding: 10px; font-size: 16px;">
                      <strong>Tax:</strong>
                    </td>
                    <td style="text-align: right; padding: 10px; font-size: 16px;">
                      ₹${(tax).toFixed(0)}
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: right; padding: 10px; font-size: 16px;">
                      <strong>Shipping:</strong>
                    </td>
                    <td style="text-align: right; padding: 10px; font-size: 16px;">
                      ₹${shipping ? shipping : 0}
                    </td>
                  </tr>
                  <tr style="border-top: 2px solid #3498db;">
                    <td style="text-align: right; padding: 15px 10px; font-size: 18px; font-weight: bold; color: #2c3e50;">
                      <strong>Total:</strong>
                    </td>
                    <td style="text-align: right; padding: 15px 10px; font-size: 18px; font-weight: bold; color: #27ae60;">
                      ₹${(total).toFixed(0)}
                    </td>
                  </tr>
                </table>

                <!-- Additional Information -->
                <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
                  <h4 style="margin-top: 0; color: #2c3e50;">What's Next?</h4>
                  <ul style="color: #666; line-height: 1.8;">
                    <li>You'll receive a shipping confirmation email once your order is dispatched</li>
                    <li>Track your order status in your account dashboard</li>
                    <li>Contact our support team if you have any questions</li>
                  </ul>
                </div>

                <!-- Footer -->
                <div style="margin-top: 30px; text-align: center; color: #7f8c8d; font-size: 14px;">
                  <p>Thank you for choosing Floriva!</p>
                  <p>Need help? Contact us at <a href="mailto:support@floriva.com" style="color: #3498db;">support@floriva.com</a></p>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

      await sendEmail({
        to: req.user.email,
        subject: `Order Confirmation - #${savedOrder.orderId}`,
        html: orderHtml,
        name: req.user.fullName || 'Customer',
        fromName: 'Floriva Team',
      });
    } catch (emailErr) {
      console.error('⚠️ Failed to send confirmation email:', emailErr.message);
    }

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
      return res.status(400).json({
        success: false,
        message: 'Database validation error',
        error: error.message,
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Order ID collision, please try again.',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to place order. Please try again later.',
    });
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

    const order = await Order.findById(orderId).populate('user', 'fullName email');

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

     const orderStatusEmail = (order) => `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="padding: 10px 30px;">
          <h2>Order Status Update</h2>
          <p>Hello ${order.user.fullName},</p>
          <p>Your order <strong>#${order.orderId}</strong> status has been updated to <strong>${order.orderStatus}</strong>.</p>
          <h3 style="margin-top: 20px;">Order Details</h3>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Order ID:</strong> ${order.orderId}</li>
            <li><strong>Status:</strong> ${order.orderStatus}</li>
            ${order.shippedAt ? `<li><strong>Shipped At:</strong> ${order.shippedAt.toDateString()}</li>` : ''}
            ${order.deliveredAt ? `<li><strong>Delivered At:</strong> ${order.deliveredAt.toDateString()}</li>` : ''}
            ${order.cancelledAt ? `<li><strong>Cancelled At:</strong> ${order.cancelledAt.toDateString()}</li>` : ''}
          </ul>
          <p>If you have any questions about your order, please contact us by replying to this email.</p>
          <p>Best regards,<br>The Floriva Team</p>
        </div>
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #ddd;">
          <p>&copy; ${new Date().getFullYear()} Floriva. All rights reserved.</p>
        </div>
      </div>
    `;

    try {
      await sendEmail({
        to: order.user.email,
        subject: `Your order is now ${order.orderStatus}`,
        html: orderStatusEmail(order),
      });
    } catch (emailError) {
      console.error('Failed to send Order status email:', emailError);
    }

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
