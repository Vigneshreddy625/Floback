import mongoose, { Schema } from 'mongoose';
import { nanoid } from 'nanoid';

const addressSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['home', 'work', 'other'],
      required: true,
    },
    name: { type: String, required: true, trim: true },
    mobile: { type: Number, required: true, trim: true },
    locality: { type: String, required: true, trim: true },
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    postalCode: { type: Number, required: true, trim: true },
  },
  { _id: false }
);

const orderItemSchema = new Schema(
  {
    itemType: {
      type: String,
      required: true,
      enum: ['Product', 'Fabric'],
    },
    itemId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'itemType', 
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    color: {
      type: String,
      trim: true,
    },
    size: {
      type: String,
      trim: true,
    },
    material: {
      type: String,
      trim: true,
    },
    pattern: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      default: () => `ORD-${nanoid(8)}`,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: 'Order must contain at least one item.',
      },
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    tax: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    shipping: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    paymentMethod: {
      type: String,
      enum: ['Cash on Delivery'],
      required: true,
      default: 'Cash on Delivery',
    },
    shippingAddress: {
      type: addressSchema,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: [
        'Pending',
        'Processing',
        'Shipped',
        'Delivered',
        'Cancelled',
        'Returned',
        'Failed',
      ],
      default: 'Pending',
    },
    shippedAt: Date,
    deliveredAt: Date,
    cancelledAt: Date,
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model('Order', orderSchema);