import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import OrderTable from "./Orders/OrderTable";
import FilterBar from "./Filter";
import { Package } from "lucide-react";

import {
  getAllOrders,
  selectAllOrders,
  selectAllOrdersPagination,
  selectAllOrdersFilters,
  selectOrdersLoading,
  selectOrdersError,
  setAllOrdersFilters,
} from "../redux/Orders/orderSlice";
import OrderFilter from "./Filters/OrderFilter";

const OrdersPage = () => {
  const { selectedOrder, setSelectedOrder } = useOutletContext();
  const dispatch = useDispatch();

  const orders = useSelector(selectAllOrders);
  const loading = useSelector(
    (state) => selectOrdersLoading(state).getAllOrders
  );
  const error = useSelector((state) => selectOrdersError(state).getAllOrders);
  const pagination = useSelector(selectAllOrdersPagination);
  const filters = useSelector(selectAllOrdersFilters);

  const fetchData = useCallback(() => {
    dispatch(getAllOrders(filters));
  }, [dispatch, JSON.stringify(filters)]); 

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (
      selectedOrder &&
      orders.length > 0 &&
      !orders.some((order) => order._id === selectedOrder._id)
    ) {
      setSelectedOrder(null);
    } else if (selectedOrder && orders.length === 0 && !loading && !error) {
      setSelectedOrder(null);
    }
  }, [orders, selectedOrder, setSelectedOrder, loading, error]);

  const handleFilterChange = (updatedFilters) => {
    dispatch(
      setAllOrdersFilters({
        ...filters,
        ...updatedFilters,
        ...(updatedFilters.page === undefined ? { page: 1 } : {}),
      })
    );
  };

  const handlePageChange = (newPage) => {
    handleFilterChange({ page: newPage });
  };

  const handleRetry = () => {
    dispatch(clearError("getAllOrders"));
    fetchOrders();
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <main className="flex-1 px-4 overflow-y-auto">
        <OrderFilter
          onFilterChange={handleFilterChange}
          activeFilters={filters}
        />

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
            <p className="ml-4 text-gray-600">Loading orders...</p>
          </div>
        )}

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">
              Failed to load orders: {error}
            </span>
            <div className="mt-3">
              <button
                onClick={handleRetry}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="p-12 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-200 mt-4">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters.
            </p>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <OrderTable
            orders={orders}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
};

export default OrdersPage;
