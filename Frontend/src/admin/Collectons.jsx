import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight, Edit, Plus } from "lucide-react";
import useCollections from "../hooks/useCollection";

import {
  getAllCollections, 
  setFilters,
  clearError,
  updateCollection,
  selectCollections, 
  selectCollectionsLoading, 
  selectCollectionsError, 
  selectCollectionsFilters, 
} from "../redux/Collections/collectionSlice"; 
import AddCollection from "./Modals/AddCollection";

const AdminCollectionsList = () => {
  const dispatch = useDispatch();
  const {collections} = useCollections();

  const collectionsState = useSelector(selectCollections); 
  const generalLoading = useSelector(selectCollectionsLoading); 
  const generalError = useSelector(selectCollectionsError); 
  const currentFilters = useSelector(selectCollectionsFilters); 
  const totalCollections = collections.totalDocs;
  const currentPage = collectionsState.page;
  const totalPages = collectionsState.totalPages; 
  const operationLoading = generalLoading; 
  const operationError = generalError;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = useCallback(() => {
    dispatch(getAllCollections());
  }, [dispatch]);

  useEffect(() => {
    fetchData(currentFilters);
  }, [currentFilters, fetchData]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setFilters({ ...currentFilters, page: newPage }));
    }
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    dispatch(setFilters({ ...currentFilters, limit: newLimit, page: 1 }));
  };

  if (generalLoading && collections.length === 0) {
    return <div className="text-center py-8">Loading collections...</div>;
  }


  return (
    <>
      <div className="relative p-4 text-gray-800">
        {operationLoading && (
          <div className="text-center text-blue-500 py-2">
            Updating collection...
          </div>
        )}
        <div className="flex justify-end  mb-2">
        <button
            className="flex justify-center items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-black text-sm hover:shadow-sm transition min-w-[140px]"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add Collection
          </button>
          </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Collection ID
                </th>
                <th className="text-center sm:text-left sm:pl-12 py-2 font-medium text-gray-600">
                  Name
                </th>
                <th className="text-left pl-10 py-2 font-medium text-gray-600">
                  Type
                </th>
                <th className="text-left pl-10 py-2 font-medium text-gray-600">
                  Price Range
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Fabric Count
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {collections.length > 0 ? (
                collections.map((collection) => {
                  return (
                    <tr key={collection._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {collection.collectionId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg mr-3 overflow-hidden">
                            {collection.thumbnailImageUrl ? (
                              <img
                                src={collection.thumbnailImageUrl}
                                alt={collection.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <span>📁</span>
                            )}
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {collection.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {collection.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {collection.priceRange?.min !== undefined && collection.priceRange?.max !== undefined ?
                          `₹${collection.priceRange.min.toFixed(2)} - ₹${collection.priceRange.max.toFixed(2)}` :
                          'N/A'
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {collection.fabricCount}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No collections found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 py-4 border-t border-gray-200 text-sm">
        <div className="text-gray-700">
          Result{" "}
          {totalCollections > 0
            ? (currentPage - 1) * (currentFilters.limit || 20) + 1
            : 0}
          -
          {Math.min(currentPage * (currentFilters.limit || 20), totalCollections)}{" "}
          of {totalCollections}
          <select
            className="ml-2 border border-gray-300 rounded px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
            value={currentFilters.limit || 20}
            onChange={handleLimitChange}
            disabled={generalLoading || operationLoading}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            className="flex items-center px-3 py-1 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1 || generalLoading || operationLoading}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Prev
          </button>
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            if (
              pageNum === 1 ||
              pageNum === totalPages ||
              (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
            ) {
              return (
                <button
                  key={pageNum}
                  className={`px-3 py-1 rounded-md shadow-sm ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 bg-white hover:bg-gray-100 border border-gray-300"
                  } disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200`}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={generalLoading || operationLoading}
                >
                  {pageNum}
                </button>
              );
            }
            if (
              (pageNum === currentPage - 3 && pageNum > 1) ||
              (pageNum === currentPage + 3 && pageNum < totalPages)
            ) {
              return (
                <span
                  key={`ellipsis-${pageNum}`}
                  className="px-2 text-gray-500"
                >
                  ...
                </span>
              );
            }
            return null;
          })}
          <button
            className="flex items-center px-3 py-1 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || generalLoading || operationLoading}
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
      <AddCollection isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default AdminCollectionsList;
