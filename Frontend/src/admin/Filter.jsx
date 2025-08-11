import React, { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select"
import { Plus } from "lucide-react";

const FilterBar = ({
  isOrdersPage,
  isProductsPage,
  onFilterChange,
  activeFilters = {} 
}) => {
  const [productFormModal, setProductFormModal] = useState(false);
  const searchInputRef = useRef(null); 
  const searchTimeoutRef = useRef(null); 
  const selectStyle =
    "w-full bg-white text-black border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500";

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.value = activeFilters.search || "";
    }
  }, [activeFilters.search]); 

  const handleFilterUpdate = (key, value) => {
    const updatedFilters = { ...activeFilters, [key]: value };
    onFilterChange(updatedFilters);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      handleFilterUpdate("search", value); 
    }, 300);
  };

  const handleResetFilters = () => {
    onFilterChange({}); 
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 w-full">
          <input
            type="text"
            ref={searchInputRef} 
            placeholder={isOrdersPage ? "Search orders..." : "Search products..."}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-black focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            onChange={handleSearchChange}
          />

          {isOrdersPage && (
            <>
              <Select
                value={activeFilters.status || "any"}
                onValueChange={(val) => handleFilterUpdate("status", val === "any" ? "" : val)}
              >
                <SelectTrigger className={selectStyle}>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={activeFilters.amountRange || "any"}
                onValueChange={(val) => handleFilterUpdate("amountRange", val === "any" ? "" : val)}
              >
                <SelectTrigger className={selectStyle}>
                  <SelectValue placeholder="Amount range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="0-99">$0–$99</SelectItem>
                  <SelectItem value="100-1500">$100–$1500</SelectItem>
                  <SelectItem value="1501+">$1501+</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}

          {isProductsPage && (
            <>
              <Select
                value={activeFilters.category || "any"}
                onValueChange={(val) => handleFilterUpdate("category", val === "any" ? "" : val)}
              >
                <SelectTrigger className={selectStyle}>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="apparel">Apparel</SelectItem>
                  <SelectItem value="perfumes">Perfumes</SelectItem>
                  <SelectItem value="home&furniture">Home & Furniture</SelectItem>
                  <SelectItem value="toys">Toys</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="health&beauty">Health & Beauty</SelectItem>
                  <SelectItem value="footwear">Footwear</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={activeFilters.stockStatus || "any"}
                onValueChange={(val) => handleFilterUpdate("stockStatus", val === "any" ? "" : val)}
              >
                <SelectTrigger className={selectStyle}>
                  <SelectValue placeholder="Stock status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="limited-stock">Limited Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={activeFilters.priceRange || "any"}
                onValueChange={(val) => handleFilterUpdate("priceRange", val === "any" ? "" : val)}
              >
                <SelectTrigger className={selectStyle}>
                  <SelectValue placeholder="Price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="0-50">$0–$50</SelectItem>
                  <SelectItem value="51-200">$51–$200</SelectItem>
                  <SelectItem value="201+">$201+</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
        </div>

        <div className="flex flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {isProductsPage && (
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-black text-sm hover:shadow-sm transition min-w-[140px]"
              onClick={() => setProductFormModal(true)}
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          )}

          <Select
            value={activeFilters.sortBy || "date"}
            onValueChange={(val) => handleFilterUpdate("sortBy", val)}
          >
            <SelectTrigger className={`${selectStyle} min-w-[150px]`}>
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              {isOrdersPage && (
                <>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="amount">Sort by Amount</SelectItem>
                  <SelectItem value="customer">Sort by Customer</SelectItem>
                  <SelectItem value="status">Sort by Status</SelectItem>
                </>
              )}
              {isProductsPage && (
                <>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="price">Sort by Price</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>

        </div>
      </div>
    </>
  );
};

export default FilterBar;