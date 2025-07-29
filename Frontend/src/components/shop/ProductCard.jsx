
import React from 'react';
import { Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';


const ProductCard = ({ 
  product, 
  isFavorite, 
  onToggleFavorite, 
  onAddToCart 
}) => {
  return (
    <div className="bg-white group hover:shadow-xl transition-shadow duration-300 border rounded-lg overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <button 
          onClick={() => onToggleFavorite(product.id)}
          className={`absolute top-4 right-4 rounded-full p-2 shadow-md transition-colors ${
            isFavorite 
              ? 'bg-yellow-600 text-white' 
              : 'bg-white hover:bg-yellow-600 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
        </button>
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            <button 
              onClick={onAddToCart}
              className="flex-1 bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-yellow-600 transition-colors rounded"
            >
              Add to Cart
            </button>
            <Link 
              to={`/product/${product.type || 'product'}-${product.id}`}
              className="bg-white p-2 hover:bg-yellow-600 hover:text-white transition-colors rounded flex items-center justify-center"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
      <div className="p-4 text-center">
        <p className="text-yellow-600 text-xs uppercase tracking-wider mb-2">{product.category}</p>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 font-serif">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.subcategory}</p>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-500 line-through">₹{product.oldPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
