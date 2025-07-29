// wishlistContext/useWishlist.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
axios.defaults.baseURL = API_URL;

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWishlistItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/v1/wishlist`);
      setWishlistItems(response.data.data);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const addWishlistItem = async (productId) => {
    try {
      await axios.post(`/api/v1/wishlist`, { productId });
      setWishlistItems((prev) => [...prev, { _id: productId }]); // optional optimistic add
      toast.success("Item added to wishlist.");
      fetchWishlistItems(); // re-sync
    } catch (err) {
      setError(err.response?.data || err.message);
      toast.error("Failed to add item to wishlist.");
    }
  };

  const removeWishlistItem = async (productId) => {
    // ✅ Optimistic remove
    const prevItems = [...wishlistItems];
    setWishlistItems((prev) => prev.filter((item) => item._id !== productId));

    try {
      await axios.delete(`/api/v1/wishlist`, {
        data: { productId },
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success("Item removed from wishlist.");
    } catch (err) {
      setWishlistItems(prevItems); // revert
      setError(err.response?.data || err.message);
      toast.error("Failed to remove item from wishlist.");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        loading,
        error,
        addWishlistItem,
        removeWishlistItem,
        refetch: fetchWishlistItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);