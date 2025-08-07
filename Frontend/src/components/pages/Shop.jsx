import React, { useEffect, useState } from "react";
import {
  Heart,
  Eye,
  Filter,
  Search,
  ShoppingBag,
  Star,
  Sparkles,
  ArrowRight,
  Grid3X3,
  List,
} from "lucide-react";
import Header from "../Layout/Header";
import { products, categories } from "../../data/products";
import CategoryFilter from "../shop/CategoryFilter";
import ProductCard from "../shop/ProductCard";
import ProductList from "../shop/ProductList";
import { useWishlistActions } from "../../hooks/wishlistHooks";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, selectProducts } from "../../redux/Products/productSlice";

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const {handleAddToWishlist} = useWishlistActions();

  const products = useSelector(selectProducts); 
  console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/20">
      <Header />
      <section className="relative w-screen bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-white/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-white/60 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 sm:mb-6 border border-blue-200">
            <Sparkles className="w-4 h-4 text-blue-500 mr-2" />
            <span className="text-blue-700 font-medium text-xs sm:text-sm">
              Premium Collection
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-800 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Shop Collection
          </h1>
          <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Discover our carefully curated premium home decor collection with
            modern designs and timeless elegance
          </p>
        </div>
      </section>

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <section className="py-4 sm:py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span>
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {filteredProducts.length}
                </span>{" "}
                products
              </span>
              {searchTerm && (
                <span className="text-xs text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">
                  Search: "{searchTerm}"
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 text-sm">
              <span className="text-gray-600">View:</span>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Grid3X3 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <List className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
                No products found
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-sm sm:text-base"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5"
                  : "space-y-4"
              }`}
            >
              {filteredProducts.map((product) =>
                viewMode === "grid" ? (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={handleAddToWishlist}
                    viewMode={viewMode}
                  />
                ) : (
                  <ProductList
                    key={product.id}
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={handleAddToWishlist}
                    viewMode={viewMode}
                  />
                )
              )}
            </div>
          )}
        </div>
      </section>

      {cartCount > 0 && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full p-3 sm:p-4 shadow-2xl animate-bounce">
          <div className="relative">
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="absolute -top-2 -right-2 bg-white text-green-600 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold sm:w-6 sm:h-6 sm:text-xs">
              {cartCount}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
