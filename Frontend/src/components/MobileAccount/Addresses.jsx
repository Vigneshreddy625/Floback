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
    <div className="w-full min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center p-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-bold flex-1 text-center">My Addresses</h2>
          {/* Add New Address Button in Header */}
          <button
            onClick={() => setNewAddress(true)}
            className="p-2 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-colors"
            aria-label="Add new address"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="p-4">
        {addresses?.length > 0 ? (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Address Type Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        address.type === "home"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-purple-50 text-purple-600"
                      }`}
                    >
                      {address.type === "home" ? (
                        <Home size={18} />
                      ) : (
                        <Briefcase size={18} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-md font-semibold text-gray-800 capitalize">
                        {address.type}
                      </h3>
                      {address.type === "home" && (
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star
                            size={10}
                            className="text-amber-500 fill-current"
                          />
                          <span className="text-xs text-amber-600 font-medium">
                            Default Address
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(address._id, address)}
                      className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                      aria-label="Edit address"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(address._id, address)}
                      className="p-2 rounded-full text-red-500 hover:bg-red-50 transition-colors"
                      aria-label="Remove address"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Address Details */}
                <div className="px-4 py-4 space-y-3 text-sm">
                  <AddressDetailItem
                    icon={<User size={16} className="text-gray-500" />}
                    label="Name"
                    value={address.name}
                  />
                  <AddressDetailItem
                    icon={<Navigation size={16} className="text-gray-500" />}
                    label="Address"
                    value={`${address.street}, ${address.locality}, ${address.city}, ${address.state} ${address.postalCode}`}
                  />
                  <AddressDetailItem
                    icon={<Phone size={16} className="text-gray-500" />}
                    label="Phone"
                    value={address.mobile}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center mt-20 px-6">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center">
                <MapPin size={36} className="text-blue-500" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No Addresses Yet
            </h3>
            <p className="text-gray-500 mb-6 leading-relaxed max-w-sm">
              Start by adding your first shipping address to make checkout
              faster and easier.
            </p>

            <button
              onClick={() => setNewAddress(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-base flex items-center gap-2 shadow-md hover:bg-blue-700 transition-colors active:scale-95"
            >
              <Plus size={18} />
              Add Your First Address
            </button>
          </div>
        )}
      </main>

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

function AddressDetailItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="text-gray-500">{label}</p>
        <p className="font-medium text-gray-700">{value}</p>
      </div>
    </div>
  );
}
