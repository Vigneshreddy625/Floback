import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToCartOptimistic } from "../../redux/Cart/cartSlice";
import { toast } from "sonner";

export const useAddToCart = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.cart.loading.add);
  const cart = useSelector((state) => state.cart.cart); // access current cart

  const handleAddToCart = (product) => {
    if (!cart) {
      toast.error("Cart not initialized.");
      return;
    }

    // ✅ Step 1: Optimistically update the UI
    dispatch(addToCartOptimistic(product));

    // ✅ Step 2: Call actual API
    dispatch(addToCart(product._id));
  };

  return { handleAddToCart, loading };
};
