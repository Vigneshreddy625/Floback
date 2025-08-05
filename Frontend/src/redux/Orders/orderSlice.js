import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = API_BASE_URL
axios.defaults.withCredentials = true;

export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/orders/place`, orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to place order'
      );
    }
  }
);

export const getUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  async ({ page = 1, limit = 10, status = '' } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(status && { status }),
      });

      const response = await axios.get(`${API_BASE_URL}/orders?${params}`, {
        withCredentials : true
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user orders'
      );
    }
  }
);

export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();

      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.search) queryParams.append('search', params.search);
      if (params.status) queryParams.append('status', params.status);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);

      const response = await axios.get(`${API_BASE_URL}/orders/all?${queryParams}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch all orders'
      );
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/orders/update-status/${orderId}`,
        { orderStatus },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update order status'
      );
    }
  }
);

// Initial state
const initialState = {
  // User orders
  userOrders: [],
  userOrdersPagination: {
    totalOrders: 0,
    currentPage: 1,
    totalPages: 0,
    limit: 10,
  },
  
  // All orders (admin view)
  allOrders: [],
  allOrdersPagination: {
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 20,
    hasNext: false,
    hasPrev: false,
  },
  allOrdersFilters: {
    search: '',
    status: '',
    amountRange: '',
    sortBy: 'date',
  },

  // Single order operations
  currentOrder: null,
  
  // Loading states
  loading: {
    placeOrder: false,
    getUserOrders: false,
    getAllOrders: false,
    updateOrderStatus: false,
  },
  
  // Error states
  error: {
    placeOrder: null,
    getUserOrders: null,
    getAllOrders: null,
    updateOrderStatus: null,
  },
  
  // Success messages
  successMessage: null,
  
  // Order statuses for filtering
  orderStatuses: [
    'Pending',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
    'Returned',
    'Failed',
  ],
  
  // Amount ranges for filtering
  amountRanges: [
    { value: 'any', label: 'Any Amount' },
    { value: '0-99', label: '₹0 - ₹99' },
    { value: '100-1500', label: '₹100 - ₹1,500' },
    { value: '1501+', label: '₹1,501+' },
  ],
};

// Orders slice
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // Clear errors
    clearError: (state, action) => {
      const errorType = action.payload;
      if (errorType && state.error[errorType]) {
        state.error[errorType] = null;
      } else {
        // Clear all errors if no specific type provided
        Object.keys(state.error).forEach(key => {
          state.error[key] = null;
        });
      }
    },
    
    // Clear success message
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    
    // Set current order
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    
    // Clear current order
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    
    // Update filters for all orders
    setAllOrdersFilters: (state, action) => {
      state.allOrdersFilters = { ...state.allOrdersFilters, ...action.payload };
    },
    
    // Reset all orders state
    resetAllOrders: (state) => {
      state.allOrders = [];
      state.allOrdersPagination = initialState.allOrdersPagination;
      state.allOrdersFilters = initialState.allOrdersFilters;
    },
    
    // Reset user orders state
    resetUserOrders: (state) => {
      state.userOrders = [];
      state.userOrdersPagination = initialState.userOrdersPagination;
    },
    
    // Update single order in lists (for real-time updates)
    updateOrderInLists: (state, action) => {
      const updatedOrder = action.payload;
      
      // Update in user orders
      const userOrderIndex = state.userOrders.findIndex(
        order => order._id === updatedOrder._id
      );
      if (userOrderIndex !== -1) {
        state.userOrders[userOrderIndex] = updatedOrder;
      }
      
      // Update in all orders
      const allOrderIndex = state.allOrders.findIndex(
        order => order._id === updatedOrder._id
      );
      if (allOrderIndex !== -1) {
        state.allOrders[allOrderIndex] = updatedOrder;
      }
      
      // Update current order if it matches
      if (state.currentOrder && state.currentOrder._id === updatedOrder._id) {
        state.currentOrder = updatedOrder;
      }
    },
  },
  
  extraReducers: (builder) => {
    // Place Order
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading.placeOrder = true;
        state.error.placeOrder = null;
        state.successMessage = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading.placeOrder = false;
        state.currentOrder = action.payload.order;
        state.successMessage = action.payload.message;
        // Add new order to the beginning of user orders if they exist
        if (state.userOrders.length > 0) {
          state.userOrders.unshift(action.payload.order);
          state.userOrdersPagination.totalOrders += 1;
        }
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading.placeOrder = false;
        state.error.placeOrder = action.payload;
      })
      
    // Get User Orders
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.loading.getUserOrders = true;
        state.error.getUserOrders = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading.getUserOrders = false;
        if (action.payload.success) {
          state.userOrders = action.payload.data || [];
          state.userOrdersPagination = action.payload.pagination || initialState.userOrdersPagination;
        } else {
          state.userOrders = [];
          state.userOrdersPagination = initialState.userOrdersPagination;
        }
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading.getUserOrders = false;
        state.error.getUserOrders = action.payload;
        state.userOrders = [];
      })
      
    // Get All Orders
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading.getAllOrders = true;
        state.error.getAllOrders = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading.getAllOrders = false;
        if (action.payload.success) {
          state.allOrders = action.payload.data || [];
          state.allOrdersPagination = action.payload.pagination || initialState.allOrdersPagination;
          state.allOrdersFilters = action.payload.filters || initialState.allOrdersFilters;
        }
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading.getAllOrders = false;
        state.error.getAllOrders = action.payload;
        state.allOrders = [];
      })
      
    // Update Order Status
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading.updateOrderStatus = true;
        state.error.updateOrderStatus = null;
        state.successMessage = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading.updateOrderStatus = false;
        if (action.payload.success) {
          const updatedOrder = action.payload.data;
          state.successMessage = action.payload.message;
          
          // Update the order in all relevant arrays
          ordersSlice.caseReducers.updateOrderInLists(state, { payload: updatedOrder });
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading.updateOrderStatus = false;
        state.error.updateOrderStatus = action.payload;
      });
  },
});

// Export actions
export const {
  clearError,
  clearSuccessMessage,
  setCurrentOrder,
  clearCurrentOrder,
  setAllOrdersFilters,
  resetAllOrders,
  resetUserOrders,
  updateOrderInLists,
} = ordersSlice.actions;

// Selectors
export const selectUserOrders = (state) => state.orders.userOrders;
export const selectUserOrdersPagination = (state) => state.orders.userOrdersPagination;
export const selectAllOrders = (state) => state.orders.allOrders;
export const selectAllOrdersPagination = (state) => state.orders.allOrdersPagination;
export const selectAllOrdersFilters = (state) => state.orders.allOrdersFilters;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;
export const selectOrdersSuccessMessage = (state) => state.orders.successMessage;
export const selectOrderStatuses = (state) => state.orders.orderStatuses;
export const selectAmountRanges = (state) => state.orders.amountRanges;

// Complex selectors
export const selectOrderById = (orderId) => (state) => {
  return state.orders.userOrders.find(order => order._id === orderId) ||
         state.orders.allOrders.find(order => order._id === orderId) ||
         null;
};

export const selectOrdersByStatus = (status) => (state) => {
  return state.orders.userOrders.filter(order => order.orderStatus === status);
};

export const selectIsLoading = (state) => {
  return Object.values(state.orders.loading).some(loading => loading);
};

export const selectHasError = (state) => {
  return Object.values(state.orders.error).some(error => error !== null);
};

// Export reducer
export default ordersSlice.reducer;