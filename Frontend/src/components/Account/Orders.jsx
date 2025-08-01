import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/Orders/orderSlice";
import {
  Search,
  Filter,
  Package,
  ChevronRight,
  Calendar,
  Clock,
  X,
  CheckCheck,
  Truck,
  ShoppingBag,
  RefreshCw,
} from "lucide-react";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, status, error, totalOrders, currentPage, totalPages } = useSelector((state) => state.orders);

  const [filterOpen, setFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1); 

  const getStatusParam = (tab) => {
    switch (tab) {
      case "processing":
        return "Processing";
      case "transit":
        return "Shipped"; 
      case "delivered":
        return "Delivered";
      case "pending": 
        return "Pending";
      case "cancelled": 
        return "Cancelled";
      case "returned": 
        return "Returned";
      case "all":
      default:
        return undefined; 
    }
  };

  useEffect(() => {
    const params = {
      page: page,
      limit: 10,
    };

    const statusParam = getStatusParam(activeTab);
    if (statusParam) {
      params.status = statusParam;
    }
    
    dispatch(fetchOrders(params));
  }, [dispatch, activeTab, page]); 


  const getStatusIcon = (orderStatus) => {
    switch (orderStatus) {
      case "Delivered":
        return <CheckCheck className="w-4 h-4 text-green-500" />;
      case "Shipped": 
        return <Truck className="w-4 h-4 text-blue-500" />;
      case "Processing":
        return <ShoppingBag className="w-4 h-4 text-yellow-500" />;
      case "Cancelled":
        return <X className="w-4 h-4 text-red-500" />;
      case "Returned":
        return <RefreshCw className="w-4 h-4 text-purple-500" />;
      case "Pending":
        return <Clock className="w-4 h-4 text-gray-500" />; 
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (orderStatus) => {
    switch (orderStatus) {
      case "Delivered":
        return "text-green-600 bg-green-50";
      case "Shipped":
        return "text-blue-600 bg-blue-50";
      case "Processing":
        return "text-yellow-600 bg-yellow-50";
      case "Cancelled":
        return "text-red-600 bg-red-50";
      case "Returned":
        return "text-purple-600 bg-purple-50";
      case "Pending":
        return "text-gray-600 bg-gray-50"; 
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  return (
    <div className="max-w-2xl px-4 text-xs">
      <div className="sticky top-0 bg-white dark:bg-black z-10 pb-2">
        <div className="flex justify-between items-center mb-3 border-b pb-2">
          <div>
            <h1 className="text-base font-bold">My Orders</h1>
            <p className="text-xs text-gray-500">
              {totalOrders} orders from all time
            </p>
          </div>

          <div className="flex gap-2">
            <button
              className="flex items-center gap-1 px-3 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-xs"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="w-3 h-3" />
              <span className="text-xs">Filter</span>
            </button>
          </div>
        </div>

        
        {(filterOpen || true) && ( 
          <div className="flex space-x-1 mb-3 overflow-x-auto pb-1 no-scrollbar">
            <button
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                activeTab === "all"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 dark:bg-gray-300 text-gray-800"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Orders
            </button>
            <button
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                activeTab === "pending"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 dark:bg-gray-300 text-gray-800"
              }`}
              onClick={() => setActiveTab("pending")}
            >
              Pending
            </button>
            <button
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                activeTab === "processing"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100 dark:bg-gray-300 text-gray-800"
              }`}
              onClick={() => setActiveTab("processing")}
            >
              Processing
            </button>
            <button
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                activeTab === "transit"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 dark:bg-gray-300 text-gray-800"
              }`}
              onClick={() => setActiveTab("transit")}
            >
              In Transit
            </button>
            <button
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                activeTab === "delivered"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 dark:bg-gray-300 text-gray-800"
              }`}
              onClick={() => setActiveTab("delivered")}
            >
              Delivered
            </button>
            <button
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                activeTab === "cancelled"
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 dark:bg-gray-300 text-gray-800"
              }`}
              onClick={() => setActiveTab("cancelled")}
            >
              Cancelled
            </button>
            <button
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                activeTab === "returned"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100 dark:bg-gray-300 text-gray-800"
              }`}
              onClick={() => setActiveTab("returned")}
            >
              Returned
            </button>
          </div>
        )}
      </div>

      {status === 'loading' && (
        <div className="text-center py-10">
          <p>Loading orders...</p>
        </div>
      )}

      {status === 'failed' && (
        <div className="text-center py-10 text-red-500">
          <p>Error: {error}</p>
          <p>Please try again later.</p>
        </div>
      )}

      {status === 'succeeded' && orders.length > 0 ? (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="border rounded-lg shadow-sm p-3 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.orderStatus)}
                  <span
                    className={`${getStatusColor(
                      order.orderStatus
                    )} px-2 py-0.5 rounded-full text-xs font-medium`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-700 font-medium">
                    {order.orderId} 
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(order.createdAt)}</span>
                    <Clock className="w-3 h-3 ml-1" />
                    <span>{formatTime(order.createdAt)}</span>
                  </div>
                </div>
              </div>

              {order.items.map((item) => (
                <div key={item._id} className="flex items-center justify-between border rounded-md p-2 mb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-xs">{item.productId.title}</p>
                      <p className="text-xs text-gray-500">
                        Brand: {item.productId.brand}
                      </p>
                      <p className="text-xs font-semibold mt-1">
                        ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}

              <div className="mt-2 p-2 rounded-md">
                <p className="text-xs text-gray-700">
                  Total: ${order.total.toFixed(2)}
                </p>
                <p className="text-xs text-gray-700">
                  Payment Method: {order.paymentMethod}
                </p>
                <p className="text-xs text-gray-700">
                  Shipping Address: {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>
                {order.orderStatus === "Shipped" && order.shippedAt && (
                  <p className="text-xs text-blue-600">
                    Shipped On: {formatDate(order.shippedAt)}
                  </p>
                )}
                {order.orderStatus === "Delivered" && order.deliveredAt && (
                  <p className="text-xs text-green-600">
                    Delivered On: {formatDate(order.deliveredAt)}
                  </p>
                )}
                {order.orderStatus === "Cancelled" && order.cancelledAt && (
                  <p className="text-xs text-red-600">
                    Cancelled On: {formatDate(order.cancelledAt)}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center mt-3 pt-2 border-t">
                <div>
                  {order.orderStatus === "Delivered" && (
                    <button className="text-blue-600 text-xs font-medium">
                      Rate & Review
                    </button>
                  )}
                </div>
                <button className="text-blue-600 text-xs font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (status === 'succeeded' && filteredOrdersBySearch.length === 0) ? (
        <div className="text-center py-10">
          <Package className="w-10 h-10 mx-auto text-gray-400 mb-2" />
          <p className="font-medium">No orders found</p>
          <p className="text-gray-500 mt-1">
            Try adjusting your filters or search
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Orders;