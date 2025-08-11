import React from 'react';
import { Mail, Search, Filter, User } from "lucide-react";
import { useLocation } from 'react-router-dom';
import { useAuth } from '../authContext/useAuth';

const Header = () => {
  const { user } = useAuth();
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const lastSegment = pathSegments[pathSegments.length - 1] || 'Dashboard';
  const pageTitle = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 flex-shrink-0">
      <div className="flex items-center justify-between flex-wrap gap-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">{pageTitle || "Dashboard"}</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center">
            <User
              className="w-6 h-6"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/32x32/cccccc/333333?text=KE" }}
            />
            </div>
            <div className="text-sm hidden sm:block">
              <div className="font-medium text-gray-900">
                {user.fullName}
              </div>
              <div className="text-gray-500 text-xs">
                {user.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
