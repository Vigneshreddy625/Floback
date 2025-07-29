import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import OrderTable from './Orders/OrderTable';
import FilterBar from './Filter';
import { 
  fetchFilteredOrders,
  selectFilteredOrders,
  selectFilteredOrdersLoading,
  selectFilteredOrdersError,
  selectFilteredOrdersPagination,
  selectActiveFilters,
  updateActiveFilters
} from "../redux/Orders/orderSlice";

const OrdersPage = () => {
  const { selectedOrder, setSelectedOrder } = useOutletContext();
  const dispatch = useDispatch();
  
  // Redux selectors
  const filteredOrders = useSelector(selectFilteredOrders);
  const loading = useSelector(selectFilteredOrdersLoading);
  const error = useSelector(selectFilteredOrdersError);
  const pagination = useSelector(selectFilteredOrdersPagination);
  const activeFilters = useSelector(selectActiveFilters);

  // Fetch filtered orders on component mount and when active filters change
  useEffect(() => {
    dispatch(fetchFilteredOrders(activeFilters));
  }, [dispatch, activeFilters]);

  // Handle filter updates
  const handleFilterChange = (filterUpdates) => {
    // Reset to page 1 when filters change (except for page changes)
    const updatedFilters = {
      ...activeFilters,
      ...filterUpdates,
      ...(filterUpdates.page ? {} : { page: 1 })
    };
    
    dispatch(updateActiveFilters(updatedFilters));
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    handleFilterChange({ page: newPage });
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 px-4 overflow-y-auto">
        <FilterBar 
          isOrdersPage={true} 
          isProductsPage={false}
          onFilterChange={handleFilterChange}
          activeFilters={activeFilters}
        />
        
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800">Error loading orders: {error}</p>
            <button 
              onClick={() => dispatch(fetchFilteredOrders(activeFilters))}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}
        
        {/* Orders table */}
        {!loading && !error && (
          <OrderTable
            orders={filteredOrders}
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