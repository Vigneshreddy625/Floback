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
  ArrowLeft,
} from "lucide-react";

const Orders = () => {
  const dispatch = useDispatch();
  const { userOrders: orders, loading, error, userOrdersPagination } = useSelector((state) => state.orders);

  const [filterOpen, setFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const getStatusParam = (tab) => {
    switch (tab) {
      case "processing": return "Processing";
      case "transit": return "Shipped";
      case "delivered": return "Delivered";
      case "pending": return "Pending";
      case "cancelled": return "Cancelled";
      case "returned": return "Returned";
      case "all":
      default: return undefined;
    }
  };

  useEffect(() => {
    const params = { page, limit: 10 };
    const statusParam = getStatusParam(activeTab);
    if (statusParam) params.status = statusParam;
    dispatch(getUserOrders(params));
  }, [dispatch, activeTab, page]);

  const getStatusIcon = (status) => {
    const icons = {
      Delivered: <CheckCheck className="w-4 h-4 text-green-500" />,
      Shipped: <Truck className="w-4 h-4 text-blue-500" />,
      Processing: <ShoppingBag className="w-4 h-4 text-yellow-500" />,
      Cancelled: <X className="w-4 h-4 text-red-500" />,
      Returned: <RefreshCw className="w-4 h-4 text-purple-500" />,
      Pending: <Clock className="w-4 h-4 text-gray-500" />,
      default: <Package className="w-4 h-4 text-gray-500" />,
    };
    return icons[status] || icons.default;
  };

  const getStatusColor = (status) => {
    const colors = {
      Delivered: "text-green-600 bg-green-50",
      Shipped: "text-blue-600 bg-blue-50",
      Processing: "text-yellow-600 bg-yellow-50",
      Cancelled: "text-red-600 bg-red-50",
      Returned: "text-purple-600 bg-purple-50",
      Pending: "text-gray-600 bg-gray-50",
      default: "text-gray-600 bg-gray-50",
    };
    return colors[status] || colors.default;
  };

  const formatDate = (date) => new Date(date).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });
  const formatTime = (date) => new Date(date).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: true });

  const filteredOrders = orders?.filter(order =>
    order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  const isLoading = loading?.getUserOrders;
  const hasError = error?.getUserOrders;

  return (
    <div className="max-w-2xl mx-auto text-sm min-h-screen">
      <div className="sticky top-0 z-10 bg-white py-2">
        <div className="flex justify-between items-center bg-white px-2 py-4 shadow-sm border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <button onClick={() => window.history.back()} ><ArrowLeft/></button>
            <div className="flex flex-col space-y-1">
            <h1 className="text-lg font-bold text-slate-800">My Orders</h1>
            <p className="text-xs text-slate-500">
              {userOrdersPagination?.totalOrders || 0} orders from all time
            </p>
            </div>
          </div>
          <button onClick={() => setFilterOpen(!filterOpen)} className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-700">
            <Filter className="w-3 h-3" /> <span>Filter</span>
          </button>
        </div>

        {filterOpen && (
          <div className="flex space-x-2 px-4 mt-4 mb-2 overflow-x-auto no-scrollbar">
            {['all','pending','processing','transit','delivered','cancelled','returned'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
                  activeTab === tab ? `bg-slate-800 text-white shadow-sm` : `bg-white text-slate-700 hover:bg-slate-50 border-slate-200`
                }`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {isLoading && (
        <div className="text-center py-16">
          <div className="animate-spin w-8 h-8 border-2 border-slate-200 border-t-slate-800 rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading orders...</p>
        </div>
      )}

      {hasError && (
        <div className="text-center py-16">
          <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-6 h-6 text-rose-600" />
          </div>
          <p className="text-rose-600 font-medium mb-2">Error: {hasError}</p>
          <p className="text-slate-500">Please try again later.</p>
        </div>
      )}

      {!isLoading && !hasError && filteredOrders.length > 0 && (
        <div className="space-y-4 pb-6 px-4">
          {filteredOrders.map((order) => (
            <div key={order.orderId} className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.orderStatus)}
                  <span className={`${getStatusColor(order.orderStatus)} px-3 py-1 rounded-full text-xs font-medium border`}>
                    {order.orderStatus}
                  </span>
                </div>
                <div className="flex flex-wrap justify-end gap-2 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> <span>{formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> <span>{formatTime(order.createdAt)}</span>
                  </div>
                  <span className="text-slate-800 font-semibold bg-slate-100 px-3 py-1 rounded-full">
                    {order.orderId}
                  </span>
                </div>
              </div>

              {order.items.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 rounded-xl p-4 mb-3 border">
                  <div className="flex items-start gap-4">
                    {item.imageUrl && <img src={item.imageUrl} alt={item.title} className="w-16 h-16 object-cover rounded-lg border" />}
                    <div>
                      <p className="font-semibold text-xs text-slate-800 mb-1">{item.title}</p>
                      <p className="text-xs text-slate-500 mb-1">Type: {item.itemType}</p>
                      <p className="text-xs font-semibold text-slate-700 bg-white px-2 py-1 rounded-md border">
                        ₹{item.price.toFixed(2)} × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 mt-2 sm:mt-0" />
                </div>
              ))}

              <div className="mt-4 p-4 bg-slate-50 rounded-xl border space-y-1">
                <p className="text-xs text-slate-700 font-semibold">
                  Total: <span className="text-slate-900">₹{order.total.toFixed(2)}</span>
                </p>
                <p className="text-xs text-slate-700">
                  Payment Method: <span className="font-medium">{order.paymentMethod}</span>
                </p>
                <p className="text-xs text-slate-700">
                  Shipping Address: <span className="font-medium">{order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</span>
                </p>
                {order.shippedAt && order.orderStatus === "Shipped" && (
                  <p className="text-xs text-sky-700 bg-sky-50 px-2 py-1 rounded-md border inline-block">
                    Shipped On: {formatDate(order.shippedAt)}
                  </p>
                )}
                {order.deliveredAt && order.orderStatus === "Delivered" && (
                  <p className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border inline-block">
                    Delivered On: {formatDate(order.deliveredAt)}
                  </p>
                )}
                {order.cancelledAt && order.orderStatus === "Cancelled" && (
                  <p className="text-xs text-rose-700 bg-rose-50 px-2 py-1 rounded-md border inline-block">
                    Cancelled On: {formatDate(order.cancelledAt)}
                  </p>
                )}
              </div>

              {order.orderStatus === "Delivered" && (
                <div className="mt-4 text-right">
                  <button className="text-sky-600 hover:text-sky-700 text-xs font-semibold bg-sky-50 hover:bg-sky-100 px-4 py-2 rounded-lg border border-sky-200">
                    Rate & Review
                  </button>
                </div>
              )}
            </div>
          ))}

          {userOrdersPagination?.totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-6">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={userOrdersPagination?.currentPage === 1}
                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border rounded-lg disabled:opacity-50 text-xs font-medium"
              >
                Previous
              </button>
              <span className="text-sm px-4 py-2 bg-slate-100 rounded-lg">
                Page {userOrdersPagination?.currentPage} of {userOrdersPagination?.totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, userOrdersPagination?.totalPages))}
                disabled={userOrdersPagination?.currentPage === userOrdersPagination?.totalPages}
                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border rounded-lg disabled:opacity-50 text-xs font-medium"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {!isLoading && !hasError && filteredOrders.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-slate-400" />
          </div>
          <p className="font-semibold text-slate-800 mb-2">No orders found</p>
          <p className="text-slate-500">Try adjusting your filters or search</p>
        </div>
      )}
    </div>
  );
};

export default Orders;