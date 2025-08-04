import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddresses } from "../../redux/Address/addressSlice";
import Edit from "../Addresses/Edit";
import DeleteAddress from "../Addresses/Remove";
import NewAddress from "../Addresses/NewAddress";
import {
  Briefcase,
  Edit2,
  Home,
  MapPin,
  Navigation,
  Phone,
  Plus,
  Trash2,
  User,
  Star,
  ArrowLeft,
} from "lucide-react";
import LoadingScreen from "../Items/LoadingScreen";

export default function MobileAddresses() {
  const [newAddress, setNewAddress] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteAddress, setDeleteAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedAddressData, setSelectedAddressData] = useState(null);

  const dispatch = useDispatch();
  const { addresses, loading } = useSelector((state) => state.addresses);

  const refreshAddresses = useCallback(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
    refreshAddresses();
  }, [refreshAddresses]);

  const handleEditClick = (id, data) => {
    setSelectedAddressId(id);
    setSelectedAddressData(data);
    setEdit(true);
  };

  const handleDeleteClick = (id, data) => {
    setSelectedAddressId(id);
    setSelectedAddressData(data);
    setDeleteAddress(true);
  };

  const handleAddressAdded = () => {
    setNewAddress(false);
    refreshAddresses();
  };

  const handleAddressUpdated = () => {
    setEdit(false);
    refreshAddresses();
  };

  const handleAddressDeleted = () => {
    setDeleteAddress(false);
    refreshAddresses();
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-blue-100">
        <div className="px-2 py-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 items-center">
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
              >
                <ArrowLeft className="w-6 h-6 text-blue-600" />
              </button>
              <div className="flex flex-col space-y-1">
              <h2 className="text-2xl font-bold text-gray-800">My Addresses</h2>
              <p className="text-sm text-gray-500">
                {addresses?.length || 0} saved address
                {addresses?.length !== 1 ? "es" : ""}
              </p>
              </div>
            </div>
            <button
              onClick={() => setNewAddress(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-3 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 active:scale-95"
            >
              <Plus size={18} />
              Add New
            </button>
          </div>
        </div>
      </div>

      <div className="px-2 py-6">
        {addresses?.length > 0 ? (
          <div className="space-y-5">
            {addresses.map((address, index) => (
              <div
                key={address._id}
                className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-sm border border-white/50 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`px-6 py-4 ${
                    address.type === "home"
                      ? "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-b border-blue-100"
                      : "bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-purple-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-xl ${
                          address.type === "home"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {address.type === "home" ? (
                          <Home size={20} />
                        ) : (
                          <Briefcase size={20} />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 capitalize">
                          {address.type}
                        </h3>
                        {address.type === "home" && (
                          <div className="flex items-center gap-1 mt-1">
                            <Star
                              size={12}
                              className="text-amber-500 fill-current"
                            />
                            <span className="text-xs text-amber-600 font-medium">
                              Default Address
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Details */}
                <div className="px-6 py-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-xl">
                      <User size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-semibold text-gray-800">
                        {address.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-xl mt-1">
                      <Navigation size={16} className="text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Address</p>
                      <div className="text-gray-800 leading-relaxed">
                        <p className="font-medium">{address.street}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.locality}, {address.city}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.state} {address.postalCode}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-xl">
                      <Phone size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold text-gray-800">
                        {address.mobile}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditClick(address._id, address)}
                      className="flex-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 py-3 px-4 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
                    >
                      <Edit2 size={16} />
                      Edit Address
                    </button>
                    <button
                      onClick={() => handleDeleteClick(address._id, address)}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-600 py-3 px-4 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center mt-20 px-6">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center">
                <MapPin size={40} className="text-blue-500" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <Plus size={16} className="text-white" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No Addresses Yet
            </h3>
            <p className="text-gray-500 mb-8 leading-relaxed max-w-sm">
              Start by adding your first shipping address to make checkout
              faster and easier.
            </p>

            <button
              onClick={() => setNewAddress(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-base flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            >
              <Plus size={20} />
              Add Your First Address
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      <Edit
        isOpen={edit}
        onClose={() => setEdit(false)}
        addressId={selectedAddressId}
        addressData={selectedAddressData}
        onSuccess={handleAddressUpdated}
      />
      <DeleteAddress
        isOpen={deleteAddress}
        onClose={() => setDeleteAddress(false)}
        addressId={selectedAddressId}
        address={selectedAddressData}
        onSuccess={handleAddressDeleted}
      />
      <NewAddress
        isOpen={newAddress}
        onClose={() => setNewAddress(false)}
        onSuccess={handleAddressAdded}
      />
    </div>
  );
}
