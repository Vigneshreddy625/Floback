import React, { Suspense } from "react";
import { useWishlist } from "../../wishlistContext/useWishlist";
import { Button } from "../ui/button";
import LoadingScreen from "../Items/LoadingScreen";
import { useNavigate } from "react-router-dom";
import { useAddToCart } from "../utils/useAddToCart"
import Header from "../Layout/Header";

const LazyImage = React.lazy(() =>
  Promise.resolve({
    default: ({ src, alt, className, isOutOfStock }) => (
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${
          isOutOfStock ? "opacity-50 grayscale" : "opacity-100"
        }`}
        loading="lazy"
      />
    ),
  })
);

const ImagePlaceholder = () => (
  <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 animate-pulse" />
);

const Wishlist = () => {
  const {
    wishlistItems,
    loading: wishlistLoading,
    removeWishlistItem,
  } = useWishlist();
  const {
    handleAddToCart,
    loading: addToCartLoading,
  } = useAddToCart();

  const navigate = useNavigate();

  const toggleWishlist = async (item) => {
    if (item.stockStatus !== "In Stock") {
      navigate(`/categories/${item.category.toLowerCase().trim().replace(/\s+/g, "")}`);
      return;
    }

    try {
      handleAddToCart(item); // only remove from wishlist if cart add was successful
      await removeWishlistItem(item._id);
    } catch (error) {
      // toast is already handled inside hooks, so optional here
      console.error("Failed to move item to bag:", error);
    }
  };

  if (wishlistLoading) return <LoadingScreen />;

  return (
    <div className="w-full lg:min-w-[1024px]">
      <Header/>
      <div className="flex items-center justify-between mb-8">
        <div className="flex w-full md:justify-normal">
          <h1 className="text-xl font-medium">My Wishlist</h1>
          <span className="ml-2 mt-0.5 text-gray-500 dark:text-gray-300">
            ({wishlistItems.length} items)
          </span>
        </div>
        {wishlistItems.length > 0 && <Button className="ml-2">Move all to bag</Button>}
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="border dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative">
                <Suspense fallback={<ImagePlaceholder />}>
                  <LazyImage
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 md:h-64 object-cover bg-transparent border-b dark:border-gray-600"
                    isOutOfStock={item.stockStatus !== "In Stock"}
                  />
                </Suspense>

                <button
                  onClick={() => removeWishlistItem(item._id)}
                  className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Remove item"
                >
                  <svg
                    className="w-4 h-4 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {item.stockStatus !== "In Stock" && (
                  <div className="absolute bottom-0 left-0 right-0 bg-red-500 bg-opacity-80 text-white text-center py-1 text-sm font-medium">
                    OUT OF STOCK
                  </div>
                )}
              </div>

              <div className="md:mt-4">
                <div className="px-4 py-2">
                  <h3 className="text-sm text-center font-medium truncate">
                    {item.title}
                  </h3>
                  <div className="mt-2 flex items-center justify-center">
                    <span className="text-sm font-medium">Rs.{item.price}</span>
                    {item.originalPrice > item.price && (
                      <>
                        <span className="hidden md:inline-block ml-2 text-sm text-gray-500 line-through">
                          Rs.{item.originalPrice}
                        </span>
                        <span className="hidden md:inline-block ml-2 text-sm text-red-500">
                          {item.discount}%off
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => toggleWishlist(item)}
                  disabled={addToCartLoading}
                  className={`md:mt-4 py-2 w-full border-t dark:border-gray-600 text-sm font-medium ${
                    item.stockStatus === "In Stock"
                      ? "text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900"
                      : "text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900"
                  }`}
                >
                  {item.stockStatus === "In Stock" ? "MOVE TO BAG" : "SHOW SIMILAR"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-32 h-32 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
            Save items you like in your wishlist and review them anytime.
          </p>
          <Button onClick={() => navigate('/home')}>Start Shopping</Button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
