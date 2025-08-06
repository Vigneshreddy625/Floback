
import React from 'react';
import { Filter } from 'lucide-react';

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <section className="py-4 bg-gradient-to-r from-blue-50/50 via-purple-50/30 to-pink-50/50">
  <div className="max-w-7xl mx-auto px-4">
    {/* Mobile: horizontal scroll */}
    <div className="flex md:flex-wrap overflow-x-auto md:overflow-visible no-scrollbar items-center justify-start md:justify-center gap-2 md:gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`flex-shrink-0 px-4 py-2 md:px-6 md:py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
            activeCategory === category
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-200 shadow-sm'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  </div>
</section>

  );
};

export default CategoryFilter;
