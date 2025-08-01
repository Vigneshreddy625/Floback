import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllOrdersFilters,
  getAllOrders,
} from "../../redux/Orders/orderSlice";

const OrderFilter = ({ onFilterChange, activeFilters = {} }) => {
  const searchInputRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const dispatch = useDispatch();
  const filters = useSelector(selectAllOrdersFilters);

  const selectStyle =
    "w-full p-2 bg-white text-black border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500";

  // useEffect(() => {
  //     dispatch(getAllOrders(filters))
  // }, [filters])

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
            placeholder={"Search orders..."}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-black focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            onChange={handleSearchChange}
          />

          <select
            className={selectStyle}
            value={activeFilters.status || "any"}
            onChange={(e) =>
              handleFilterUpdate(
                "status",
                e.target.value === "any" ? "" : e.target.value
              )
            }
          >
            <option value="any">Any</option>
            <option value="processing">Paid</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
            <option value="shipped">Shipped</option>
            <option value="returned">Returned</option>
            <option value="failed">Returned</option>
            <option value="cancelled">Cancellled</option>
          </select>
        </div>

        <div className="flex flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <select
            className={`${selectStyle} min-w-[150px]`}
            value={activeFilters.sortBy || "date"}
            onChange={(e) => handleFilterUpdate("sortBy", e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default OrderFilter;
