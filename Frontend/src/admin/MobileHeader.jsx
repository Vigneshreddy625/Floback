// src/components/MobileHeader.jsx
import React from "react";
import { Mail, Search } from "lucide-react";

const MobileHeader = ({ onMenuClick }) => {
  return (
    <div className="lg:hidden p-4 bg-white shadow-md flex justify-between items-center">
      <button onClick={onMenuClick}>
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex items-center gap-4">
        <div className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <Mail size={20} className="text-gray-600" />
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <Search size={20} className="text-gray-600" />
        </div>
        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
            alt="Kristina Evans"
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/32x32/cccccc/333333?text=KE";
            }}
          />
          <div className="text-sm hidden sm:block">
            <div className="font-medium text-gray-900">Kristina Evans</div>
            <div className="text-gray-500 text-xs">kris.evans@gmail.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;