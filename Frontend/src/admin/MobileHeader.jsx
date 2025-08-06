// src/components/MobileHeader.jsx
import React from "react";
import { Mail, Search, User } from "lucide-react";
import { useAuth } from "../authContext/useAuth";

const MobileHeader = ({ onMenuClick }) => {
  const { user } = useAuth();
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

      <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center">
            <User
              className="w-6 h-6"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/32x32/cccccc/333333?text=KE" }}
            />
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-900">
                {user.fullName}
              </div>
              <div className="text-gray-500 text-xs">
                {user.email}
              </div>
            </div>
          </div>
    </div>
  );
};

export default MobileHeader;