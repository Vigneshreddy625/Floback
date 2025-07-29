import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
axios.defaults.baseURL = API_URL;

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/v1/orders/place`, orderPayload);
      return response.data; 
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Order creation failed" 
      );
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await axios.get(`/api/v1/orders?${query}`);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFilteredOrders = createAsyncThunk(
  "orders/fetchFilteredOrders",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const {
        search = '',
        status = '',
        amountRange = '',
        sortBy = 'date',
        page = 1,
        limit = 20,
      } = filters;

      const queryParams = new URLSearchParams();
      
      if (search) queryParams.append('search', search);
      if (status) queryParams.append('status', status);
      if (amountRange) queryParams.append('amountRange', amountRange);
      if (sortBy) queryParams.append('sortBy', sortBy);
      if (page) queryParams.append('page', page.toString());
      if (limit) queryParams.append('limit', limit.toString());

      const response = await axios.get(`/api/v1/orders/all?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch filtered orders"
      );
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    totalOrders: 0,
    currentPage: 1,
    totalPages: 0,
    limit: 10,
    status: "idle", 
    createOrderStatus: "idle", 
    error: null, 
    createOrderError: null, 
    newlyCreatedOrder: null,
    
    filteredOrders: [],
    filteredOrdersLoading: false,
    filteredOrdersError: null,
    filteredOrdersPagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 20,
      hasNext: false,
      hasPrev: false,
    },
    appliedFilters: {
      search: '',
      status: '',
      amountRange: '',
      sortBy: 'date',
    },
    activeFilters: {
      search: '',
      status: '',
      amountRange: '',
      sortBy: 'date',
      page: 1,
      limit: 20,
    },
  },
  reducers: {
    resetCreateOrderStatus: (state) => {
      state.createOrderStatus = "idle";
      state.createOrderError = null;
      state.newlyCreatedOrder = null;
    },
    
    // New reducers for filtered orders management
    updateActiveFilters: (state, action) => {
      state.activeFilters = { ...state.activeFilters, ...action.payload };
    },
    
    resetFilters: (state) => {
      state.activeFilters = {
        search: '',
        status: '',
        amountRange: '',
        sortBy: 'date',
        page: 1,
        limit: 20,
      };
      state.appliedFilters = {
        search: '',
        status: '',
        amountRange: '',
        sortBy: 'date',
      };
    },
    
    clearFilteredOrdersError: (state) => {
      state.filteredOrdersError = null;
    },
    
    updateFilteredOrdersPagination: (state, action) => {
      state.activeFilters.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducers for fetchOrders (existing)
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload.data; 
        state.totalOrders = action.payload.pagination.totalOrders;
        state.currentPage = action.payload.pagination.currentPage;
        state.totalPages = action.payload.pagination.totalPages;
        state.limit = action.payload.pagination.limit;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.orders = []; 
        state.totalOrders = 0;
        state.currentPage = 1;
        state.totalPages = 0;
      })
      
      // Reducers for createOrder (existing)
      .addCase(createOrder.pending, (state) => {
        state.createOrderStatus = "loading";
        state.createOrderError = null;
        state.newlyCreatedOrder = null; 
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createOrderStatus = "succeeded";
        state.newlyCreatedOrder = action.payload.order || action.payload; 
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createOrderStatus = "failed";
        state.createOrderError = action.payload;
        state.newlyCreatedOrder = null; 
      })
      
      // New reducers for fetchFilteredOrders
      .addCase(fetchFilteredOrders.pending, (state) => {
        state.filteredOrdersLoading = true;
        state.filteredOrdersError = null;
      })
      .addCase(fetchFilteredOrders.fulfilled, (state, action) => {
        state.filteredOrdersLoading = false;
        state.filteredOrders = action.payload.data;
        state.filteredOrdersPagination = action.payload.pagination;
        state.appliedFilters = action.payload.filters;
        state.filteredOrdersError = null;
      })
      .addCase(fetchFilteredOrders.rejected, (state, action) => {
        state.filteredOrdersLoading = false;
        state.filteredOrdersError = action.payload;
        state.filteredOrders = [];
      });
  },
});

export const { 
  resetCreateOrderStatus,
  updateActiveFilters,
  resetFilters,
  clearFilteredOrdersError,
  updateFilteredOrdersPagination
} = ordersSlice.actions;

// Original selectors (existing)
export const selectOrders = (state) => state.orders.orders;
export const selectOrdersStatus = (state) => state.orders.status;
export const selectOrdersError = (state) => state.orders.error;
export const selectCreateOrderStatus = (state) => state.orders.createOrderStatus;
export const selectCreateOrderError = (state) => state.orders.createOrderError;
export const selectNewlyCreatedOrder = (state) => state.orders.newlyCreatedOrder;

// New selectors for filtered orders
export const selectFilteredOrders = (state) => state.orders.filteredOrders;
export const selectFilteredOrdersLoading = (state) => state.orders.filteredOrdersLoading;
export const selectFilteredOrdersError = (state) => state.orders.filteredOrdersError;
export const selectFilteredOrdersPagination = (state) => state.orders.filteredOrdersPagination;
export const selectAppliedFilters = (state) => state.orders.appliedFilters;
export const selectActiveFilters = (state) => state.orders.activeFilters;

// Derived selectors for filtered orders
export const selectFilteredOrdersWithStatus = (status) => (state) =>
  state.orders.filteredOrders.filter(order => 
    status ? order.orderStatus === status : true
  );

export const selectFilteredOrdersByDateRange = (startDate, endDate) => (state) =>
  state.orders.filteredOrders.filter(order => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= startDate && orderDate <= endDate;
  });

export default ordersSlice.reducer;