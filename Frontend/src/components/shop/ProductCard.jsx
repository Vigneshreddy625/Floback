import React from "react";
import { Heart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { cartHooks } from "../../hooks/userCartActions";

const ProductCard = ({ product, isFavorite, onToggleFavorite }) => {

  const { handleAddToCart } = cartHooks();
  return (
    <div className="bg-white group hover:shadow-xl transition-shadow duration-300 border border-gray-300 rounded-2xl overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.mainImageUrl}
          alt={product.name}
          className="w-full h-40 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={() => onToggleFavorite(product)}
          className={`absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full p-2 sm:p-2.5 shadow-lg transition-colors ${
            isFavorite
              ? "bg-yellow-600 text-white"
              : "bg-white hover:bg-yellow-600 hover:text-white"
          }`}
        >
          <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="absolute bottom-3 sm:bottom-4 left-3 right-3 sm:left-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            <button className="flex-1 bg-gray-900 text-white px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium hover:bg-yellow-600 transition-colors rounded-xl" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
            <Link
              to={`/product/${product.productId}`}
              className="bg-white p-2 hover:bg-yellow-600 hover:text-white transition-colors rounded-xl flex items-center justify-center border border-gray-300 hover:border-yellow-600"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 text-center">
        <p className="text-yellow-600 text-[10px] sm:text-xs uppercase tracking-wider mb-1 sm:mb-2">
          {product.category}
        </p>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 font-serif line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
          {product.subcategory}
        </p>

        {/* Price Display */}
        <div className="flex items-center justify-center space-x-2">
          <span className="text-base sm:text-lg font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">
              ₹{product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;