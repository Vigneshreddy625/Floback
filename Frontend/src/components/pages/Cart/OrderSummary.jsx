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
        <span className="text-sm text-gray-700 dark:text-gray-300">Subtotal</span>
        <span className="text-sm text-gray-900 dark:text-white">Rs.{calculateSubtotal}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-700 dark:text-gray-300">Tax</span>
        <span className="text-sm text-gray-900 dark:text-white">Rs.{calculateTax}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-sm text-gray-700 dark:text-gray-300">Shipping</span>
        <span className="text-sm text-gray-900 dark:text-white">Rs.{shippingCosts}</span>
      </div>
      <hr className="mb-4 border-gray-200 dark:border-gray-700" />
      <div className="flex justify-between">
        <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
        <span className="text-lg font-semibold text-gray-900 dark:text-white">Rs.{calculateTotal}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
