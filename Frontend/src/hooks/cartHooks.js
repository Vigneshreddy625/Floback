// hooks/useCartActions.js
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/Cart/cartSlice";

export function cartHooks() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const handleAddToCart = async (item) => {
    console.log("=== DEBUG: Add to Cart ===");
    console.log("Full item object:", item);
    console.log("item._id:", item._id);
    console.log("item.itemType:", item.type);
    console.log("Current cart items:", cartItems);

    // Validate required fields before dispatching
    if (!item._id) {
      console.error("Missing item._id");
      return;
    }

    if (!item.type) {
      console.error("Missing item.itemType");
      return;
    }

    // Ensure itemType is exactly 'Product' or 'Fabric'
    let itemType = item.type;
    
    // Handle different possible formats
    if (typeof itemType === 'string') {
      // Capitalize first letter, make rest lowercase
      itemType = itemType.charAt(0).toUpperCase() + itemType.slice(1).toLowerCase();
    }

    // Validate itemType
    if (!['Product', 'Fabric'].includes(itemType)) {
      console.error(`Invalid itemType: "${itemType}". Must be "Product" or "Fabric"`);
      return;
    }

    const payload = {
      itemId: item._id,
      itemType: itemType,
      quantity: 1,
    };

    console.log("Dispatching payload:", payload);

    try {
      const result = await dispatch(addItemToCart(payload));
      console.log("Add to cart result:", result);
    } catch (error) {
      console.error("Failed to add item to cart", error);
    }
  };

  return {
    handleAddToCart,
    cartItems,
  };
}