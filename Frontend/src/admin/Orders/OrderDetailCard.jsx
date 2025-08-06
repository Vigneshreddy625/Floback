import React from "react";
import { X, Mail, Phone, MessageCircle, RotateCcw, MapPin } from "lucide-react";

const OrderDetailCard = ({ order, onClose }) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    const formattedTime = date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${formattedDate}`;
  };

  return (
    <div className="w-full h-full rounded-2xl bg-white border border-gray-200 shadow-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-white to-blue-50 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Order #{order.orderId}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
              {order.orderStatus}
            </span>
            <span className="text-sm text-gray-500">
              {formatDateTime(order.createdAt)}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X size={20} className="text-gray-500" />
        </button>
      </div>

      <div className="px-6 py-5 text-center border-b border-gray-100">
        <h3 className="text-base font-medium text-gray-800">
          {order.user.fullName}
        </h3>
        <p className="text-sm text-gray-600">{order.user.email}</p>
      </div>

      <div className="px-6 py-5 flex-1 overflow-y-auto">
        <h4 className="text-sm font-semibold text-gray-800 mb-4">
          Order Items
        </h4>
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='48' height='48' fill='%23f3f4f6'/%3E%3Cpath d='M24 14a2 2 0 0 1 2 2v8h8a2 2 0 1 1 0 4h-8v8a2 2 0 1 1-4 0v-8h-8a2 2 0 1 1 0-4h8v-8a2 2 0 0 1 2-2z' fill='%236b7280'/%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {item.title}
                </p>
                <p className="text-sm text-gray-700 mt-1">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {order.shippingAddress && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <MapPin size={16} className="text-blue-500" />
              Delivery Address
            </h4>
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-gray-900 font-medium">
                {order.shippingAddress.street}
              </p>
              <p className="text-sm text-gray-700">
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.postalCode}
              </p>
              <p className="text-sm text-gray-700">
                {order.shippingAddress.country}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-6">
          <span className="text-lg font-semibold text-gray-800">Total</span>
          <span className="text-lg font-bold text-blue-700">
            ₹{order.total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailCard;
