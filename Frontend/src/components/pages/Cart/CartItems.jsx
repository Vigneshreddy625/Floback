import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';

const CartItems = ({ cartItems, removeItem, dispatch, fetchUserCart }) => {

  useEffect(() => {
    dispatch(fetchUserCart());
  },[dispatch, fetchUserCart, cartItems]);

  return (
    <>
      <div className="space-y-8">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 pb-6 border-b border-gray-100"
          >
            <img
              src={item.currentImageUrl}
              alt={item.currentTitle}
              className="w-20 h-20 md:w-24 md:h-24 object-cover cursor-pointer"
            />
            <div className="flex-grow">
              <h3 className="font-medium text-md text-gray-900">
                {item.currentTitle}
              </h3>
              <div className="text-sm text-gray-800 mt-1">
                <div className="flex items-center gap-2 mt-2">
                  <span>QTY:</span>
                  <div className="flex items-center border border-gray-300">
                    <span className="px-3 py-1">{item.quantity}</span>
                  </div>
                </div>
              </div>
              <div className="flex mt-3">
                <button
                  onClick={() => removeItem(item)}
                  className="text-gray-600 hover:text-red-600 flex items-center gap-1 text-sm"
                >
                  <Trash2 size={14} />
                  REMOVE
                </button>
              </div>
            </div>
            <div className="hidden md:flex flex-col items-end mr-6">
              <span className="text-gray-900">
                Rs.{item.currentPrice?.toFixed(2)}
              </span>
            </div>
            <div className="text-right flex flex-col items-end">
              <div className="text-gray-900 font-medium">
                Rs.{(item.currentPrice * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CartItems;
