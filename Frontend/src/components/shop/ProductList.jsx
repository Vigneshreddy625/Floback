import { Eye, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

export default function ProductList({ product, isFavorite, onToggleFavorite }) {
  return (
    <div className="bg-white group hover:shadow-xl transition-shadow duration-300 border border-gray-200 rounded-2xl overflow-hidden flex flex-col sm:flex-row mb-4">
      <div className="relative w-full sm:w-48 flex-shrink-0">
        <img
          src={product.mainImageUrl}
          alt={product.name}
          className="w-full h-48 sm:h-48 sm:w-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          onClick={() => onToggleFavorite(product)}
          className={`absolute top-3 right-3 rounded-full p-2.5 shadow-lg backdrop-blur-sm transition-all duration-300 ${
            isFavorite
              ? "bg-yellow-500 text-white shadow-yellow-500/25"
              : "bg-white/90 text-gray-700 hover:bg-yellow-500 hover:text-white"
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-5 flex flex-col justify-between flex-1 min-w-0">
        <div className="mb-4">
          <p className="text-yellow-600 text-xs uppercase tracking-wider mb-2 font-medium">
            {product.category}
          </p>
          <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif line-clamp-2 group-hover:text-yellow-600 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-3 font-medium">
            {product.subcategory}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.oldPrice && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.oldPrice.toLocaleString()}
                </span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% off
                </span>
              </>
            )}
          </div>

          <div className="flex space-x-3 flex-shrink-0">
            <button className="bg-gray-900 text-white px-6 py-2.5 text-sm font-semibold hover:bg-yellow-600 transition-colors duration-300 rounded-xl shadow-lg hover:shadow-xl">
              Add to Cart
            </button>
            <Link
              to={`/product/${product.type || "product"}-${product.id}`}
              className="bg-gray-100 p-2.5 hover:bg-yellow-600 hover:text-white transition-colors duration-300 rounded-xl flex items-center justify-center border border-gray-300 hover:border-yellow-600 shadow-lg"
            >
              <Eye className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}