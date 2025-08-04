import React from 'react';

const OrderSummary = ({
  calculateSubtotal,
  calculateTotal,
  calculateTax,
  shippingCosts,
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-700">Subtotal</span>
        <span className="text-sm text-gray-900">Rs.{calculateSubtotal}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-700">Tax</span>
        <span className="text-sm text-gray-900">Rs.{(calculateTax).toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-sm text-gray-700">Shipping</span>
        <span className="text-sm text-gray-900">Rs.{shippingCosts}</span>
      </div>
      <hr className="mb-4 border-gray-200 dark:border-gray-700" />
      <div className="flex justify-between">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <span className="text-lg font-semibold text-gray-900">Rs.{(calculateTotal).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
