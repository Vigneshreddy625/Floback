import React, { useState, useEffect } from "react";
import {
  Package,
  Palette,
  Ruler,
  Tag,
  Check,
  X,
  Plus,
  Trash2,
  Info,
  ShoppingCart,
} from "lucide-react";
import useCollections from "../../hooks/useCollection";

function EditFabric({ fabric, isOpen, onClose, onSubmit }) {
  const { collections, loadingCollections, errorCollections } =
    useCollections();
  const [formData, setFormData] = useState(() => ({
    ...(fabric || {}),
    dimensions: fabric?.dimensions || { length: 0, width: 0, unit: "inches" },
    features: fabric?.features || [],
  }));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (
      !loadingCollections &&
      collections.length > 0 &&
      !formData.collectionId
    ) {
      setFormData((prev) => ({
        ...prev,
        collectionId: collections[0]._id,
      }));
    }
  }, [loadingCollections, collections, formData.collectionId]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (["length", "width", "unit"].includes(id)) {
      setFormData((prevData) => ({
        ...prevData,
        dimensions: {
          ...prevData.dimensions,
          [id]: type === "number" ? parseFloat(value) : value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]:
          type === "checkbox"
            ? checked
            : type === "number"
            ? parseFloat(value)
            : value,
      }));
    }
    setErrorMessage("");
  };

  const handleFeatureChange = (index, e) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = e.target.value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.collectionId ||
      formData.quantityAvailable === undefined
    ) {
      setErrorMessage("Please fill in all required fields (marked with *).");
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(formData);

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Failed to update fabric. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md mx-auto transform animate-scaleIn">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Fabric Updated!
          </h2>
          <p className="text-gray-600">
            Your fabric details have been successfully updated.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 md:p-4">
      <div className="bg-white md:rounded-2xl shadow-2xl w-full md:max-w-4xl h-screen md:max-h-[95vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-[#D4145A] to-[#FBB03B] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Edit Fabric</h1>
              <p className="text-indigo-100 text-sm">
                Update the details for your fabric
              </p>
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
          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline ml-2">{errorMessage}</span>
            </div>
          )}

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Package className="w-6 h-6 mr-3 text-indigo-600" />
              Basic Information
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="name"
                >
                  Fabric Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  placeholder="Enter a descriptive product name"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="description"
                >
                  Fabric Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                  placeholder="Describe your fabric features, benefits, and specifications..."
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="price"
                >
                  Price ($) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price || ""}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="collectionId"
                >
                  Collection *
                </label>
                {loadingCollections ? (
                  <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 animate-pulse">
                    Loading collections...
                  </div>
                ) : errorCollections ? (
                  <div className="px-4 py-3 border border-red-300 rounded-lg bg-red-50 text-red-700">
                    Error loading collections.
                  </div>
                ) : (
                  <select
                    id="collectionId"
                    value={formData.collectionId || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                  >
                    <option value="" disabled>
                      Select a collection
                    </option>
                    {collections.map((collection) => (
                      <option key={collection._id} value={collection._id}>
                        {collection.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="md:col-span-2">
                <label
                  className="text-sm font-semibold text-gray-700 mb-2 flex items-center"
                  htmlFor="color"
                >
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
                      value={formData.color || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          color: e.target.value,
                        }))
                      }
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
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Tag className="w-6 h-6 mr-3 text-purple-600" />
              Fabric Details
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="material"
                >
                  Material *
                </label>
                <input
                  id="material"
                  type="text"
                  value={formData.material || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="e.g., 100% Cotton, Silk, Polyester blend"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="style"
                >
                  Style
                </label>
                <input
                  id="style"
                  type="text"
                  value={formData.style || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="e.g., Modern, Classic, Vintage, Contemporary"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="pattern"
                >
                  Pattern
                </label>
                <input
                  id="pattern"
                  type="text"
                  value={formData.pattern || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="e.g., Floral, Geometric, Solid, Striped"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="durability"
                >
                  Durability
                </label>
                <input
                  id="durability"
                  type="text"
                  value={formData.durability || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="e.g., High, Medium, Low"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Features
                </label>
                <div className="space-y-3">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                        placeholder={`Feature ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label={`Remove feature ${index + 1}`}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
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
                    <label
                      className="block text-xs font-medium text-gray-600 mb-1"
                      htmlFor="length"
                    >
                      Length
                    </label>
                    <input
                      id="length"
                      type="number"
                      step="0.01"
                      value={formData.dimensions.length || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-medium text-gray-600 mb-1"
                      htmlFor="width"
                    >
                      Width
                    </label>
                    <input
                      id="width"
                      type="number"
                      step="0.01"
                      value={formData.dimensions.width || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs font-medium text-gray-600 mb-1"
                      htmlFor="unit"
                    >
                      Unit
                    </label>
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
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <ShoppingCart className="w-6 h-6 mr-3 text-green-600" />
              Inventory Management
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="quantityAvailable"
                >
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
                  required
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    In Stock Status
                  </h3>
                  <p className="text-sm text-gray-600">
                    Toggle Fabric availability
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    id="inStock"
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="md:col-span-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800">
                      Inventory Tips
                    </h4>
                    <ul className="text-sm text-blue-700 mt-1 space-y-1 list-disc pl-5">
                      <li>Set accurate quantities to avoid overselling.</li>
                      <li>Use "Out of Stock" when quantity reaches zero.</li>
                      <li>
                        Regular inventory updates improve customer experience.
                      </li>
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
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-8 py-2 bg-gradient-to-r from-[#D4145A] to-[#FBB03B] hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-colors ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Updating..." : "Update Fabric"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditFabric;
