import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

export const fetchFilteredFabrics = createAsyncThunk(
  'fabric/fetchFilteredFabrics',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get('/fabrics/all', { params });
      return response.data.data; 
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to fetch fabrics';
      return rejectWithValue(message);
    }
  }
);

export const getFabricById = createAsyncThunk(
  "fabric/getFabricById",
  async (fabricId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/fabrics/${fabricId}`);
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch fabric";
      return rejectWithValue(message);
    }
  }
);

export const addFabric = createAsyncThunk(
  "fabric/addFabric",
  async (fabricData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("name", fabricData.name);
      formData.append("description", fabricData.description);
      formData.append("price", fabricData.price);
      formData.append("collectionName", fabricData.collectionName);
      formData.append("collectionId", fabricData.collectionId); // Assuming category maps to collectionId
      formData.append("material", fabricData.material || "");
      formData.append("style", fabricData.style || "");
      formData.append("pattern", fabricData.pattern || "");
      formData.append("inStock", fabricData.inStock);
      formData.append("quantityAvailable", fabricData.quantityAvailable);
      formData.append("color", fabricData.color || "#6366f1"); // Include color if it's part of productData
      formData.append("features", JSON.stringify(fabricData.features || [])); // Stringify array
      formData.append(
        "dimensions",
        JSON.stringify(
          fabricData.dimensions || { length: 0, width: 0, unit: "inches" }
        )
      ); 
      if (fabricData.mainImageUrl) {
        formData.append('mainImage', fabricData.mainImageUrl);
      }

      // Add additional image files
      if (fabricData.additionalImageUrls && fabricData.additionalImageUrls.length > 0) {
        fabricData.additionalImageUrls.forEach((file) => {
          formData.append('additionalImages', file);
        });
      }

      const response = await axios.post("/fabrics/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to add fabric";
      return rejectWithValue(message);
    }
  }
);

export const updateFabric = createAsyncThunk(
  "fabric/updateFabric",
  async ({ fabricId, updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/fabrics/update/${fabricId}`,
        updateData
      );
      return response.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update fabric";
      return rejectWithValue(message);
    }
  }
);

export const deleteFabric = createAsyncThunk(
  "fabric/deleteFabric",
  async (fabricId, { rejectWithValue }) => {
    try {
      await axios.delete(`/fabrics/delete/${fabricId}`);
      return fabricId;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete fabric";
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  fabrics: [],
  currentFabric: null,
  totalPages: 0,
  currentPage: 1,
  totalFabrics: 0,
  hasNextPage: false,
  hasPrevPage: false,
  isLoading: false,
  isAddingFabric: false,
  isUpdatingFabric: false,
  isDeletingFabric: false,
  error: null,
  filters: {
    collectionId: "",
    material: "",
    color: "",
    pattern: "",
    minPrice: "",
    maxPrice: "",
    page: 1,
    limit: 10,
  },
};

const fabricSlice = createSlice({
  name: "fabric",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentFabric: (state) => {
      state.currentFabric = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      state.filters.page = action.payload;
    },
    clearFabrics: (state) => {
      state.fabrics = [];
      state.totalPages = 0;
      state.currentPage = 1;
      state.totalFabrics = 0;
      state.hasNextPage = false;
      state.hasPrevPage = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredFabrics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFilteredFabrics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fabrics = action.payload.docs
        state.totalPages = action.payload.totalPages || 1;
        state.currentPage = action.payload.page || 1;
        state.totalFabrics = action.payload.totalDocs || action.payload.length;
        state.hasNextPage = action.payload.hasNextPage || false;
        state.hasPrevPage = action.payload.hasPrevPage || false;
        state.error = null;
      })
      .addCase(fetchFilteredFabrics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.fabrics = [];
      })

      .addCase(getFabricById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFabricById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentFabric = action.payload;
        state.error = null;
      })
      .addCase(getFabricById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.currentFabric = null;
      })

      .addCase(addFabric.pending, (state) => {
        state.isAddingFabric = true;
        state.error = null;
      })
      .addCase(addFabric.fulfilled, (state, action) => {
        state.isAddingFabric = false;
        state.fabrics.unshift(action.payload); // Add to beginning of array
        state.totalFabrics += 1;
        state.error = null;
      })
      .addCase(addFabric.rejected, (state, action) => {
        state.isAddingFabric = false;
        state.error = action.payload;
      })

      // Update fabric
      .addCase(updateFabric.pending, (state) => {
        state.isUpdatingFabric = true;
        state.error = null;
      })
      .addCase(updateFabric.fulfilled, (state, action) => {
        state.isUpdatingFabric = false;
        const index = state.fabrics.findIndex(
          (fabric) => fabric.fabricId === action.payload.fabricId
        );
        if (index !== -1) {
          state.fabrics[index] = action.payload;
        }
        if (state.currentFabric?.fabricId === action.payload.fabricId) {
          state.currentFabric = action.payload;
        }
        state.error = null;
      })
      .addCase(updateFabric.rejected, (state, action) => {
        state.isUpdatingFabric = false;
        state.error = action.payload;
      })

      // Delete fabric
      .addCase(deleteFabric.pending, (state) => {
        state.isDeletingFabric = true;
        state.error = null;
      })
      .addCase(deleteFabric.fulfilled, (state, action) => {
        state.isDeletingFabric = false;
        state.fabrics = state.fabrics.filter(
          (fabric) => fabric.fabricId !== action.payload
        );
        state.totalFabrics -= 1;
        if (state.currentFabric?.fabricId === action.payload) {
          state.currentFabric = null;
        }
        state.error = null;
      })
      .addCase(deleteFabric.rejected, (state, action) => {
        state.isDeletingFabric = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  clearError,
  clearCurrentFabric,
  setFilters,
  resetFilters,
  setCurrentPage,
  clearFabrics,
} = fabricSlice.actions;

// Selectors
export const selectAllFabrics = (state) => state.fabrics.fabrics;
export const selectCurrentFabric = (state) => state.fabrics.currentFabric;
export const selectFabricLoading = (state) => state.fabrics.isLoading;
export const selectFabricError = (state) => state.fabrics.error;
export const selectFabricFilters = (state) => state.fabrics.filters;
export const selectCurrentFilters = (state) => state.fabrics.filters;
export const selectFabricPagination = (state) => ({
  currentPage: state.fabrics.currentPage,
  totalPages: state.fabrics.totalPages,
  totalFabrics: state.fabrics.totalFabrics,
  hasNextPage: state.fabrics.hasNextPage,
  hasPrevPage: state.fabrics.hasPrevPage,
});
export const selectFabricLoadingStates = (state) => ({
  isLoading: state.fabrics.isLoading,
  isAddingFabric: state.fabrics.isAddingFabric,
  isUpdatingFabric: state.fabrics.isUpdatingFabric,
  isDeletingFabric: state.fabrics.isDeletingFabric,
});

export default fabricSlice.reducer;
