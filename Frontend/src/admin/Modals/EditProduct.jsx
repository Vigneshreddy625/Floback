import React, { useState, useRef, useEffect } from "react"; 
import { Camera, Upload, Package, Palette, Ruler, Tag, Check, X, Plus, Trash2, Info, ShoppingCart } from "lucide-react";

function EditProduct({ product, isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState(() => ({
    ...product,
    dimensions: product.dimensions ? { ...product.dimensions } : { length: 0, width: 0, unit: "inches" },
    features: product.features ? [...product.features] : [],
  }));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [additionalDragActive, setAdditionalDragActive] = useState(false);

  const mainImageRef = useRef(null);
  const additionalImagesRef = useRef(null);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        dimensions: product.dimensions ? { ...product.dimensions } : { length: 0, width: 0, unit: "inches" },
        features: product.features ? [...product.features] : [],
      });
    }
  }, [product]); 

  const categories = [
    { value: "Ready-Made Curtains", label: "Ready-Made Curtains" },
    { value: "Bed & Bath", label: "Bed & Bath" },
    { value: "Sofa Upholstery", label: "Sofa Upholstery" },
    { value: "Curtains & Blinds", label: "Curtains & Blinds" },
    { value: "Wallpaper", label: "Wallpaper" },
  ];

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (["length", "width", "unit"].includes(id)) {
      setFormData(prev => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [id]: type === "number" ? parseFloat(value) : value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [id]: type === "checkbox" ? checked : type === "number" ? parseFloat(value) : value,
      }));
    }
  };

  const handleFeatureChange = (index, e) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = e.target.value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ""] }));
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(res => setTimeout(res, 1000)); 
    onSubmit(formData); 
    setIsSubmitting(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  if(!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md mx-auto animate-bounce">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Updated!</h2>
          <p className="text-gray-600">Changes saved successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 md:p-4">
      <div className="bg-white md:rounded-2xl shadow-2xl w-full md:max-w-4xl h-screen md:max-h-[95vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Edit Product</h1>
              <p className="text-indigo-100 text-sm">Update the details below to edit the item</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            aria-label="Close form"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center"><Package className="w-6 h-6 mr-3 text-indigo-600" />Basic Information</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="name">
                  Product Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name || ''} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Enter a descriptive product name"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="description">
                  Product Description
                </label>
                <textarea
                  id="description"
                  value={formData.description || ''} 
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                  placeholder="Describe your product features, benefits, and specifications..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="price">
                  Price ($) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price || ''}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="category">
                  Category *
                </label>
                <select
                  id="category"
                  value={formData.category || ''} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center" htmlFor="color">
                  <Palette className="w-4 h-4 mr-2" />
                  Primary Color
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    id="color"
                    type="color"
                    value={formData.color || "#000000"} 
                    onChange={handleChange}
                    className="w-16 h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={formData.color || ''} 
                      onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                      placeholder="#000000"
                    />
                  </div>
                  <div
                    className="w-12 h-12 rounded-lg border border-gray-300 shadow-sm"
                    style={{ backgroundColor: formData.color }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center"><Tag className="w-6 h-6 mr-3 text-purple-600" />Product Details</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="material">Material</label>
                <input
                  id="material"
                  type="text"
                  value={formData.material || ''} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="e.g., 100% Cotton, Silk, Polyester blend"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="style">Style</label>
                <input
                  id="style"
                  type="text"
                  value={formData.style || ''} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="e.g., Modern, Classic, Vintage, Contemporary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="pattern">Pattern</label>
                <input
                  id="pattern"
                  type="text"
                  value={formData.pattern || ''} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="e.g., Floral, Geometric, Solid, Striped"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Features</label>
                <div className="space-y-3">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={feature || ''} 
                        onChange={(e) => handleFeatureChange(index, e)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                        placeholder={`Feature ${index + 1}`}
                      />
                      {formData.features.length > 0 && ( 
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label={`Remove feature ${index + 1}`}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Feature
                  </button>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                  <Ruler className="w-4 h-4 mr-2" />
                  Dimensions
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="length">Length</label>
                    <input
                      id="length"
                      type="number"
                      step="0.01"
                      value={formData.dimensions.length || ''} 
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="width">Width</label>
                    <input
                      id="width"
                      type="number"
                      step="0.01"
                      value={formData.dimensions.width || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="unit">Unit</label>
                    <select
                      id="unit"
                      value={formData.dimensions.unit || "inches"} 
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    >
                      <option value="inches">Inches</option>
                      <option value="feet">Feet</option>
                      <option value="cm">Centimeters</option>
                      <option value="meters">Meters</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center"><ShoppingCart className="w-6 h-6 mr-3 text-green-600" />Inventory Management</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="quantityAvailable">
                  Quantity Available *
                </label>
                <input
                  id="quantityAvailable"
                  type="number"
                  min="0"
                  value={formData.quantityAvailable || 0} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Enter available quantity"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">In Stock Status</h3>
                  <p className="text-sm text-gray-600">Toggle product availability</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    id="inStock"
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="md:col-span-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Inventory Tips</h4>
                    <ul className="text-sm text-blue-700 mt-1 space-y-1">
                      <li>• Set accurate quantities to avoid overselling</li>
                      <li>• Use "Out of Stock" when quantity reaches zero</li>
                      <li>• Regular inventory updates improve customer experience</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="border-t bg-gray-50 px-6 py-4 flex justify-end items-center space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-8 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Update Product'} 
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;