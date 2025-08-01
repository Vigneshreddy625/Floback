import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1";
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getAllCollections = createAsyncThunk(
  "collections/getAllCollections",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 10, type, minPrice, maxPrice } = params;
      const queryParams = {
        page,
        limit,
        ...(type && { type }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
      };

      const response = await api.get("/collections/all", {
        params: queryParams,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch collections"
      );
    }
  }
);

export const addCollection = createAsyncThunk(
  "collections/addCollection",
  async (collectionData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", collectionData.name);
      formData.append("description", collectionData.description);
      formData.append("price", collectionData.price);
      formData.append("type", collectionData.type);
      formData.append("priceRange", JSON.stringify(collectionData.priceRange));
      if (collectionData.thumbnailImageUrl) {
        formData.append("thumbnailImage", collectionData.thumbnailImageUrl);
      }

      const response = await api.post("/collections/add", formData);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to add collection"
      );
    }
  }
);

export const getCollectionById = createAsyncThunk(
  "collections/getCollectionById",
  async (collectionId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/collections/${collectionId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch collection"
      );
    }
  }
);

export const getCollectionWithFabrics = createAsyncThunk(
  "collections/getCollectionWithFabrics",
  async (collectionId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/collections/${collectionId}/fabrics`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch collection with fabrics"
      );
    }
  }
);

export const updateCollection = createAsyncThunk(
  "collections/updateCollection",
  async ({ collectionId, updateData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/collections/update/${collectionId}`,
        updateData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update collection"
      );
    }
  }
);

export const deleteCollection = createAsyncThunk(
  "collections/deleteCollection",
  async (collectionId, { rejectWithValue }) => {
    try {
      await api.delete(`/collections/delete/${collectionId}`);
      return collectionId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete collection"
      );
    }
  }
);

const initialState = {
  collections: {
    docs: [],
    totalDocs: 0,
    limit: 10,
    page: 1,
    totalPages: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  },
  currentCollection: null,
  collectionWithFabrics: null,
  loading: false,
  error: null,
  filters: {
    type: "",
    minPrice: "",
    maxPrice: "",
    page: 1,
    limit: 10,
  },
};

const collectionSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    clearCurrentCollection: (state) => {
      state.currentCollection = null;
    },
    clearCollectionWithFabrics: (state) => {
      state.collectionWithFabrics = null;
    },

    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    resetFilters: (state) => {
      state.filters = {
        type: "",
        minPrice: "",
        maxPrice: "",
        page: 1,
        limit: 10,
      };
    },

    resetCollectionsState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCollections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCollections.fulfilled, (state, action) => {
        state.loading = false;
        state.collections = action.payload;
        state.error = null;
      })
      .addCase(getAllCollections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.collections.docs.unshift(action.payload);
        state.collections.totalDocs += 1;
        state.error = null;
      })
      .addCase(addCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCollectionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCollectionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCollection = action.payload;
        state.error = null;
      })
      .addCase(getCollectionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCollectionWithFabrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCollectionWithFabrics.fulfilled, (state, action) => {
        state.loading = false;
        state.collectionWithFabrics = action.payload;
        state.error = null;
      })
      .addCase(getCollectionWithFabrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCollection = action.payload;

        const index = state.collections.docs.findIndex(
          (collection) => collection._id === action.payload._id
        );
        if (index !== -1) {
          state.collections.docs[index] = action.payload;
        }

        state.error = null;
      })
      .addCase(updateCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.loading = false;

        state.collections.docs = state.collections.docs.filter(
          (collection) => collection.collectionId !== action.payload
        );
        state.collections.totalDocs -= 1;
        if (state.currentCollection?.collectionId === action.payload) {
          state.currentCollection = null;
        }

        state.error = null;
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearCurrentCollection,
  clearCollectionWithFabrics,
  setFilters,
  resetFilters,
  resetCollectionsState,
} = collectionSlice.actions;

export const selectCollections = (state) => state.collections.collections;
export const selectCurrentCollection = (state) =>
  state.collections.currentCollection;
export const selectCollectionWithFabrics = (state) =>
  state.collections.collectionWithFabrics;
export const selectCollectionsLoading = (state) => state.collections.loading;
export const selectCollectionsError = (state) => state.collections.error;
export const selectCollectionsFilters = (state) => state.collections.filters;

export default collectionSlice.reducer;
