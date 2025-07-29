import React from 'react';
import { X } from "lucide-react";
import OrderDetailCard from './OrderDetailCard'; // Your existing component

const OrderDetailModal = ({ order, onClose }) => {
  return (
    <div className="xl:hidden fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="max-w-xl w-full mx-4 relative">
        <div className="relative">
          <OrderDetailCard order={order} onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;