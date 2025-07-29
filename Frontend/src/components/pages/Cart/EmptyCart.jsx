import React from 'react';
import { ShoppingBag, ChevronLeft } from 'lucide-react';

const EmptyCart = ({ navigate }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-white dark:bg-black">
      <ShoppingBag size={64} className="text-gray-400 mb-4" />
      <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Your shopping bag is empty</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Looks like you haven't added any items yet</p>
      <button
        className="px-6 py-3 bg-black rounded-full dark:bg-white dark:text-black text-white flex items-center gap-2"
        onClick={() => navigate("/home")}
      >
        <ChevronLeft size={16} />
        Continue Shopping
      </button>
    </div>
  );
};

export default EmptyCart;