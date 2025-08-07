import { useWishlist } from "../wishlistContext/useWishlist";
import { cartHooks } from "./userCartActions";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/Cart/cartSlice";

export const useWishlistActions = () => {
  const { addWishlistItem, removeWishlistItem } = useWishlist();
  const { handleAddToCart } = cartHooks();
  const dispatch = useDispatch();

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

  const handleMoveToBag = async (item) => {
    try {
      console.log(item);
      const payload = {
      itemId: item.itemId._id,
      itemType: item.itemType,
      quantity: 1,
    };

    console.log(payload)
      await dispatch(addItemToCart(payload));

      await removeWishlistItem({
        itemId: item.itemId._id,
        itemType: item.itemType,
      });
    } catch (error) {
      console.error("Failed to move item to bag:", error);
    }
  };

  return {
    handleAddToWishlist,
    handleRemoveWishlistItem,
    handleMoveToBag,
  };
};
