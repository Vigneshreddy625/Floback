import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
axios.defaults.baseURL = API_URL;

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/v1/cart/add`, { productId });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Add to cart failed"
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/v1/cart/update`, {
        productId,
        quantity,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Update quantity failed"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/v1/cart/remove/${productId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Remove item failed"
      );
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/cart`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch cart failed"
      );
    }
  }
);

const initialState = {
  cart: null,
  loading: {
    fetch: false,
    add: false,
    update: false,
    remove: false,
  },
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.cart = null;
      state.loading = {
        fetch: false,
        add: false,
        update: false,
        remove: false,
      };
      state.error = null;
    },
    addToCartOptimistic: (state, action) => {
      if (!state.cart) return;
      const product = action.payload;
      const existing = state.cart.items.find(
        (i) => i.product._id === product._id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.items.push({
          _id: Date.now().toString(),
          product,
          quantity: 1,
        });
      }
    },
    removeFromCartOptimistic: (state, action) => {
      if (!state.cart) return;
      const { productId } = action.payload;
      state.cart.items = state.cart.items.filter(
        (i) => i.product._id !== productId
      );
    },
    updateCartItemOptimistic: (state, action) => {
      if (!state.cart) return;

      const { productId, quantity } = action.payload;
      const item = state.cart.items.find((i) => i.product._id === productId);

      if (item) {
        item.quantity = quantity;
      }

      const subtotal = state.cart.items.reduce(
        (total, item) =>
          total + Number((item.product.price * item.quantity).toFixed(2)),
        0
      );

      const taxRate = 0.07;
      const tax = subtotal * taxRate;

      const shippingCost = subtotal > 1000 ? 0 : 5.99;

      state.cart.shipping = {
        cost: shippingCost,
      };

      const total = Math.max(0, subtotal + tax + shippingCost);

      state.cart.subtotal = parseFloat(subtotal.toFixed(2));
      state.cart.tax = parseFloat(tax.toFixed(2));
      state.cart.total = parseFloat(total.toFixed(2));
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading.fetch = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading.add = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading.add = false;
        state.cart = action.payload;
        toast.success("Item added to cart!");
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading.add = false;
        toast.error(action.payload);
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading.remove = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading.remove = false;
        state.cart = action.payload;
        toast.success("Item removed from cart!");
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading.remove = false;
        state.error = action.payload;
        toast.error(action.payload || "Remove failed");
      })
      .addCase(updateCartItem.pending, (state) => {
        state.loading.update = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading.update = false;
        state.cart = action.payload;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload;
        toast.error(action.payload || "Update failed");
      });
  },
});

export const {
  resetCartState,
  addToCartOptimistic,
  updateCartItemOptimistic,
  removeFromCartOptimistic,
} = cartSlice.actions;
export default cartSlice.reducer;
