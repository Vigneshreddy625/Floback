import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../redux/Orders/orderSlice"; 
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
  const {
    userOrders: orders,
    loading,
    error,
    userOrdersPagination,
  } = useSelector((state) => state.orders);

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

    dispatch(getUserOrders(params));
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
    const options = { weekday: "short", day: "numeric", month: "short" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  const filteredOrdersBySearch =
    orders?.filter(
      (order) =>
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    ) || [];

  const isLoading = loading?.getUserOrders;
  const hasError = error?.getUserOrders;

  return (
    <div className="max-w-2xl px-2 text-sm min-h-screen">
      <div className="sticky top-0 z-10 bg-white py-2">
        <div className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div>
            <h1 className="text-lg font-bold text-slate-800">My Orders</h1>
            <p className="text-xs text-slate-500 mt-1">
              {userOrdersPagination?.totalOrders || 0} orders from all time
            </p>
          </div>

          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors text-xs font-medium text-slate-700"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="w-3 h-3" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {(filterOpen) && (
          <div className="flex space-x-2 mt-4 mb-2 overflow-x-auto no-scrollbar">
            <button
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === "all"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Orders
            </button>
            <button
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === "pending"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
              }`}
              onClick={() => setActiveTab("pending")}
            >
              Pending
            </button>
            <button
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === "processing"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-amber-50 border border-slate-200"
              }`}
              onClick={() => setActiveTab("processing")}
            >
              Processing
            </button>
            <button
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === "transit"
                  ? "bg-sky-500 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-sky-50 border border-slate-200"
              }`}
              onClick={() => setActiveTab("transit")}
            >
              Shipped
            </button>
            <button
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === "delivered"
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200"
              }`}
              onClick={() => setActiveTab("delivered")}
            >
              Delivered
            </button>
            <button
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === "cancelled"
                  ? "bg-rose-500 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-rose-50 border border-slate-200"
              }`}
              onClick={() => setActiveTab("cancelled")}
            >
              Cancelled
            </button>
            <button
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === "returned"
                  ? "bg-violet-500 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-violet-50 border border-slate-200"
              }`}
              onClick={() => setActiveTab("returned")}
            >
              Returned
            </button>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="animate-spin w-8 h-8 border-2 border-slate-200 border-t-slate-800 rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading orders...</p>
        </div>
      )}

      {hasError && (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-rose-200">
          <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-6 h-6 text-rose-600" />
          </div>
          <p className="text-rose-600 font-medium mb-2">Error: {hasError}</p>
          <p className="text-slate-500">Please try again later.</p>
        </div>
      )}

      {!isLoading && !hasError && filteredOrdersBySearch.length > 0 ? (
        <div className="space-y-4 pb-6">
          {filteredOrdersBySearch.map((order) => (
            <div
              key={order.orderId}
              className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-2 hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.orderStatus)}
                  <span
                    className={`${getStatusColor(
                      order.orderStatus
                    )} px-3 py-1 rounded-full text-xs font-medium border`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-right">
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatTime(order.createdAt)}</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-800 font-semibold bg-slate-100 px-3 py-1 rounded-full">
                    {order.orderId}
                  </span>
                </div>
              </div>

              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-slate-50 rounded-xl p-4 mb-3 border border-slate-100"
                >
                  <div className="flex items-center gap-4">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg border border-slate-200"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-xs text-slate-800 mb-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500 mb-1">
                        Type: {item.itemType}
                      </p>
                      <p className="text-xs font-semibold text-slate-700 bg-white px-2 py-1 rounded-md border border-slate-200">
                        ₹{item.price.toFixed(2)} × {item.quantity} = ₹
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="grid grid-cols-1 gap-2">
                  <p className="text-xs text-slate-700 font-semibold">
                    Total:{" "}
                    <span className="text-slate-900">
                      ₹{order.total.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-xs text-slate-700">
                    Payment Method:{" "}
                    <span className="font-medium">{order.paymentMethod}</span>
                  </p>
                  <p className="text-xs text-slate-700">
                    Shipping Address:{" "}
                    <span className="font-medium">
                      {order.shippingAddress.street},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state},{" "}
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                    </span>
                  </p>
                  {order.orderStatus === "Shipped" && order.shippedAt && (
                    <p className="text-xs text-sky-700 bg-sky-50 px-2 py-1 rounded-md border border-sky-200 inline-block">
                      Shipped On: {formatDate(order.shippedAt)}
                    </p>
                  )}
                  {order.orderStatus === "Delivered" && order.deliveredAt && (
                    <p className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 inline-block">
                      Delivered On: {formatDate(order.deliveredAt)}
                    </p>
                  )}
                  {order.orderStatus === "Cancelled" && order.cancelledAt && (
                    <p className="text-xs text-rose-700 bg-rose-50 px-2 py-1 rounded-md border border-rose-200 inline-block">
                      Cancelled On: {formatDate(order.cancelledAt)}
                    </p>
                  )}
                </div>
              </div>

              {/* <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
                <div>
                  {order.orderStatus === "Delivered" && (
                    <button className="text-sky-600 hover:text-sky-700 text-xs font-semibold bg-sky-50 hover:bg-sky-100 px-4 py-2 rounded-lg border border-sky-200 transition-colors">
                      Rate & Review
                    </button>
                  )}
                </div>
              </div> */}
            </div>
          ))}

          {userOrdersPagination?.totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={userOrdersPagination?.currentPage === 1}
                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium text-slate-700 transition-colors"
              >
                Previous
              </button>
              <span className="text-sm font-medium text-slate-700 px-4 py-2 bg-slate-100 rounded-lg">
                Page {userOrdersPagination?.currentPage} of{" "}
                {userOrdersPagination?.totalPages}
              </span>
              <button
                onClick={() =>
                  setPage((prev) =>
                    Math.min(prev + 1, userOrdersPagination?.totalPages)
                  )
                }
                disabled={
                  userOrdersPagination?.currentPage ===
                  userOrdersPagination?.totalPages
                }
                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium text-slate-700 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : !isLoading && !hasError && filteredOrdersBySearch.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-slate-400" />
          </div>
          <p className="font-semibold text-slate-800 mb-2">No orders found</p>
          <p className="text-slate-500">Try adjusting your filters or search</p>
        </div>
      ) : null}
    </div>
  );
};

export default Orders;
