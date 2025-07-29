import React from 'react';
import { Home, Briefcase, User, Navigation, Phone } from 'lucide-react';

const AddressList = ({ addresses, onSelectAddress, selectedAddressId }) => {
  return (
    <>
      {addresses.map((address) => {
        const isHome = address.type === 'home';
        const isSelected = selectedAddressId === address._id;

        return (
          <section
            key={address._id}
            className={`mb-4 transition-all duration-200 `}
            onClick={() => onSelectAddress(address)}
          >
            <div className="relative border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md cursor-pointer">
              <div className="flex flex-col md:flex-row justify-between px-4 py-3">
                <div className="space-y-2 pr-20 md:pr-0">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gray-600 dark:text-gray-400" />
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
                        {address.locality}, {address.city}, {address.state} {address.postalcode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-600 dark:text-gray-400 flex-shrink-0" />
                    <p className="text-sm">{address.mobile}</p>
                  </div>
                </div>

                <div className="absolute top-4 right-4 md:static md:flex md:items-start md:mt-1">
                  <span
                    className={`text-xs px-3 py-1 rounded-full border flex items-center gap-1 font-medium ${
                      isHome
                        ? 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                    }`}
                  >
                    {isHome ? (
                      <Home size={12} className="text-blue-600" />
                    ) : (
                      <Briefcase size={12} className="text-purple-600" />
                    )}
                    {address.type.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
};

export default AddressList;