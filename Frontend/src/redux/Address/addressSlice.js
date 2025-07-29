import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
axios.defaults.baseURL = API_URL;

const getToken = (user) => {
  return user?.accessToken;
};

export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAddresses",
  async (_, { getState }) => {
    const { user } = getState().auth;
    const token = getToken(user);
    try {
      const response = await axios.get(`/api/v1/addresses/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
);

export const addAddress = createAsyncThunk(
  "addresses/addAddress",
  async (addressData, { getState }) => {
    const { user } = getState().auth;
    const token = getToken(user);
    try {
      const response = await axios.post(`/api/v1/addresses/`, addressData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
);

export const updateAddress = createAsyncThunk(
  "addresses/updateAddress",
  async ({ addressId, addressData }, { getState }) => {
    const { user } = getState().auth;
    const token = getToken(user);
    try {
      const response = await axios.put(
        `/api/v1/addresses/${addressId}`,
        addressData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "addresses/deleteAddress",
  async (addressId, { getState }) => {
    const { user } = getState().auth;
    const token = getToken(user);
    try {
      await axios.delete(`/api/v1/addresses/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return addressId;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
);

const addressSlice = createSlice({
  name: "addresses",
  initialState: {
    addresses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload.data || [];
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        const newAddresses = action.payload.data || [];
        if (newAddresses.length > 0) {
          state.addresses = newAddresses;
        }
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        const updatedAddresses = action.payload.data || [];
        if (updatedAddresses.length > 0) {
          state.addresses = updatedAddresses;
        }
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = state.addresses.filter(
          (address) => address._id !== action.payload
        );
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default addressSlice.reducer;
export const {} = addressSlice.actions;
