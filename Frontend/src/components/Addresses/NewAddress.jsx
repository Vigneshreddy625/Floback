import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, MapPin, User, Phone, Home, Building, Map } from "lucide-react";
import { useDispatch } from "react-redux";
import { addAddress } from "../../redux/Address/addressSlice";

const NewAddress = ({ isOpen, onClose, onSuccess }) => { 
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    houseNo: "",
    postalCode: "",
    state: "",
    street: "",
    locality: "",
    city: "",
    district: "",
    country: "India",
    type: "home", 
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchLocationDetails = async (pin) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await response.json();
      if (data[0]?.Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        setFormData((prev) => ({
          ...prev,
          locality: postOffice.Name,
          city:postOffice.Block,
          district: postOffice.District,
          state: postOffice.State,
          country: postOffice.Country,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          city: "",
          district: "",
          state: "",
        }));
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
      setFormData((prev) => ({
        ...prev,
        city: "",
        district: "",
        state: "",
      }));
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "postalCode") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
      if (numericValue.length === 6) {
        fetchLocationDetails(numericValue);
      } else if (numericValue.length < 6) {
        setFormData((prev) => ({
          ...prev,
          locality: "",
          city: "",
          district: "",
          state: "",
          country: "India",
        }));
      }
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        type: checked ? "home" : "work", 
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      dispatch(addAddress(formData));
      
      if (onSuccess) {
        onSuccess();
      }
      
      setFormData({
        name: "",
        mobile: "",
        houseNo: "",
        postalCode: "",
        state: "",
        street: "",
        locality: "",
        city: "",
        district: "",
        country: "India",
        type: "home",
      });
      
      // Close modal
      onClose();
    } catch (error) {
      console.error("Error adding address:", error);
      // Handle error appropriately (show toast, etc.)
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 backdrop-blur-md bg-black/40 overflow-y-auto"
    >
      <motion.div
        ref={popupRef}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="w-full md:max-w-xl h-full md:h-auto max-h-full md:max-h-[90vh] bg-white dark:bg-black md:rounded-2xl shadow-lg overflow-hidden border dark:border-gray-600 flex flex-col"
      >
        <div className="relative h-14 bg-gradient-to-r from-blue-400 to-indigo-500 dark:from-blue-500 dark:to-indigo-600 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="absolute -bottom-6 left-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
              <MapPin className="w-6 h-6 text-pink-500 dark:text-pink-400" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
          <div className="p-4 sm:p-6 pt-10 sm:pt-12 overflow-y-auto flex-grow">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Add New Address
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="mt-1 flex-shrink-0">
                    <User className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600 focus:border-transparent transition-all text-sm"
                      placeholder="Enter Full Name"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="mt-1 flex-shrink-0">
                    <Phone className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600 focus:border-transparent transition-all text-sm"
                      placeholder="Enter Mobile Number"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="mt-1 flex-shrink-0">
                  <Home className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Street Address</label>
                  <textarea
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600 focus:border-transparent transition-all text-sm"
                    placeholder="Enter Street Address"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="mt-1 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Pincode</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600 focus:border-transparent transition-all text-sm"
                      placeholder="Enter Pincode"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="mt-1 flex-shrink-0">
                    <Map className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Locality</label>
                    {loading ? (
                      <div className="w-full h-6 mt-1 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                    ) : (
                      <input
                        type="text"
                        name="locality"
                        value={formData.locality}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600 focus:border-transparent transition-all text-sm"
                        placeholder="Enter Locality"
                        required
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="mt-1 flex-shrink-0">
                    <Building className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">City</label>
                    {loading ? (
                      <div className="w-full h-6 mt-1 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                    ) : (
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600 focus:border-transparent transition-all text-sm"
                        placeholder="Enter City"
                        required
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="mt-1 flex-shrink-0">
                    <Building className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">District</label>
                    {loading ? (
                      <div className="w-full h-6 mt-1 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                    ) : (
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600 focus:border-transparent transition-all text-sm"
                        placeholder="Enter City/District"
                        required
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="mt-1 flex-shrink-0">
                    <Map className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">State</label>
                    {loading ? (
                      <div className="w-full h-6 mt-1 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                    ) : (
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600 focus:border-transparent transition-all text-sm"
                        placeholder="Enter State"
                        required
                      />
                    )}
                  </div>
                </div>

                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="mt-1 flex-shrink-0">
                    <Map className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Country</label>
                    {loading ? (
                      <div className="w-full h-6 mt-1 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                    ) : (
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-600 focus:border-transparent transition-all text-sm appearance-none bg-no-repeat bg-right"
                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23666\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundSize: '20px' }}
                        required
                      >
                        <option className='dark:bg-black' value="India">India</option>
                        <option className='dark:bg-black' value="United States">United States</option>
                        <option className='dark:bg-black' value="Canada">Canada</option>
                        <option className='dark:bg-black' value="United Kingdom">United Kingdom</option>
                        <option className='dark:bg-black' value="Australia">Australia</option>
                        <option className='dark:bg-black' value="Germany">Germany</option>
                        <option className='dark:bg-black' value="France">France</option>
                        <option className='dark:bg-black' value="Japan">Japan</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center pt-1">
                <input
                  type="checkbox"
                  id="isHome"
                  name="isHome"
                  checked={formData.type === "home"} 
                  onChange={handleInputChange}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="isHome"
                  className="ml-3 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Set as home address
                </label>
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex gap-3 sm:gap-4">
              <button
                type="submit"
                className="flex-1 px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium bg-gradient-to-r from-blue-400 to-indigo-500 dark:from-blue-500 dark:to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transform transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 order-1 xs:order-2"
              >
                Save Address
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default NewAddress;