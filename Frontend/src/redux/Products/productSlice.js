import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
axios.defaults.baseURL = API_URL;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/products/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all products"
      );
    }
  }
);

export const fetchFilteredProducts = createAsyncThunk(
  "products/fetchFilteredProducts",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const {
        search = "",
        category = "",
        priceRange = "",
        stockStatus = "",
        sortBy = "date",
        page = 1,
        limit = 20,
      } = filters;

      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      if (category) queryParams.append("category", category);
      if (priceRange) queryParams.append("priceRange", priceRange);
      if (stockStatus) queryParams.append("stockStatus", stockStatus);
      if (sortBy) queryParams.append("sortBy", sortBy);
      queryParams.append("page", page.toString());
      queryParams.append("limit", limit.toString());

      const response = await axios.get(
        `/api/v1/products/all?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch filtered products"
      );
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      console.log("req.files:", req.files); // <-- Add this line
        console.log("req.body:", req.body);
      const formData = new FormData();
      for (const key in productData) {
        if (key === 'image' && productData[key] instanceof File) {
          formData.append(key, productData[key]);
        } else if (key === 'images' && Array.isArray(productData[key])) {
          productData[key].forEach((file) => {
            if (file instanceof File) {
              formData.append('images', file);
            }
          });
        } else {
          formData.append(key, productData[key]);
        }
      }

      const response = await axios.post("/api/v1/products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    singleProduct: null,
    loading: false,
    loadingSingle: false,
    operationLoading: false, 
    error: null,
    singleProductError: null,
    operationError: null,
    totalProducts: 0,
    currentPage: 1,
    currentFilters: {},
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.singleProductError = null;
      state.operationError = null;
    },
    setFilters: (state, action) => {
      state.currentFilters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Filtered Products
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.totalProducts = action.payload.pagination.totalItems;
        state.currentPage = action.payload.pagination.currentPage;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.operationLoading = false;
        console.log("Product added successfully:", action.payload.data);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      });
  },
});

export default productSlice.reducer;

export const { clearErrors, setFilters } = productSlice.actions;

export const selectAllProducts = (state) => state.products.items;
export const selectFilteredProducts = (state) => state.products.items;
export const selectProductLoading = (state) => state.products.loading;
export const selectProductError = (state) => state.products.error;
export const selectTotalProducts = (state) => state.products.totalProducts;
export const selectCurrentPage = (state) => state.products.currentPage;
export const selectCurrentFilters = (state) => state.products.currentFilters;
export const selectOperationLoading = (state) =>
  state.products.operationLoading;
export const selectOperationError = (state) => state.products.operationError;