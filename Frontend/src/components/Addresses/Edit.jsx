import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, MapPin, User, Phone, Home, Building, Map } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateAddress } from "../../redux/Address/addressSlice";

const Edit = ({ isOpen, onClose, addressId, addressData }) => {
  const [formData, setFormData] = useState({
    name: addressData?.name || "",
    mobile: addressData?.mobile || "",
    houseNo: addressData?.houseNo || "",
    postalCode: addressData?.postalCode || "",
    state: addressData?.state || "",
    street: addressData?.street || "",
    city: addressData?.city || "",
    locality: addressData?.locality || "",
    district: addressData?.district || "",
    country: addressData?.country || "India",
    type: addressData?.type || "home",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const addressUpdateLoading = useSelector((state) => state.addresses.loading);
  const addressUpdateError = useSelector((state) => state.addresses.error);

  const fetchLocationDetails = async (pin) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pin}`
      );
      const data = await response.json();
      if (data[0]?.Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        setFormData((prev) => ({
          ...prev,
          locality: postOffice.Name,
          city: postOffice.Block,
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

  useEffect(() => {
    if (addressData) {
      setFormData({
        name: addressData.name || "",
        mobile: addressData.mobile || "",
        houseNo: addressData.houseNo || "",
        postalCode: addressData.postalCode || "",
        state: addressData.state || "",
        street: addressData.street || "",
        city: addressData.city || "",
        locality: addressData.locality || "",
        district: addressData.district || "",
        country: addressData.country || "India",
        type: addressData.type || "home",
      });
    }
  }, [addressData]);

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

  const handleSubmit = () => {
    dispatch(updateAddress({ addressId, addressData: formData }));
  };

  useEffect(() => {
    if (
      !addressUpdateLoading &&
      !addressUpdateError &&
      addressUpdateError !== null &&
      isOpen
    ) {
      onClose();
    }
  }, [addressUpdateLoading, addressUpdateError, onClose, isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 md:flex md:items-center md:justify-center md:p-4 md:backdrop-blur-md md:bg-black/40"
    >
      <motion.div
        ref={popupRef}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="w-full h-screen md:h-auto md:max-w-xl md:max-h-[90vh] bg-white md:rounded-2xl shadow-lg overflow-hidden border flex flex-col"
      >
        <div className="relative h-16 bg-gradient-to-r from-pink-500 to-purple-600 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="absolute -bottom-6 left-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-lg">
              <MapPin className="w-6 h-6 text-pink-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-grow overflow-hidden">
          <div className="px-4 md:px-6 pt-8 md:pt-10 pb-4 flex-shrink-0">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Edit Address
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-grow overflow-hidden"
          >
            <div className="px-4 md:px-6 overflow-y-auto flex-grow">
              <div className="space-y-4 md:space-y-6 pb-4">
                {/* Name and Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 flex-shrink-0">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-sm text-gray-500 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-base"
                        placeholder="Enter Full Name"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-1 flex-shrink-0">
                      <Phone className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-sm text-gray-500 mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-base"
                        placeholder="Enter Mobile Number"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Street Address */}
                <div className="flex items-start space-x-3">
                  <div className="mt-1 flex-shrink-0">
                    <Home className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-sm text-gray-500 mb-1">
                      Street Address
                    </label>
                    <textarea
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-base resize-none"
                      placeholder="Enter Street Address"
                      required
                    />
                  </div>
                </div>

                {/* Pincode and Locality */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 flex-shrink-0">
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-sm text-gray-500 mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-base"
                        placeholder="Enter Pincode"
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-1 flex-shrink-0">
                      <Map className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-sm text-gray-500 mb-1">
                        Locality
                      </label>
                      {loading ? (
                        <div className="w-full h-12 bg-gray-200 animate-pulse rounded-lg" />
                      ) : (
                        <input
                          type="text"
                          name="locality"
                          value={formData.locality}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-base"
                          placeholder="Enter Locality"
                          required
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* City and District */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 flex-shrink-0">
                      <Building className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-sm text-gray-500 mb-1">
                        City
                      </label>
                      {loading ? (
                        <div className="w-full h-12 bg-gray-200 animate-pulse rounded-lg" />
                      ) : (
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-base"
                          placeholder="Enter City"
                          required
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-1 flex-shrink-0">
                      <Building className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-sm text-gray-500 mb-1">
                        District
                      </label>
                      {loading ? (
                        <div className="w-full h-12 bg-gray-200 animate-pulse rounded-lg" />
                      ) : (
                        <input
                          type="text"
                          name="district"
                          value={formData.district}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-base"
                          placeholder="Enter District"
                          required
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* State and Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1 flex-shrink-0">
                      <Map className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-sm text-gray-500 mb-1">
                        State
                      </label>
                      {loading ? (
                        <div className="w-full h-12 bg-gray-200 animate-pulse rounded-lg" />
                      ) : (
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-base"
                          placeholder="Enter State"
                          required
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="mt-1 flex-shrink-0">
                      <Map className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-sm text-gray-500 mb-1">
                        Country
                      </label>
                      {loading ? (
                        <div className="w-full h-12 bg-gray-200 animate-pulse rounded-lg" />
                      ) : (
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-base appearance-none bg-no-repeat bg-right"
                          style={{
                            backgroundImage:
                              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                            backgroundSize: "20px",
                          }}
                          required
                        >
                          <option value="India">India</option>
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                          <option value="Japan">Japan</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>

                {/* Home Address Checkbox */}
                <div className="flex items-center pt-2">
                  <input
                    type="checkbox"
                    id="isHome"
                    name="isHome"
                    checked={formData.type === "home"}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isHome"
                    className="ml-3 block text-base text-gray-700"
                  >
                    Set as home address
                  </label>
                </div>
              </div>
            </div>

            {/* Fixed Bottom Button */}
            <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-100 flex-shrink-0">
              <button
                type="submit"
                className="w-full px-6 py-4 text-base font-medium bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transform transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                Save Address
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Edit;
