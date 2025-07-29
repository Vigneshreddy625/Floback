import React, { useState } from 'react';
import { Package, ChevronRight, Edit, ChevronLeft } from "lucide-react";
import EditOrderStatusModal from '../EditOrderStatusModal';

const OrderTable = ({ 
  orders = [], 
  selectedOrder, 
  setSelectedOrder, 
  pagination = {}, 
  onPageChange 
}) => {
  const [editOrder, setEditOrder] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusClasses = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "delivered":
        return "bg-orange-50 text-orange-700 border border-orange-200";
      case "completed":
        return "bg-green-50 text-green-700 border border-green-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border border-yellow-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        ...(date.getFullYear() !== new Date().getFullYear() && { year: 'numeric' })
      });
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount) => {
    if (typeof amount === 'number') {
      return `$${amount.toFixed(2)}`;
    }
    return amount || '$0.00';
  };

  const PaginationControls = () => {
    if (!pagination || pagination.totalPages <= 1) return null;

    const { currentPage, totalPages, hasNext, hasPrev } = pagination;

    return (
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          {pagination.totalItems && (
            <span className="text-sm text-gray-500">
              ({pagination.totalItems} total orders)
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPrev}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNext}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {orders.map((order) => (
                <tr
                  key={order.id || order._id}
                  className={`hover:bg-gray-50 cursor-pointer ${
                    selectedOrder && (selectedOrder.id === order.id || selectedOrder._id === order._id) 
                      ? "bg-blue-50" : ""
                  }`}
                  onClick={() => setSelectedOrder(order)}
                  
                >
                  <td className="px-6 py-5 text-sm font-semibold text-gray-900">
                    {order.orderId || order.id || order._id}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-900">
                    <div className="flex items-center">
                      <img
                        src={order.customer?.avatar || order.user?.avatar || "https://placehold.co/40x40/cccccc/333333?text=CS"}
                        alt={order.customer?.name || order.user?.fullName || 'Customer'}
                        className="w-10 h-10 rounded-full mr-3 border-2 border-gray-100 shadow-sm"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/40x40/cccccc/333333?text=CS";
                        }}
                      />
                      <div className="font-medium text-gray-900">
                        {order.user?.fullName }
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Package className="w-4 h-4 text-gray-400 mr-2" />
                      {order.items?.length || order.orderItems?.length || 0} items
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm">
                    <span className={`px-3 py-1.5 inline-flex text-xs font-semibold rounded-full ${getStatusClasses(order.status || order.orderStatus)}`}>
                      {order.status || order.orderStatus || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-900">
                    {formatCurrency(order.total || order.totalAmount)}
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500 font-medium">
                    {formatDate(order.date || order.createdAt)}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditOrder(order);
                        setIsModalOpen(true);
                      }}
                    >
                      <Edit className="w-5 h-5 text-gray-400 mx-auto hover:text-gray-600 transition-colors" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile view */}
        <div className="lg:hidden">
          {orders.map((order, index) => (
            <div
              key={order.id || order._id}
              className={`border-b border-gray-100 hover:bg-gray-50/70 cursor-pointer transition-all duration-200 ${
                selectedOrder && (selectedOrder.id === order.id || selectedOrder._id === order._id) 
                  ? "bg-blue-50/80 border-l-4 border-blue-500" : ""
              } ${index === orders.length - 1 ? 'border-b-0' : ''}`}
              onClick={() => setSelectedOrder(order)}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900 mb-1">
                      {order.orderNumber || order.id || order._id}
                    </span>
                    <div className="flex items-center">
                      <Package className="w-3.5 h-3.5 text-gray-400 mr-1.5" />
                      <span className="text-xs text-gray-500 font-medium">
                        {order.items?.length || order.orderItems?.length || 0} items
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusClasses(order.status || order.orderStatus)}`}>
                      {order.status || order.orderStatus || 'Unknown'}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {formatDate(order.date || order.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={order.customer?.avatar || order.user?.avatar || "https://placehold.co/48x48/cccccc/333333?text=CS"}
                      alt={order.customer?.name || order.user?.name || 'Customer'}
                      className="w-12 h-12 rounded-full mr-3 border-2 border-gray-100 shadow-sm"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/48x48/cccccc/333333?text=CS";
                      }}
                    />
                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-0.5">
                        {order.customer?.name || order.user?.name || order.customerName || 'Unknown Customer'}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">Customer</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="text-right mr-3">
                      <div className="text-base font-bold text-gray-900 mb-0.5">
                        {formatCurrency(order.total || order.totalAmount)}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">Total</div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditOrder(order);
                        setIsModalOpen(true);
                      }}
                    >
                      <Edit className="w-5 h-5 text-gray-400 mx-auto hover:text-gray-600 transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}

        <PaginationControls />
      </div>
      
      <EditOrderStatusModal 
        order={editOrder} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default OrderTable;