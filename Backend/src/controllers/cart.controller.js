import { Cart } from '../models/cart.model.js';
import { Product } from '../models/product.model.js';
import { Fabric } from '../models/fabricc.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import mongoose from 'mongoose';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getItemModel = (itemType) => {
  if (typeof itemType !== 'string') {
    throw new ApiError(400, `Invalid item type format: ${typeof itemType}`);
  }

  switch (itemType) {
    case 'Product':
      return Product;
    case 'Fabric':
      return Fabric;
    default:
      throw new ApiError(400, `Invalid item type: ${itemType}`);
  }
};

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

export const addItemToCart = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: User not found in request.' });
    }

    const { itemType, itemId, quantity } = req.body;

    if (!userId || !itemType || !itemId || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!['Product', 'Fabric'].includes(itemType)) {
      return res.status(400).json({ message: 'Invalid item type' });
    }

    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const itemModel = getItemModel(itemType);
    const item = await itemModel.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: `${itemType} not found` });
    }

    let cart = await getOrCreateCart(userId);

    const existingItemIndex = cart.items.findIndex(
      (cartItem) =>
        cartItem.itemType === itemType && cartItem.itemId.equals(itemId)
    );

    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        itemType,
        itemId,
        quantity,
        name: item.name,
        mainImageUrl: item.mainImageUrl,
        price: item.price,
      });
    }

    cart.subtotal = cart.items.reduce(
      (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
      0
    );

    cart.tax = cart.subtotal * 0.08;
    cart.shipping = cart.subtotal > 100 ? 0 : 10;
    cart.total = cart.subtotal + cart.tax + cart.shipping;

    await cart.save();

    return res.status(200).json({
      message: 'Item added to cart successfully',
      cart,
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const removeItemFromCart = asyncHandler(async (req, res, next) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, 'Unauthorized: User not found in request.');
  }

  const { itemId, itemType } = req.params;
  const { quantityToRemove } = req.body;

  if (!itemId || !itemType) {
    throw new ApiError(
      400,
      'Item ID and Item Type are required to remove from cart.'
    );
  }

  if (!isValidObjectId(itemId)) {
    throw new ApiError(400, 'Invalid Item ID format.');
  }

  if (
    quantityToRemove !== undefined &&
    (typeof quantityToRemove !== 'number' || quantityToRemove <= 0)
  ) {
    throw new ApiError(400, 'Quantity to remove must be a positive number.');
  }

  try {
    let cart = await getOrCreateCart(userId);

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.itemId.toString() === itemId.toString() &&
        item.itemType === itemType
    );

    if (itemIndex === -1) {
      throw new ApiError(404, 'Item not found in cart.');
    }

    if (quantityToRemove !== undefined) {
      cart.items[itemIndex].quantity -= quantityToRemove;
      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
    } else {
      cart.items.splice(itemIndex, 1);
    }

    cart.subtotal = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    cart.tax = cart.subtotal * 0.08;
    cart.shipping = cart.subtotal > 100 ? 0 : 10;
    cart.total = cart.subtotal + cart.tax + cart.shipping;

    await cart.save();

    return res
      .status(200)
      .json(new ApiResponse(200, cart, 'Item removed from cart successfully.'));
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      'Internal server error while removing item from cart.',
      error
    );
  }
});

export const clearCart = asyncHandler(async (req, res, next) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, 'Unauthorized: User not found in request.');
  }

  try {
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [], subtotal: 0, shipping: 0, tax: 0, total: 0 } },
      { new: true, upsert: true }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, cart, 'Cart cleared successfully.'));
  } catch (error) {
    throw new ApiError(
      500,
      'Internal server error while clearing cart.',
      error
    );
  }
});

export const getUserCart = asyncHandler(async (req, res, next) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(
      401,
      'Unauthorized: User ID not found in request (check token/middleware).'
    );
  }

  try {
    let cart = await getOrCreateCart(userId);

    const cartDetails = {
      _id: cart._id,
      user: cart.user,
      items: cart.items.map((cartItem) => ({
        _id: cartItem._id,
        itemId: cartItem.itemId,
        itemType: cartItem.itemType,
        quantity: cartItem.quantity,
        currentPrice: cartItem.price,
        currentTitle: cartItem.name,
        currentImageUrl: cartItem.mainImageUrl,
        isAvailable: true,
      })),
      subtotal: cart.subtotal,
      shipping: cart.shipping,
      tax: cart.tax,
      total: cart.total,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, cartDetails, 'Cart details retrieved successfully.'));
  } catch (error) {
    if (error.name === 'CastError' && error.path === 'user') {
      throw new ApiError(400, 'Invalid user ID format provided.', error);
    }
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      'Internal server error while retrieving user cart.',
      error
    );
  }
});
