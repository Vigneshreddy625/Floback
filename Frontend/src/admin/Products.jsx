import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight, Edit, Trash } from "lucide-react";
import FilterBar from "./Filter";
import EditProduct from "./Modals/EditProduct";

import {
  getAllProducts,
  updateProduct,
  updateFilters,
  resetFilters,
  clearErrors,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
  selectUpdateLoading,
  selectUpdateError,
  selectPagination,
  selectFilters,
} from "../redux/Products/productSlice";
import ProductFilter from "./Filters/ProductFilter";
import {
  deleteProduct,
  selectDeleteLoading,
  selectDeleteError,
  selectDeleteSuccess,
} from "../redux/Products/productSlice";

const AdminProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const currentFilters = useSelector(selectFilters);
  const { currentPage, totalPages, totalProducts, hasNextPage, hasPrevPage } =
    useSelector(selectPagination);
  const updateLoading = useSelector(selectUpdateLoading);
  const updateError = useSelector(selectUpdateError);
  const deleteLoading = useSelector(selectDeleteLoading);
  const deleteError = useSelector(selectDeleteError);
  const deleteSuccess = useSelector(selectDeleteSuccess);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const fetchData = useCallback(
    (filters) => {
      dispatch(getAllProducts(filters));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData(currentFilters);
  }, [currentFilters, fetchData]);

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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(updateFilters({ page: newPage }));
    }
  };

  console.log(products);

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    dispatch(updateFilters({ limit: newLimit, page: 1 }));
  };

  const handleFilterBarChange = (newFilters) => {
    dispatch(updateFilters({ ...newFilters, page: 1 }));
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
    if (formData && formData.productId) {
      dispatch(
        updateProduct({ productId: formData.productId, updateData: formData })
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

  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const handleDeleteClick = (productId) => {
    try {
      dispatch(deleteProduct(productId));
      setShowDeleteSuccess(true);
      setTimeout(() => {
        setShowDeleteSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };
  if (showDeleteSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md mx-auto transform animate-bounce">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Product Deleted!
          </h2>
          <p className="text-gray-600">
            Your product has been successfully deleted.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 text-gray-800">
        <ProductFilter
          setIsModalOpen={setIsModalOpen}
          onFilterChange={handleFilterBarChange}
          activeFilters={currentFilters}
        />

        {updateLoading && (
          <div className="text-center text-blue-500 py-2">
            Updating product...
          </div>
        )}
        {updateError && (
          <div className="text-center text-red-600 py-2">
            Update Error: {updateError}
          </div>
        )}

        <div className="overflow-x-auto rounded-lg border border-gray-200 z-10">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Product ID
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Name
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Category
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Stock
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  Price
                </th>
                <th className="text-center px-4 py-3 font-medium text-gray-600">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.productId || product._id}>
                    <td className="px-4 py-3">{product.productId}</td>
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3">
                      <span className={getStockColor(product.stockStatus)}>
                        {product.stockStatus || "In Stock"}
                      </span>
                    </td>
                    <td className="px-4 py-3">{product.price?.toFixed(2)}</td>
                    <td className="px-4 py-3 flex justify-center space-x-3">
                      <button
                        onClick={() => handleEditClick(product)}
                        disabled={updateLoading}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product.productId)}
                        disabled={deleteLoading}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Trash size={16} />
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

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 py-4 text-sm mx-2">
        <div className="text-gray-700">
          Results {(currentPage - 1) * currentFilters.limit + 1} -{" "}
          {Math.min(currentPage * currentFilters.limit, totalProducts)} of{" "}
          {totalProducts}
          <select
            className="ml-2 border border-gray-300 rounded px-2 py-1"
            value={currentFilters.limit}
            onChange={handleLimitChange}
            disabled={loading || updateLoading}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 border rounded"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!hasPrevPage || loading || updateLoading}
          >
            <ChevronLeft className="w-4 h-4 inline" /> Prev
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 2 && page <= currentPage + 2)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded ${
                    page === currentPage
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                  disabled={loading || updateLoading}
                >
                  {page}
                </button>
              );
            } else if (page === currentPage - 3 || page === currentPage + 3) {
              return <span key={`ellipsis-${page}`}>...</span>;
            }
            return null;
          })}

          <button
            className="px-3 py-1 border rounded"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasNextPage || loading || updateLoading}
          >
            Next <ChevronRight className="w-4 h-4 inline" />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <EditProduct
          isOpen={isModalOpen}
          onClose={handleModalClose}
          product={productToEdit}
          onSubmit={handleUpdateProduct}
        />
      )}
    </>
  );
};

export default AdminProductsList;
