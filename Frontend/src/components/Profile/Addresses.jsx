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
} from "lucide-react";
import LoadingScreen from "../Items/LoadingScreen";

export default function Addresses() {
  const [newAddress, setNewAddress] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteAddress, setDeleteAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedAddressData, setSelectedAddressData] = useState(null);

  const dispatch = useDispatch();

  const { addresses, loading, error } = useSelector((state) => state.addresses);

  const refreshAddresses = useCallback(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
    refreshAddresses();
  }, [refreshAddresses]);

  const handleEditClick = useCallback((id, data) => {
    setSelectedAddressId(id);
    setSelectedAddressData(data);
    setEdit(true);
  }, []);

  const handleDeleteClick = useCallback((id, data) => {
    setSelectedAddressId(id);
    setSelectedAddressData(data);
    setDeleteAddress(true);
  }, []);

  const handleAddressAdded = useCallback(() => {
    setNewAddress(false);
    refreshAddresses();
  }, [refreshAddresses]);

  const handleAddressUpdated = useCallback(() => {
    setEdit(false);
    refreshAddresses();
  }, [refreshAddresses]);

  const handleAddressDeleted = useCallback(() => {
    setDeleteAddress(false);
    refreshAddresses();
  }, [refreshAddresses]);

  if (loading) return <LoadingScreen />;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-md font-semibold">Saved Addresses</h2>
          <button
            onClick={() => setNewAddress(true)}
            className="text-sm border border-gray-300 px-4 py-2 rounded-md text-blue-600 hover:bg-gray-100"
          >
            + ADD NEW ADDRESS
          </button>
        </div>

        {addresses?.length > 0 ? (
          addresses.map((address) => (
            <section key={address._id} className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                {address.type === "home" ? (
                  <Home size={18} className="text-blue-600" />
                ) : (
                  <Briefcase size={18} className="text-purple-600 " />
                )}
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  {address.type === "home" ? "Default Address" : "Other Address"}
                </h3>
                {address.type === "home" && (
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    Default
                  </span>
                )}
              </div>

              {/* Card */}
              <div className="relative border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col md:flex-row justify-between px-4 py-2">
                  <div className="space-y-2 pr-20 md:pr-0">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-600" />
                      <p className="font-semibold text-base">{address.name}</p>
                    </div>

                    <div className="flex items-start gap-2">
                      <Navigation size={16} className="text-gray-600 mt-1 flex-shrink-0" />
                      <div className="space-y-1">
                        <p className="text-sm">{address.street}</p>
                        <p className="text-sm">
                          {address.locality}, {address.city}, {address.state} {address.postalCode}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gray-600" />
                      <p className="text-sm">{address.mobile}</p>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 md:static md:flex md:items-start md:mt-1">
                    <span
                      className={`text-xs px-3 py-1 rounded-full border flex items-center gap-1 font-medium ${
                        address.type === "home"
                          ? "border-blue-200 bg-blue-50 text-blue-700 "
                          : "border-purple-200 bg-purple-50 text-purple-700"
                      }`}
                    >
                      {address.type === "home" ? (
                        <Home size={12} className="text-blue-600" />
                      ) : (
                        <Briefcase size={12} className="text-purple-600" />
                      )}
                      {address.type === "home" ? "Home" : "Work"}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200">
                  <div className="flex w-full">
                    <button
                      onClick={() => handleEditClick(address._id, address)}
                      className="w-1/2 py-3 text-sm text-blue-600 font-medium border-r border-gray-200 transition-all hover:bg-blue-50 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(address._id, address)}
                      className="w-1/2 py-3 text-sm text-red-600 font-medium transition-all hover:bg-red-50 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-8 my-6 border-2 border-dashed border-gray-300 rounded-xl text-center">
            <MapPin size={48} className="text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No addresses found</h3>
            <p className="text-gray-500 mb-6 max-w-md">
              You haven't added any shipping addresses to your profile yet.
            </p>
            <button
              onClick={() => setNewAddress(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Add New Address
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
