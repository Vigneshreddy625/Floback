import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
axios.defaults.baseURL = API_URL;

export const getAvailableCoupons = createAsyncThunk(
  "fetch/availableCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/cart/coupons`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch coupons failed"
      );
    }
  }
);

export const validateCoupon = createAsyncThunk(
  "coupon/validate",
  async (couponCode, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/v1/cart/validate-coupon`, {
        code: couponCode
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Coupon validation failed"
      );
    }
  }
);

export const applyCoupon = createAsyncThunk(
  "coupon/apply",
  async (couponCode, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/v1/cart/apply-promo`, {
        code: couponCode
      });
      if (response.data.success) {
        toast.success(`Coupon applied! You saved ₹${response.data.savings}`);
      }
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to apply coupon";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const removeCoupon = createAsyncThunk(
  "coupon/remove",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/v1/cart/remove-promo`);
      if (response.data.success) {
        toast.success("Coupon removed successfully");
      }
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to remove coupon";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  availableCoupons: [],
  appliedCoupon: null,
  currentSubtotal: 0,
  totalSavings: 0,
  loading: false,
  validatingCoupon: false,
  applyingCoupon: false,
  removingCoupon: false,
  error: null,
  validationResult: null,
  lastValidatedCode: null
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearValidationResult: (state) => {
      state.validationResult = null;
      state.lastValidatedCode = null;
    },
    resetCouponState: (state) => {
      return { ...initialState };
    },
    updateSubtotal: (state, action) => {
      state.currentSubtotal = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAvailableCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAvailableCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.availableCoupons = action.payload.coupons || [];
        state.currentSubtotal = action.payload.currentSubtotal || 0;
        state.appliedCoupon = action.payload.appliedCoupon || null;
        state.totalSavings = action.payload.totalSavings || 0;
      })
      .addCase(getAvailableCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(validateCoupon.pending, (state) => {
        state.validatingCoupon = true;
        state.error = null;
        state.validationResult = null;
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        state.validatingCoupon = false;
        state.validationResult = action.payload;
        state.lastValidatedCode = action.payload.coupon?.code || null;
        
        if (action.payload.valid && action.payload.coupon) {
          const existingCoupon = state.availableCoupons.find(
            c => c.code === action.payload.coupon.code
          );
          if (!existingCoupon) {
            state.availableCoupons.unshift({
              ...action.payload.coupon,
              id: Date.now()
            });
          }
        }
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        state.validatingCoupon = false;
        state.error = action.payload;
        state.validationResult = { valid: false, message: action.payload };
      })
      
      .addCase(applyCoupon.pending, (state) => {
        state.applyingCoupon = true;
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.applyingCoupon = false;
        
        if (action.payload.success) {
          state.appliedCoupon = action.payload.appliedCoupon;
          state.totalSavings = action.payload.totalSavings || 0;
          state.currentSubtotal = action.payload.cart?.subtotal || state.currentSubtotal;
          
          state.availableCoupons = state.availableCoupons.map(coupon => ({
            ...coupon,
            isApplied: coupon.code === action.payload.appliedCoupon?.code
          }));
        }
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.applyingCoupon = false;
        state.error = action.payload;
      })
      
      .addCase(removeCoupon.pending, (state) => {
        state.removingCoupon = true;
        state.error = null;
      })
      .addCase(removeCoupon.fulfilled, (state, action) => {
        state.removingCoupon = false;
        
        if (action.payload.success) {
          state.appliedCoupon = null;
          state.totalSavings = 0;
          state.currentSubtotal = action.payload.cart?.subtotal || state.currentSubtotal;
          
          state.availableCoupons = state.availableCoupons.map(coupon => ({
            ...coupon,
            isApplied: false
          }));
        }
      })
      .addCase(removeCoupon.rejected, (state, action) => {
        state.removingCoupon = false;
        state.error = action.payload;
      });
  }
});

export const {
  clearError,
  clearValidationResult,
  resetCouponState,
  updateSubtotal
} = couponSlice.actions;

export const selectCouponState = (state) => state.coupon;
export const selectAvailableCoupons = (state) => state.coupon.availableCoupons;
export const selectAppliedCoupon = (state) => state.coupon.appliedCoupon;
export const selectCouponLoading = (state) => state.coupon.loading;
export const selectCouponError = (state) => state.coupon.error;
export const selectValidationResult = (state) => state.coupon.validationResult;
export const selectTotalSavings = (state) => state.coupon.totalSavings;
export const selectCurrentSubtotal = (state) => state.coupon.currentSubtotal;

export const selectAppliedCoupons = (state) => 
  state.coupon.availableCoupons.filter(coupon => coupon.isApplied);

export const selectAvailableForUseCoupons = (state) => 
  state.coupon.availableCoupons.filter(coupon => !coupon.isApplied);

export const selectIsValidatingCoupon = (state) => state.coupon.validatingCoupon;
export const selectIsApplyingCoupon = (state) => state.coupon.applyingCoupon;
export const selectIsRemovingCoupon = (state) => state.coupon.removingCoupon;

export const selectCouponOperationInProgress = (state) => 
  state.coupon.loading || 
  state.coupon.validatingCoupon || 
  state.coupon.applyingCoupon || 
  state.coupon.removingCoupon;

export default couponSlice.reducer;