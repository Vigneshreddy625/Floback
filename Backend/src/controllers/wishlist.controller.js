import mongoose from 'mongoose';
import { Wishlist } from '../models/wishlist.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {Product} from '../models/product.model.js';
import {Fabric} from '../models/fabricc.model.js';
import {asyncHandler} from "../utils/asyncHandler.js"

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const addWishlistItem = asyncHandler(async (req, res) => {
   
    const userId = req.user?._id; 

    if (!userId) {
        throw new ApiError(401, "Unauthorized access: User ID not found from token.");
    }

    const { itemId, itemType } = req.body;

    if (!itemId || !itemType) {
        throw new ApiError(400, "Item ID and item type are required.");
    }

    if (!['Product', 'Fabric'].includes(itemType)) {
        throw new ApiError(400, "Invalid item type. Must be 'Product' or 'Fabric'.");
    }

    let itemDetails;
    if (itemType === 'Product') {
        itemDetails = await Product.findById(itemId);
    } else if (itemType === 'Fabric') {
        itemDetails = await Fabric.findById(itemId);
    } else {
        throw new ApiError(400, 'Invalid item type.');
    }

    if (!itemDetails) {
        throw new ApiError(404, `${itemType} not found.`);
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
        wishlist = new Wishlist({ user: userId, items: [] });
    }

    const alreadyInWishlist = wishlist.items.some(
        (item) =>
            item.itemId.toString() === itemId.toString() &&
            item.itemType === itemType
    );

    if (!alreadyInWishlist) {
        wishlist.items.push({
            itemType: itemType,
            itemId: itemDetails._id,
            nameSnapshot: itemDetails.name,          
            imageSnapshot: itemDetails.mainImageUrl, 
            inStock: itemDetails.inStock !== undefined ? itemDetails.inStock : true,
        });
        await wishlist.save(); 
    }
    return res
        .status(200)
        .json(
            new ApiResponse(200, wishlist, alreadyInWishlist ? "Item already in wishlist." : "Item added to wishlist successfully.")
        );
});

export const removeFromWishlist = async (req, res, next) => {
  try {
    
    const { itemId, itemType } = req.body; 
    const userId = req.user?._id || req.user?.id; 

    if (!userId) {
      return next(new ApiError(401, 'Unauthorized: User not authenticated'));
    }

    
    if (!isValidObjectId(itemId)) {
      return next(new ApiError(400, `Invalid item ID provided. ${itemId}`));
    }

    if (!['Product', 'Fabric'].includes(itemType)) {
      return next(new ApiError(400, 'Invalid item type provided. Must be "Product" or "Fabric".'));
    }

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      return next(new ApiError(404, 'Wishlist not found for this user.'));
    }

    const initialItemCount = wishlist.items.length;
    wishlist.items = wishlist.items.filter(
      (item) => !(item.itemId.toString() === itemId.toString() && item.itemType === itemType)
    );

    if (wishlist.items.length === initialItemCount) {
        return next(new ApiError(404, 'Item not found in wishlist.'));
    }

    await wishlist.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          wishlist.items, 
          'Item removed from wishlist successfully.'
        )
      );
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return next(
      new ApiError(500, 'Failed to remove item from wishlist', error)
    );
  }
};

export const getUserWishlist = async (req, res) => {
    const userId = req.user?._id || req.user?.id;
    if (!userId) {
        return res
            .status(200)
            .json(new ApiResponse(200, { user: null, items: [] }, "User not authenticated, returning an empty wishlist."));
    }

    const wishlist = await Wishlist.findOne({ user: userId }).populate({
        path: 'items.itemId',
        select: 'name price mainImageUrl color material pattern dimensions description collectionId'
    });

    if (!wishlist) {
        return res
            .status(200)
            .json(new ApiResponse(200, { user: userId, items: [] }, "Wishlist not found, returning an empty wishlist."));
    }

    const formattedItems = wishlist.items.map(wishlistItem => {
        const originalItem = wishlistItem.itemId;
        let currentItemTitle = wishlistItem.nameSnapshot;
        let currentItemImageUrl = wishlistItem.imageSnapshot;

        let currentItemColor = null;
        let currentItemSize = null;
        let currentItemMaterial = null;
        let currentItemPattern = null;
        let isItemAvailable = true;

        if (originalItem) {
            currentItemTitle = originalItem.name;
            currentItemImageUrl = originalItem.mainImageUrl;
            currentItemColor = originalItem.color;
            currentItemSize = originalItem.dimensions
                ? `${originalItem.dimensions.length}x${originalItem.dimensions.width}${originalItem.dimensions.unit}`
                : originalItem.size;
            currentItemMaterial = originalItem.material;
            currentItemPattern = originalItem.pattern;
        } else {
            console.warn(
                `Original item not found for wishlist item ID: ${wishlistItem.itemId} (Type: ${wishlistItem.itemType}). It might have been deleted.`
            );
            isItemAvailable = false;
            currentItemTitle = `[Unavailable] ${currentItemTitle || wishlistItem.itemType}`;
            currentItemImageUrl = currentItemImageUrl || '/path/to/unavailable_image.png';
        }

        return {
            _id: wishlistItem._id,
            itemId: wishlistItem.itemId,
            itemType: wishlistItem.itemType,
            currentTitle: currentItemTitle,
            currentImageUrl: currentItemImageUrl,
            currentColor: currentItemColor,
            currentSize: currentItemSize,
            currentMaterial: currentItemMaterial,
            currentPattern: currentItemPattern,
            isAvailable: isItemAvailable,
        };
    });

    return res
        .status(200)
        .json(
            new ApiResponse(200,
                {
                    _id: wishlist._id,
                    user: wishlist.user,
                    items: formattedItems,
                    createdAt: wishlist.createdAt,
                    updatedAt: wishlist.updatedAt,
                },
                "User wishlist fetched successfully."
            )
        );
};