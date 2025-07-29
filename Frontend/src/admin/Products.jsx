import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductFormModal from "./UpdateProductsModal";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import FilterBar from "./Filter";
import {
  fetchFilteredProducts,
  setFilters,
  clearErrors,
  selectFilteredProducts,
  selectProductLoading,
  selectProductError,
  selectTotalProducts,
  selectCurrentPage,
  selectCurrentFilters,
  selectOperationLoading,
  selectOperationError,
} from "../redux/Products/productSlice";

const AdminProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const loading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);
  const totalProducts = useSelector(selectTotalProducts);
  const currentPage = useSelector(selectCurrentPage);
  const currentFilters = useSelector(selectCurrentFilters);
  const operationLoading = useSelector(selectOperationLoading);
  const operationError = useSelector(selectOperationError);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const calculateDiscount = (price, originalPrice) => {
    if (!originalPrice || originalPrice === 0) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const getStockColor = (stockStatus) => {
    switch (stockStatus) {
      case "Low Stock":
        return "text-yellow-600";
      case "Out of Stock":
        return "text-red-600";
      default:
        return "text-gray-900";
    }
  };

  const fetchData = useCallback(
    (filters) => {
      dispatch(fetchFilteredProducts(filters));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData(currentFilters);
  }, [currentFilters, fetchData]);

  const totalPages = Math.ceil(totalProducts / (currentFilters.limit || 20));

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setFilters({ ...currentFilters, page: newPage }));
    }
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    dispatch(setFilters({ ...currentFilters, limit: newLimit, page: 1 }));
  };

  const handleFilterBarChange = (newFilters) => {
    dispatch(setFilters({ ...currentFilters, ...newFilters, page: 1 }));
  };

  const handleEditClick = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
    dispatch(clearErrors());
  };

  const handleUpdateProduct = (formData) => {
    if (formData && formData._id) {
      dispatch(
        updateProduct({ productId: formData._id, productData: formData })
      )
        .unwrap()
        .then(() => {
          fetchData(currentFilters);
          handleModalClose();
        })
        .catch((err) => {
          console.error("Failed to update product:", err);
        });
    }
  };

  if (loading && products.length === 0) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  return (
    <>
      <div className="px-4 text-gray-800">
        <FilterBar
          isOrdersPage={false}
          isProductsPage={true}
          onFilterChange={handleFilterBarChange}
          activeFilters={currentFilters} 
        />
        {operationLoading && (
          <div className="text-center text-blue-500 py-2">
            Updating product...
          </div>
        )}
        {operationError && (
          <div className="text-center text-red-600 py-2">
            Update Error: {operationError}
          </div>
        )}

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Product ID
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
                  Discount
                </th>
                <th className="text-left px-4 py-2 font-medium text-gray-600">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg mr-3">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <span>📦</span>
                          )}
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {product.title}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={getStockColor(product.stockStatus)}>
                        {product.stockStatus === "Out of Stock"
                          ? "Out of Stock"
                          : product.stockStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.price ? product.price.toFixed(2) : "0.00"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {calculateDiscount(product.price, product.originalPrice)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => handleEditClick(product)}
                        disabled={operationLoading}
                      >
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No products found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 py-4 border-gray-200 text-sm">
        <div className="text-gray-700">
          Result{" "}
          {totalProducts > 0
            ? (currentPage - 1) * (currentFilters.limit || 20) + 1
            : 0}
          -{Math.min(currentPage * (currentFilters.limit || 20), totalProducts)}{" "}
          of {totalProducts}
          <select
            className="ml-2 border border-gray-300 rounded px-2 py-1 text-sm"
            value={currentFilters.limit || 20}
            onChange={handleLimitChange}
            disabled={loading || operationLoading}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            className="flex items-center px-3 py-1 text-gray-600 hover:text-gray-900 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1 || loading || operationLoading}
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
                  className={`px-3 py-1 rounded ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={loading || operationLoading}
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
            className="flex items-center px-3 py-1 text-gray-600 hover:text-gray-900 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || loading || operationLoading}
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ProductFormModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          product={productToEdit}
          isLoading={operationLoading}
          error={operationError}
          onSubmit={handleUpdateProduct}
        />
      )}
    </>
  );
};

export default AdminProductsList;
