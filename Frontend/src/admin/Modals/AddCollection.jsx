import React, { useState, useRef } from "react";
import { Plus, X, Upload, Check, Image, Tag, DollarSign, ListChecks, Info } from "lucide-react";
import { useDispatch } from "react-redux";
import { addCollection } from "../../redux/Collections/collectionSlice";

function AddCollection({isOpen, onClose}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    thumbnailImageUrl: "", 
    thumbnailImagePreview : "",
    priceRange: {
      min: 0,
      max: 0,
    },
    type: "PREMIUM", 
  });

  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const thumbnailImageRef = useRef(null);

  const collectionTypes = ['PREMIUM', 'CLASSIC', 'CONTEMPORARY'];

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (id === "min" || id === "max") {
      setFormData((prevData) => ({
        ...prevData,
        priceRange: {
          ...prevData.priceRange,
          [id]: type === "number" ? parseFloat(value) : value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: type === "checkbox" ? checked : type === "number" ? parseFloat(value) : value,
      }));
    }
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

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const fileDataUrl = await readFileAsDataURL(files[0]);
      setFormData(prev => ({ ...prev, thumbnailImageUrl: fileDataUrl }));
    }
  };

  const handleThumbnailImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileDataUrl = await readFileAsDataURL(file);
      setFormData((prevData) => ({
        ...prevData,
        thumbnailImageUrl: file,
        thumbnailImagePreview: fileDataUrl
      }));
    }
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.description || !formData.thumbnailImageUrl || !formData.type) {
        alert("Please fill in all required fields (Name, Description, Thumbnail Image, Type).");
        setIsSubmitting(false);
        return;
    }
    if (formData.priceRange.min < 0 || formData.priceRange.max < 0 || formData.priceRange.min > formData.priceRange.max) {
        alert("Please ensure price range is valid (min >= 0, max >= 0, min <= max).");
        setIsSubmitting(false);
        return;
    }

    try {
      await dispatch(addCollection(formData)).unwrap();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000)
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Collection Added!</h2>
          <p className="text-gray-600">Your new collection has been successfully created.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 md:p-4">
      <div className="bg-white md:rounded-2xl shadow-2xl w-full md:max-w-4xl h-screen md:max-h-[95vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 via-sky-600 to-teal-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Add New Collection</h1>
              <p className="text-blue-100 text-sm">Define a new product collection for your fabrics</p>
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
            <h2 className="text-2xl font-bold text-gray-800 flex items-center"><Tag className="w-6 h-6 mr-3 text-blue-600" />Collection Details</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="name">
                  Collection Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., Spring/Summer 2025, Eco-Friendly Fabrics"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="description">
                  Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Describe the theme, inspiration, and key features of this collection."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="type">
                  Collection Type *
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                >
                  {collectionTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Thumbnail Image *
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    dragActive ? 'border-teal-400 bg-teal-50' : 'border-gray-300 hover:border-teal-400 hover:bg-teal-50'
                  }`}
                  onDragEnter={(e) => handleDrag(e)}
                  onDragLeave={(e) => handleDrag(e)}
                  onDragOver={(e) => handleDrag(e)}
                  onDrop={(e) => handleDrop(e)}
                >
                  {formData.thumbnailImagePreview ? (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 group">
                      <img src={formData.thumbnailImagePreview} alt="Thumbnail Preview" className="object-contain w-full h-full" />
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, thumbnailImagePreview: '' }))}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove thumbnail image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Image className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <div className="space-y-3">
                        <label
                          htmlFor="thumbnail-image-upload"
                          className="cursor-pointer inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Thumbnail
                          <input
                            id="thumbnail-image-upload"
                            type="file"
                            className="sr-only"
                            ref={thumbnailImageRef}
                            onChange={handleThumbnailImageChange}
                            accept="image/*"
                            required 
                          />
                        </label>
                        <p className="text-gray-600 hidden md:block">or drag and drop your image here</p>
                        <p className="text-sm text-gray-500 hidden md:block">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Approximate Price Range
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="min">Minimum Price ($)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">$</span>
                      <input
                        id="min"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.priceRange.min}
                        onChange={handleChange}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="max">Maximum Price ($)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">$</span>
                      <input
                        id="max"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.priceRange.max}
                        onChange={handleChange}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                </div>
                {formData.priceRange.min > formData.priceRange.max && formData.priceRange.max !== 0 && (
                  <p className="text-red-500 text-sm mt-2">Maximum price cannot be less than minimum price.</p>
                )}
              </div>
            </div>
          </div>

          {/* Section: Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center"><Info className="w-6 h-6 mr-3 text-gray-600" />Additional Info</h2>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <ListChecks className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Collection Guidelines</h4>
                    <ul className="text-sm text-blue-700 mt-1 space-y-1">
                      <li>• A collection should group related fabrics.</li>
                      <li>• Choose a descriptive name and detailed description.</li>
                      <li>• The thumbnail image represents the entire collection.</li>
                      <li>• Set a realistic price range based on the fabrics within this collection.</li>
                    </ul>
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
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-8 py-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-lg font-medium transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Adding...' : 'Add Collection'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCollection;