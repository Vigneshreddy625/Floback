import React, {useState, useEffect} from 'react';
import { CreditCard, Tag } from 'lucide-react';
import OrderSummary from './OrderSummary';

const CartSummary = ({
  cart,
  setIsCheckingOut,
  navigate,
}) => {
  return (
    <>
    <div className="w-full lg:w-96 bg-gray-50 dark:bg-neutral-900 px-6 py-6 lg:py-10">
      <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">SUMMARY</h2>

      <OrderSummary
        calculateSubtotal={cart.subtotal}
        calculateTotal={cart.total}
        calculateTax={cart.tax}
        shippingCosts={cart.shipping.cost}
      />

      <button
        onClick={() => setIsCheckingOut(true)}
        className="w-full bg-black dark:bg-white dark:text-black text-white py-3 mb-4 flex items-center justify-center gap-2"
      >
        <CreditCard size={16} />
        PROCEED TO CHECKOUT
      </button>

      <button
        onClick={() => navigate('/home')}
        className="w-full bg-gray-200 dark:bg-gray-800 dark:text-white text-black py-3"
      >
        CONTINUE SHOPPING
      </button>
    </div>
    </>
  );
};

export default CartSummary;
