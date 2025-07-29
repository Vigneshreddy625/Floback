import React from 'react';
import { Mail, Search, Filter } from "lucide-react";
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1] || 'Dashboard';
  const pageTitle = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 flex-shrink-0">
      <div className="flex items-center justify-between flex-wrap gap-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">{pageTitle || "Dashboard"}</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Mail size={20} className="text-gray-600" />
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
              alt="Kristina Evans"
              className="w-8 h-8 rounded-full"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/32x32/cccccc/333333?text=KE" }}
            />
            <div className="text-sm hidden sm:block">
              <div className="font-medium text-gray-900">
                Kristina Evans
              </div>
              <div className="text-gray-500 text-xs">
                kris.evans@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
{/* 
      {showFilters && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4 w-full">
          <input
            type="text"
            placeholder={isOrdersPage ? "Search orders..." : "Search products..."}
            className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm w-full sm:w-64 focus:ring-blue-500 focus:border-blue-500"
          />

          {isOrdersPage && (
            <>
              <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm w-full sm:w-auto focus:ring-blue-500 focus:border-blue-500">
                <option>Any status</option>
                <option>Paid</option>
                <option>Delivered</option>
                <option>Completed</option>
                <option>Pending</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm w-full sm:w-auto focus:ring-blue-500 focus:border-blue-500">
                <option>$100—$1500</option>
                <option>$0—$99</option>
                <option>$1501+</option>
              </select>
            </>
          )}

          {isProductsPage && (
            <>
              <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm w-full sm:w-auto focus:ring-blue-500 focus:border-blue-500">
                <option>Any category</option>
                <option>Electronics</option>
                <option>Apparel</option>
                <option>Home Goods</option>
                <option>Books</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm w-full sm:w-auto focus:ring-blue-500 focus:border-blue-500">
                <option>Any stock status</option>
                <option>In Stock</option>
                <option>Out of Stock</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm w-full sm:w-auto focus:ring-blue-500 focus:border-blue-500">
                <option>Any price range</option>
                <option>$0 - $50</option>
                <option>$51 - $200</option>
                <option>$201+</option>
              </select>
            </>
          )}

          <div className="ml-0 sm:ml-auto w-full sm:w-auto flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Filter size={20} className="text-gray-600" />
            </button>
            <select className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm w-full sm:w-auto focus:ring-blue-500 focus:border-blue-500">
              {isOrdersPage && (
                <>
                  <option>Sort by Date</option>
                  <option>Sort by Amount</option>
                </>
              )}
              {isProductsPage && (
                <>
                  <option>Sort by Name</option>
                  <option>Sort by Price</option>
                </>
              )}
              {!isOrdersPage && !isProductsPage && (
                <option>Sort by...</option>
              )}
            </select>
          </div>
        </div>
      )} */}
    </header>
  );
};

export default Header;
