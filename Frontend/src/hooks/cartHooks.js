// hooks/useCartActions.js
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/Cart/cartSlice";

export function cartHooks() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = async (item) => {
    console.log(cartItems);
    console.log("item adding to cart");
    try {
      dispatch(
        addItemToCart({
          itemId: item._id,
          itemType: item.itemType,
          quantity: 1,
        })
      );
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

  return {
    handleAddToCart,
    cartItems,
  };
}
