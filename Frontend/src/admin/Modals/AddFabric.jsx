import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  Upload,
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
import { useDispatch } from "react-redux";
import { addFabric } from "../../redux/Fabrics/fabricSlice";

function AddFabric({ isOpen, onClose }) {
  const { collections, loadingCollections, errorCollections } =
    useCollections();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    color: "#6366f1",
    mainImageUrl: "",
    mainImagePreview: "",
    additionalImagesPreview: [],
    additionalImageUrls: [],
    collectionId: "", // Initialize as empty string or a default valid ID if available
    material: "",
    style: "",
    pattern: "",
    features: [], // Initialize empty as per schema
    dimensions: {
      length: 0,
      width: 0,
      unit: "inches",
    },
    inStock: true, // Assuming default is true
    quantityAvailable: 0,
  });

  const [dragActive, setDragActive] = useState(false);
  const [additionalDragActive, setAdditionalDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const mainImageRef = useRef(null);
  const additionalImagesRef = useRef(null);
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

    if (id === "length" || id === "width" || id === "unit") {
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

  const readFileAsDataURL = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrag = (e, isAdditional = false) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      if (isAdditional) setAdditionalDragActive(true);
      else setDragActive(true);
    } else if (e.type === "dragleave") {
      if (isAdditional) setAdditionalDragActive(false);
      else setDragActive(false);
    }
  };

  const handleDrop = async (e, isAdditional = false) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdditional) setAdditionalDragActive(false);
    else setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      if (!isAdditional) {
        const fileDataUrl = await readFileAsDataURL(files[0]);
        setFormData((prev) => ({ ...prev, mainImageUrl: fileDataUrl }));
      } else {
        const dataUrls = await Promise.all(
          files.map((file) => readFileAsDataURL(file))
        );
        setFormData((prev) => ({
          ...prev,
          additionalImageUrls: [...prev.additionalImageUrls, ...dataUrls],
        }));
      }
    }
  };

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const dataUrl = await readFileAsDataURL(file);
      setFormData((prevData) => ({
        ...prevData,
        mainImageUrl: file,
        mainImagePreview: dataUrl,
      }));
    }
  };

  const handleAdditionalImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const filePromises = files.map((file) => readFileAsDataURL(file));
      const dataUrls = await Promise.all(filePromises);

      setFormData((prevData) => ({
        ...prevData,
        additionalImageUrls: [...prevData.additionalImageUrls, ...files],
        additionalImagesPreview: [
          ...prevData.additionalImagesPreview,
          ...dataUrls,
        ],
      }));
    }
  };

  const dispatch = useDispatch();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      try {
        await dispatch(addFabric(formData)).unwrap();
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 2000);
      } catch (error) {
        console.error("Failed to add product:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md mx-auto transform animate-bounce">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Fabric Added!
          </h2>
          <p className="text-gray-600">
            Your Fabric has been successfully created.
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
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Add New Fabric</h1>
              <p className="text-indigo-100 text-sm">
                Fill in the details below to add a new item
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
                  value={formData.name}
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
                  value={formData.description}
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
                    value={formData.price}
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
                  <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500">
                    Loading collections...
                  </div>
                ) : errorCollections ? (
                  <div className="px-4 py-3 border border-red-300 rounded-lg bg-red-50 text-red-700">
                    Error loading collections.
                  </div>
                ) : (
                  <select
                    id="collectionId"
                    value={formData.collectionId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                  >
                    <option value="">Select a collection</option>{" "}
                    {/* Added a default empty option */}
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
                    value={formData.color}
                    onChange={handleChange}
                    className="w-16 h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={formData.color}
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
                  value={formData.material}
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
                  value={formData.style}
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
                  value={formData.pattern}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="e.g., Floral, Geometric, Solid, Striped"
                />
              </div>

              <div>
                {" "}
                {/* Durability moved to its own grid column */}
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="durability"
                >
                  Durability
                </label>
                <input
                  id="durability"
                  type="text"
                  value={formData.durability}
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
                      value={formData.dimensions.length}
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
                      value={formData.dimensions.width}
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
                      value={formData.dimensions.unit}
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
              <Camera className="w-6 h-6 mr-3 text-pink-600" />
              Images & Media
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Main Fabric Image *
              </label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? "border-pink-400 bg-pink-50"
                    : "border-gray-300 hover:border-pink-400 hover:bg-pink-50"
                }`}
                onDragEnter={(e) => handleDrag(e, false)}
                onDragLeave={(e) => handleDrag(e, false)}
                onDragOver={(e) => handleDrag(e, false)}
                onDrop={(e) => handleDrop(e, false)}
              >
                {formData.mainImagePreview ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 group">
                    <img
                      src={formData.mainImagePreview}
                      alt="Main Preview"
                      className="object-contain w-full h-full"
                    />
                    <button
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, mainImageUrl: "" }))
                      }
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove main image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="space-y-3">
                      <label
                        htmlFor="main-image-upload"
                        className="cursor-pointer inline-flex items-center px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Main Image
                        <input
                          id="main-image-upload"
                          type="file"
                          className="sr-only"
                          ref={mainImageRef}
                          onChange={handleMainImageChange}
                          accept="image/*"
                          required
                        />
                      </label>
                      <p className="text-gray-600 hidden md:block">
                        or drag and drop your image here
                      </p>
                      <p className="text-sm text-gray-500 hidden md:block">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Additional Images
              </label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
                  additionalDragActive
                    ? "border-pink-400 bg-pink-50"
                    : "border-gray-300 hover:border-pink-400 hover:bg-pink-50"
                }`}
                onDragEnter={(e) => handleDrag(e, true)}
                onDragLeave={(e) => handleDrag(e, true)}
                onDragOver={(e) => handleDrag(e, true)}
                onDrop={(e) => handleDrop(e, true)}
              >
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-3" />
                <label
                  htmlFor="additional-image-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add More Images
                  <input
                    id="additional-image-upload"
                    type="file"
                    multiple
                    className="sr-only"
                    ref={additionalImagesRef}
                    onChange={handleAdditionalImagesChange}
                    accept="image/*"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2 hidden md:block">
                  Multiple images supported
                </p>
              </div>

              {formData.additionalImagesPreview.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="font-medium text-gray-700">
                    Uploaded Images:
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {formData.additionalImagesPreview.map((url, index) => (
                      <div
                        key={index}
                        className="relative group rounded-lg overflow-hidden shadow-sm border border-gray-200"
                      >
                        <img
                          src={url}
                          alt={`Additional Preview ${index + 1}`}
                          className="object-cover w-full h-24"
                        />
                        <button
                          onClick={() => removeAdditionalImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label={`Remove additional image ${index + 1}`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section: Inventory */}
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
                  value={formData.quantityAvailable}
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
                  <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="md:col-span-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800">
                      Inventory Tips
                    </h4>
                    <ul className="text-sm text-blue-700 mt-1 space-y-1">
                      <li>• Set accurate quantities to avoid overselling</li>
                      <li>• Use "Out of Stock" when quantity reaches zero</li>
                      <li>
                        • Regular inventory updates improve customer experience
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* End Main Content Area */}
        {/* Footer Buttons */}
        <div className="border-t bg-gray-50 px-6 py-4 flex justify-end items-center space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-8 py-2 bg-gradient-to-r from-[#D4145A] to-[#FBB03B] hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-colors ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Add Fabric"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddFabric;
