import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.append('page', params.page);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.category) queryParams.append('category', params.category);
      if (params.material) queryParams.append('material', params.material);
      if (params.style) queryParams.append('style', params.style);
      if (params.pattern) queryParams.append('pattern', params.pattern);
      if (params.minPrice) queryParams.append('minPrice', params.minPrice);
      if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice);

      const response = await fetch(`${API_BASE_URL}/products/all?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to fetch products');
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to fetch product');
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('category', productData.category);
      formData.append('material', productData.material || '');
      formData.append('style', productData.style || '');
      formData.append('pattern', productData.pattern || '');
      formData.append('inStock', productData.inStock);
      formData.append('quantityAvailable', productData.quantityAvailable);
      
      if (productData.dimensions) {
        formData.append('dimensions', JSON.stringify(productData.dimensions));
      }
      
      if (productData.mainImageUrl) {
        formData.append('mainImage', productData.mainImageUrl);
      }
      
      if (productData.additionalImageUrls && productData.additionalImageUrls.length > 0) {
        productData.additionalImageUrls.forEach((image) => {
          formData.append('additionalImages', image);
        });
      }

      const response = await fetch(`${API_BASE_URL}/products/add`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to add product');
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ productId, updateData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/update/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to update product');
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/delete/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to delete product');
      }

      return { productId, message: data.message };
    } catch (error) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

const initialState = {
  products: [],
  totalProducts: 0,
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false,
  
  selectedProduct: null,
  
  loading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
  
  error: null,
  addError: null,
  updateError: null,
  deleteError: null,
  
  deleteSuccess: null,
  
  filters: {
    category: '',
    material: '',
    style: '',
    pattern: '',
    minPrice: '',
    maxPrice: '',
    page: 1,
    limit: 10,
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.addError = null;
      state.updateError = null;
      state.deleteError = null;
    },
    
    clearSuccessMessages: (state) => {
      state.deleteSuccess = null;
    },
    
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    resetFilters: (state) => {
      state.filters = {
        category: '',
        material: '',
        style: '',
        pattern: '',
        minPrice: '',
        maxPrice: '',
        page: 1,
        limit: 10,
      };
    },
    
    clearProducts: (state) => {
      state.products = [];
      state.totalProducts = 0;
      state.currentPage = 1;
      state.totalPages = 1;
      state.hasNextPage = false;
      state.hasPrevPage = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.docs || [];
        state.totalProducts = action.payload.totalDocs || 0;
        state.currentPage = action.payload.page || 1;
        state.totalPages = action.payload.totalPages || 1;
        state.hasNextPage = action.payload.hasNextPage || false;
        state.hasPrevPage = action.payload.hasPrevPage || false;
        state.error = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.products = [];
      });

    builder
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        state.error = null;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.selectedProduct = null;
      });

    builder
      .addCase(addProduct.pending, (state) => {
        state.addLoading = true;
        state.addError = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addLoading = false;
        state.products.unshift(action.payload);
        state.totalProducts += 1;
        state.addError = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addLoading = false;
        state.addError = action.payload;
      });

    builder
      .addCase(updateProduct.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateLoading = false;
        
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          product => product.productId === updatedProduct.productId
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
        
        if (state.selectedProduct && state.selectedProduct.productId === updatedProduct.productId) {
          state.selectedProduct = updatedProduct;
        }
        
        state.updateError = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });

    builder
      .addCase(deleteProduct.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
        state.deleteSuccess = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteLoading = false;
        
        const deletedProductId = action.payload.productId;
        state.products = state.products.filter(
          product => product.productId !== deletedProductId
        );
        
        state.totalProducts = Math.max(0, state.totalProducts - 1);
        
        if (state.selectedProduct && state.selectedProduct.productId === deletedProductId) {
          state.selectedProduct = null;
        }
        
        state.deleteError = null;
        state.deleteSuccess = action.payload.message || 'Product deleted successfully';
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload;
        state.deleteSuccess = null;
      });
  },
});

export const {
  clearErrors,
  clearSuccessMessages,
  clearSelectedProduct,
  updateFilters,
  resetFilters,
  clearProducts,
} = productSlice.actions;

export const selectProducts = (state) => state.products.products;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectAddLoading = (state) => state.products.addLoading;
export const selectAddError = (state) => state.products.addError;
export const selectUpdateLoading = (state) => state.products.updateLoading;
export const selectUpdateError = (state) => state.products.updateError;
export const selectDeleteLoading = (state) => state.products.deleteLoading;
export const selectDeleteError = (state) => state.products.deleteError;
export const selectDeleteSuccess = (state) => state.products.deleteSuccess;
export const selectPagination = (state) => ({
  currentPage: state.products.currentPage,
  totalPages: state.products.totalPages,
  totalProducts: state.products.totalProducts,
  hasNextPage: state.products.hasNextPage,
  hasPrevPage: state.products.hasPrevPage,
});
export const selectFilters = (state) => state.products.filters;

export default productSlice.reducer;