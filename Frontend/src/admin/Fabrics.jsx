import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import useCollections from "../hooks/useCollection";
import EditFabric from "./Modals/EditFabric"; 

import {
  fetchFilteredFabrics,
  setFilters,
  clearError,
  updateFabric,
  selectAllFabrics,
  selectFabricLoading,
  selectFabricError,
  selectFabricFilters, 
  selectFabricPagination, 
  selectFabricLoadingStates, 
} from "../redux/Fabrics/fabricSlice"; 
import FabricFilter from "./Filters/FabricFilter";

const AdminFabricsList = () => {
  const dispatch = useDispatch();
  const {collections} = useCollections();
  const fabrics = useSelector(selectAllFabrics);
  const generalLoading = useSelector(selectFabricLoading); 
  const generalError = useSelector(selectFabricError); 

  const { currentPage, totalPages, totalFabrics, hasNextPage, hasPrevPage } =
    useSelector(selectFabricPagination);

  const { isAddingFabric, isUpdatingFabric, isDeletingFabric } = useSelector(
    selectFabricLoadingStates
  );

  const currentFilters = useSelector(selectFabricFilters);
  const operationLoading = isAddingFabric || isUpdatingFabric || isDeletingFabric;
  const operationError = generalError;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fabricToEdit, setFabricToEdit] = useState(null);

  const getStockStatusAndColor = useCallback((quantityAvailable) => {
    if (quantityAvailable <= 0) {
      return { status: "Out of Stock", color: "text-red-600" };
    }
    if (quantityAvailable > 0 && quantityAvailable <= 10) {
      return { status: `Low Stock (${quantityAvailable})`, color: "text-yellow-600" };
    }
    return { status: `In Stock (${quantityAvailable})`, color: "text-green-600" };
  }, []);

  const fetchData = useCallback(
    (filters) => {
      dispatch(fetchFilteredFabrics(filters));
    },
    [dispatch]
  );

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

  const handleFilterBarChange = (newFilters) => {
    dispatch(setFilters({ ...currentFilters, ...newFilters, page: 1 }));
  };

  const handleEditClick = (fabric) => {
    setFabricToEdit(fabric);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFabricToEdit(null);
    dispatch(clearError()); 
  };

  const handleUpdateFabric = (formData) => {
    if (formData && formData.fabricId) {
      dispatch(
        updateFabric({ fabricId: formData.fabricId, updateData: formData })
      )
        .unwrap()
        .then(() => {
          fetchData(currentFilters);
          handleModalClose();
        })
        .catch((err) => {
          console.error("Failed to update fabric:", err);
        });
    }
  };


  console.log(collections)

  if (generalLoading && fabrics.length === 0) {
    return <div className="text-center py-8">Loading fabrics...</div>;
  }

  return (
    <>
      <div className="px-4 text-gray-800">
        <FabricFilter
          onFilterChange={handleFilterBarChange}
          activeFilters={currentFilters}
        />
        {operationLoading && (
          <div className="text-center text-blue-500 py-2">
            Updating fabric...
          </div>
        )}

        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Fabric ID
                </th>
                <th className="text-center sm:text-left sm:pl-12 py-2 font-medium text-gray-600">
                  Name
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Category
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Stock
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Price
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fabrics.length > 0 ? (
                fabrics.map((fabric) => {
                  const { status: stockStatusText, color: stockColorClass } =
                    getStockStatusAndColor(fabric.quantityAvailable);
                  return (
                    <tr key={fabric._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {fabric.fabricId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg mr-3 overflow-hidden">
                            {fabric.mainImageUrl ? (
                              <img
                                src={fabric.mainImageUrl}
                                alt={fabric.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <span>📦</span>
                            )}
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            {fabric.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {fabric.material}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={stockColorClass}>
                          {fabric.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {fabric.price ? `₹${fabric.price.toFixed(2)}` : "₹0.00"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          onClick={() => handleEditClick(fabric)}
                          disabled={operationLoading}
                        >
                          <Edit size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No fabrics found matching the criteria.
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
          {totalFabrics > 0
            ? (currentPage - 1) * (currentFilters.limit || 20) + 1
            : 0}
          -
          {Math.min(currentPage * (currentFilters.limit || 20), totalFabrics)}{" "}
          of {totalFabrics}
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

      {isModalOpen && (
        <EditFabric
          isOpen={isModalOpen}
          onClose={handleModalClose}
          fabric={fabricToEdit}
          onSubmit={handleUpdateFabric}
        />
      )}
    </>
  );
};

export default AdminFabricsList;
