import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart3, Package, Users, Box } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { getAllOrders, selectAllOrders,selectAllOrdersPagination } from "../redux/Orders/orderSlice";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
};

const InfoCard = ({ title, value, icon: Icon, gradient }) => (
  <div
    className={`p-3 md:p-6 rounded-2xl text-white shadow-lg transform transition hover:scale-105 ${gradient}`}
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-medium opacity-80">{title}</p>
        <h3 className="text-lg md:text-3xl font-bold tracking-wide mt-1">
          {value}
        </h3>
      </div>
      <div className="p-3 bg-white/20 backdrop-blur-md rounded-full">
        {Icon && <Icon size={28} className="text-white" />}
      </div>
    </div>
  </div>
);

const OrdersTable = ({ orders, formatDate }) => (
  <div className="bg-white rounded-3xl px-6 py-4 shadow-xl border border-gray-200">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-800">🧾 Recent Orders</h2>
      <Link
        to="/admin/orders"
        className="text-sm text-blue-600 hover:underline font-medium"
      >
        View All
      </Link>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3">Order ID</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order.orderId} className="hover:bg-gray-50 transition">
              <td className="px-4 py-4 font-medium text-gray-800">
                {order.orderId}
              </td>
              <td className="px-4 py-4">{order.user.fullName}</td>
              <td className="px-4 py-4 text-gray-500">
                {formatDate(order.createdAt || order.date)}
              </td>
              <td className="px-4 py-4">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    statusColors[order.orderStatus]
                  }`}
                >
                  {order.orderStatus}
                </span>
              </td>
              <td className="px-4 py-4 text-right font-medium text-gray-800">
                {order.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ProductsTable = ({ orders, formatDate }) => (
  <div className="bg-white rounded-3xl px-4 py-4 shadow-xl border border-gray-200">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-800">
        🛍️ Recently Bought Products
      </h2>
      <Link
        to="/admin/products"
        className="text-sm text-blue-600 hover:underline font-medium"
      >
        More...
      </Link>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-4 py-3">Order ID</th>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Product ID</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3 text-right">Price</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-4">{order.orderId}</td>
              <td className="px-4 py-2">
                <span className="font-medium text-gray-800">
                  {order.items[0].title}
                </span>
              </td>
              <td className="px-4 py-4">{order.items[0].itemId}</td>
              <td className="px-4 py-4 text-gray-500">
                {formatDate(order.createdAt || order.date)}
              </td>
              <td className="px-4 py-4 text-right font-medium text-gray-800">
                {order.items[0].price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

function DashboardPage() {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders); 
  const pagination = useSelector(selectAllOrdersPagination)
  const fetchData = useCallback(() => {
    dispatch(getAllOrders({ limit: 5 }));
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function calculateTotalAmount(ordersArray) {
    return ordersArray.reduce((sum, order) => sum + order.total, 0);
  }

  console.log(orders);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        ...(date.getFullYear() !== new Date().getFullYear() && {
          year: "numeric",
        }),
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-tr from-[#f8fafc] to-[#e2e8f0] min-h-screen space-y-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
        <InfoCard
          title="Total Revenue"
          value={calculateTotalAmount(orders)}
          icon={BarChart3}
          gradient="bg-gradient-to-br from-[#667eea] to-[#764ba2]"
        />
        <InfoCard
          title="Total Orders"
          value={pagination.totalItems}
          icon={Package}
          gradient="bg-gradient-to-br from-[#f7971e] to-[#ffd200]"
        />
        {/* <InfoCard
          title="Users"
          value="750"
          icon={Users}
          gradient="bg-gradient-to-br from-[#56ab2f] to-[#a8e063]"
        />
        <InfoCard
          title="Products"
          value="240"
          icon={Box}
          gradient="bg-gradient-to-br from-[#ee0979] to-[#ff6a00]"
        /> */}
      </div>

      <div className="w-full">
        <OrdersTable orders={orders} formatDate={formatDate} />
      </div>

      <div className="w-full">
        <ProductsTable orders={orders} formatDate={formatDate} />
      </div>
    </div>
  );
}

export default DashboardPage;
