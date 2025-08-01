import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAddresses } from "../../redux/Address/addressSlice";
import Edit from "../Addresses/Edit";
import DeleteAddress from "../Addresses/Remove";
import NewAddress from "../Addresses/NewAddress";
import {
  MapPin,
  Home,
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Phone,
  User,
  Navigation,
  ArrowLeft,
} from "lucide-react";

export default function Addresses() {
  const [edit, setEdit] = useState(false);
  const [newAddress, setNewAddress] = useState(false);
  const [deleteAddress, setDeleteAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedAddressData, setSelectedAddressData] = useState(null);

  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.addresses.addresses);
  const loading = useSelector((state) => state.addresses.loading);
  const error = useSelector((state) => state.addresses.error);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleEdit = (addressId, addressData) => {
    setSelectedAddressId(addressId);
    setSelectedAddressData(addressData);
    setEdit(true);
  };

  const handleDelete = (addressId, addressData) => {
    setSelectedAddressId(addressId);
    setSelectedAddressData(addressData);
    setDeleteAddress(true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 md:px-6 py-8">
      <div className="flex justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <ArrowLeft
            size={24}
            className="text-gray-700 dark:text-gray-300"
            onClick={() => window.history.back()}
          />
          <h2 className="text-2xl font-semibold">Addresses</h2>
        </div>
        <button
          className="flex items-center gap-2 text-sm border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md text-blue-600 shadow-sm transform transition-transform active:scale-95"
          onClick={() => setNewAddress(true)}
        >
          <Plus size={16} />
          <span>Add New Address</span>
        </button>
      </div>

      {addresses?.length > 0 ? (
        <>
          {addresses.map((address) => (
            <section key={address._id} className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                {address.type === "home" ? (
                  <Home
                    size={18}
                    className="text-blue-600 dark:text-blue-400"
                  />
                ) : (
                  <Briefcase
                    size={18}
                    className="text-purple-600 dark:text-purple-400"
                  />
                )}
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  {address.type === "home"
                    ? "Default Address"
                    : "Other Address"}
                </h3>
                {address.type === "home" && (
                  <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                    Default
                  </span>
                )}
              </div>

              <div className="relative border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col md:flex-row justify-between p-5">
                  <div className="space-y-4 pr-20 md:pr-0">
                    <div className="flex items-center gap-2">
                      <User
                        size={16}
                        className="text-gray-600 dark:text-gray-400"
                      />
                      <p className="font-semibold text-base">{address.name}</p>
                    </div>

                    <div className="flex items-start gap-2">
                      <Navigation
                        size={16}
                        className="text-gray-600 dark:text-gray-400 mt-1 flex-shrink-0"
                      />
                      <div className="space-y-1">
                        <p className="text-sm">{address.street}</p>
                        <p className="text-sm">
                          {address.city}, {address.state} {address.postalcode}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone
                        size={16}
                        className="text-gray-600 dark:text-gray-400 flex-shrink-0"
                      />
                      <p className="text-sm">{address.mobile}</p>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 md:static md:flex md:items-start md:mt-1">
                    <span
                      className={`text-xs px-3 py-1 rounded-full border flex items-center gap-1 font-medium ${
                        address.type === "home"
                          ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                          : "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                      }`}
                    >
                      {address.type === "home" ? (
                        <Home
                          size={12}
                          className={
                            address.type === "home"
                              ? "text-blue-600"
                              : "text-purple-600"
                          }
                        />
                      ) : (
                        <Briefcase size={12} className="text-purple-600" />
                      )}
                      {address.type.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800">
                  <div className="flex w-full">
                    <button
                      className="w-1/2 py-3 text-sm text-blue-600 dark:text-blue-400 font-medium border-r border-gray-200 dark:border-gray-800 transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20 active:scale-95 flex items-center justify-center gap-2"
                      onClick={() => handleEdit(address._id, address)}
                      aria-label="Edit address"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      className="w-1/2 py-3 text-sm text-red-600 dark:text-red-400 font-medium transition-all hover:bg-red-50 dark:hover:bg-red-900/20 active:scale-95 flex items-center justify-center gap-2"
                      onClick={() => handleDelete(address._id, address)}
                      aria-label="Remove address"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 my-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-center">
          <MapPin size={48} className="text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-medium mb-2">No addresses found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
            You haven't added any shipping addresses to your profile yet.
          </p>
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            onClick={() => setNewAddress(true)}
          >
            <Plus size={16} />
            Add New Address
          </button>
        </div>
      )}

      <Edit
        isOpen={edit}
        addressId={selectedAddressId}
        addressData={selectedAddressData}
        onClose={() => setEdit(false)}
      />
      <DeleteAddress
        isOpen={deleteAddress}
        addressId={selectedAddressId}
        address={selectedAddressData}
        onClose={() => setDeleteAddress(false)}
      />
      <NewAddress isOpen={newAddress} onClose={() => setNewAddress(false)} />
    </div>
  );
}
