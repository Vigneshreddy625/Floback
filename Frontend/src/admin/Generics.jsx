import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const GenericPage = () => {
  const location = useLocation();
  const pathName = location.pathname.substring(1);
  const pageTitle = pathName.charAt(0).toUpperCase() + pathName.slice(1) || "Dashboard"; // Fallback for root "/"

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 rounded-md">
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex items-center justify-center p-4">
          <div className="p-8 text-center max-w-sm">
            <BarChart3 size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {pageTitle} Content Here
            </h3>
            <p className="text-gray-500">
              This is a placeholder for the {pageTitle.toLowerCase()} section.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GenericPage;