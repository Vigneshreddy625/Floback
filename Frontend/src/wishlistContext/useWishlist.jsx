import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { toast } from 'sonner';

const API_URL = "http://localhost:8000/api/v1";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWishlist = useCallback(async () => {
    setLoading(true);
    setError(null); 
    try {
      const response = await fetch(`${API_URL}/wishlist`, {
        method: 'GET',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch wishlist.");
      }

      const data = await response.json();
      console.log("wishlist successful");
      console.log(data.user); // Assuming user data is also returned
      setWishlist(data.data); 
    } catch (err) {
      const errorMessage = err.message || "Failed to fetch wishlist.";
      setError(errorMessage);
      toast.error(errorMessage);
      setWishlist(null); 
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]); 

  const addWishlistItem = async ({ itemId, itemType }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/wishlist`, {
        method: 'POST',
        credentials: 'include', // Important for sending cookies
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, itemType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add item to wishlist.");
      }

      const data = await response.json();
      setWishlist(data.data); 
      toast.success(data.message || "Item added to wishlist.");
    } catch (err) {
      const errorMessage = err.message || "Failed to add item to wishlist.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const removeWishlistItem = async ({ itemId, itemType }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/wishlist`, {
        method: 'DELETE',
        credentials: 'include', // Important for sending cookies
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, itemType }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to remove item from wishlist.");
      }

      const data = await response.json();
      setWishlist((prevWishlist) => ({
        ...prevWishlist,
        items: data.data, 
      }));
      fetchWishlist();
      toast.success(data.message || "Item removed from wishlist.");
    } catch (err) {
      const errorMessage = err.message || "Failed to remove item from wishlist.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isItemInWishlist = useCallback(({ itemId, itemType }) => {
    if (!wishlist || !wishlist.items) return false;
    return wishlist.items.some(
      (item) => item.itemId === itemId && item.itemType === itemType
    );
  }, [wishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist, 
        wishlistItems: wishlist ? wishlist.items : [], 
        loading,
        error,
        addWishlistItem,
        removeWishlistItem,
        isItemInWishlist, 
        refetchWishlist: fetchWishlist, 
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);