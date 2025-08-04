import React from 'react';
import { ShoppingBag, ChevronLeft } from 'lucide-react';
import Header from '../../Layout/Header';

const EmptyCart = ({ navigate }) => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="max-w-md mx-auto px-4 flex flex-col justify-center items-center text-center min-h-[70vh]">
        <ShoppingBag size={64} className="text-gray-400 mb-6" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Your shopping bag is empty
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Looks like you haven't added any items yet.
        </p>
        <button
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:opacity-90 transition"
          onClick={() => navigate("/home")}
        >
          <ChevronLeft size={16} />
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;