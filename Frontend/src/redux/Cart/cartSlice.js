import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

const API_URL = "http://localhost:8000/api/v1";
axios.defaults.baseURL = API_URL;

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ itemType, itemId, quantity = 1 }, { rejectWithValue }) => {
    try {
      console.log("cart is going to get added")
      const response = await axios.post(`/cart/add`, {
        itemType,
        itemId,
        quantity,
      });
      toast.success(response.data.message || "Item added to cart!");
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to add item to cart.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ itemId, itemType, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/cart/update-quantity`, {
        itemId,
        itemType,
        quantity,
      });
      toast.success(response.data.message || "Cart item quantity updated!");
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update cart item quantity.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async ({ itemId, itemType }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/cart/remove/${itemId}/${itemType}`);
      toast.success(response.data.message || "Item removed from cart!");
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to remove item from cart.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/cart`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch cart failed"
      );
    }
  }
);

export const clearUserCart = createAsyncThunk(
  "cart/clearUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/cart/clear`);
      toast.success(response.data.message || "Cart cleared successfully!");
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to clear cart.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
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
    clear: false,
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
        clear: false,
      };
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading.fetch = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading.fetch = false;
        state.cart = action.payload.data || action.payload;
        state.error = null;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error = action.payload;
        state.cart = null; 
      })

      .addCase(addItemToCart.pending, (state) => {
        state.loading.add = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading.add = false;
        state.cart = action.payload.cart;
        state.error = null;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading.add = false;
        state.error = action.payload;
      })

      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading.update = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading.update = false;
        state.cart = action.payload.data || action.payload.cart;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload;
      })

      .addCase(removeItemFromCart.pending, (state) => {
        state.loading.remove = true;
        state.error = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading.remove = false;
        state.cart = action.payload.data || action.payload.cart;
        state.error = null;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading.remove = false;
        state.error = action.payload;
      })

      .addCase(clearUserCart.pending, (state) => {
        state.loading.clear = true;
        state.error = null;
      })
      .addCase(clearUserCart.fulfilled, (state, action) => {
        state.loading.clear = false;
        state.cart = action.payload.data || action.payload.cart;
        state.error = null;
      })
      .addCase(clearUserCart.rejected, (state, action) => {
        state.loading.clear = false;
        state.error = action.payload;
      });
  },
});

export const { resetCartState } = cartSlice.actions; 

export default cartSlice.reducer;

export const selectCart = (state) => state.cart.cart;
export const selectIsCartLoading = (state) => state.cart.loading.fetch;
export const selectIsAddingToCart = (state) => state.cart.loading.add;
export const selectIsUpdatingCart = (state) => state.cart.loading.update;
export const selectIsRemovingFromCart = (state) => state.cart.loading.remove;
export const selectIsClearingCart = (state) => state.cart.loading.clear;
export const selectCartError = (state) => state.cart.error;