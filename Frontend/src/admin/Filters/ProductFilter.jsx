import React, { useState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import AddProduct from "../Modals/AddProduct";

const ProductFilter = ({
  onFilterChange,
  activeFilters = {},
}) => {
  const [productFormModal, setProductFormModal] = useState(false);
  const searchInputRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const selectStyle =
    "w-full bg-white text-black border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 z-50";
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

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 w-full">
          <input
            type="text"
            ref={searchInputRef}
            placeholder={"Search products..."}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-black focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            onChange={handleSearchChange}
          />

          <select
            value={activeFilters.category || "any"}
            onChange={(e) =>
              handleFilterUpdate(
                "category",
                e.target.value === "any" ? "" : e.target.value
              )
            }
            className={selectStyle}
          >
            <option value="any">Any</option>
            <option value="Ready-Made Curtains">Ready-Made Curtains</option>
            <option value="Bed & Bath">Bed & Bath</option>
            <option value="Sofa Upholstery">Sofa Upholstery</option>
            <option value="Curtains & Blinds">Curtains & Blinds</option>
            <option value="Wallpaper">Wallpaper</option>
          </select>
        </div>

        <div className="flex flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-black text-sm hover:shadow-sm transition min-w-[140px]"
            onClick={() => setProductFormModal(true)}
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>
      <AddProduct
        isOpen={productFormModal}
        onClose={() => setProductFormModal(false)}
      />
    </>
  );
};

export default ProductFilter;
