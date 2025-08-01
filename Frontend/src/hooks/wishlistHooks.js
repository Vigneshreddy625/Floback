// hooks/useWishlistActions.js
import { useWishlist } from "../wishlistContext/useWishlist";

export const useWishlistActions = () => {
  const { addWishlistItem, removeWishlistItem } = useWishlist();

  const handleAddToWishlist = async (item) => {
    try {
      await addWishlistItem({
        itemId: item._id,
        itemType: item.type,
      });
    } catch (error) {
      console.error("Failed to add item to wishlist:", error);
    }
  };

  const handleRemoveWishlistItem = async (item) => {
    try {
      await removeWishlistItem({
        itemId: item.itemId._id,
        itemType: item.itemType,
      });
    } catch (error) {
      console.error("Failed to remove item from wishlist:", error);
    }
  };

  return {
    handleAddToWishlist,
    handleRemoveWishlistItem,
  };
};
