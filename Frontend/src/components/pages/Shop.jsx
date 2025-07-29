
import React, { useState } from 'react';
import { products, categories } from "../../data/products"; // Adjust the path as necessary
import ShopHeader from "../shop/ShopHeader"
import CategoryFilter from '../shop/CategoryFilter';
import ProductGrid from '../shop/ProductGrid';
import WhatsAppButton from '../shop/WhatsAppButton';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.subcategory.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white">
      <ShopHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartCount={cartCount}
      />

      <section className="bg-gradient-to-r from-gray-900 to-gray-700 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-4 font-serif">Shop Collection</h1>
          <p className="text-xl">Discover our premium home decor collection</p>
        </div>
      </section>

      <CategoryFilter 
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <ProductGrid 
        products={filteredProducts}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onAddToCart={handleAddToCart}
      />

      <WhatsAppButton />
    </div>
  );
};

export default Shop;
