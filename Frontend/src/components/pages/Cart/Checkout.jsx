import React, { useState, useEffect, useCallback } from "react";
import { CreditCard, ArrowLeft } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import LoadingScreen from "../Items/LoadingScreen";
import { fetchAddresses } from "../../redux/Address/addressSlice";
import AddressList from "./AddressList";
import NewAddress from "../Addresses/NewAddress";

const Checkout = ({
  cartItems,
  calculateSubtotal,
  calculateTotal,
  calculateTax,
  shippingCosts,
  setIsCheckingOut,
  onPaymentMethodChange,
  selectedPaymentMethod,
  onAddressSelect,
  onPlaceOrder,
}) => {
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState(
    selectedPaymentMethod || "Cash on Delivery"
  );
  const [newAddress, setNewAddress] = useState(false);

  const addresses = useSelector((state) => state.addresses.addresses);
  const loading = useSelector((state) => state.addresses.loading);

  const refreshAddresses = useCallback(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  useEffect(() => {
    refreshAddresses();
  }, [refreshAddresses]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      const firstHomeAddress = addresses.find((address) => address.type === "home");
      if (firstHomeAddress) {
        setSelectedAddress(firstHomeAddress);
        if (onAddressSelect) {
          onAddressSelect(firstHomeAddress);
        }
      }
    }
  }, [addresses, selectedAddress, onAddressSelect]); 

  useEffect(() => {
    if (selectedPaymentMethod && selectedPaymentMethod !== paymentMethod) {
      setPaymentMethod(selectedPaymentMethod);
    }
  }, [selectedPaymentMethod, paymentMethod]); 

  const handleAddressAdded = useCallback(
    (newlyAddedAddress) => {
      setNewAddress(false);
      dispatch(fetchAddresses()).then(() => {
        if (newlyAddedAddress && onAddressSelect) {
            setSelectedAddress(newlyAddedAddress);
            onAddressSelect(newlyAddedAddress);
        }
      });
    },
    [dispatch, onAddressSelect]
  );

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (onPaymentMethodChange) {
      onPaymentMethodChange(method);
    }
  };

  const addressToDisplay = addresses.find((address) => address.type === "home");

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="w-full min-h-screen flex flex-col p-4 bg-white dark:bg-black">
        <div className="flex items-center gap-2 mb-4 lg:my-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <ArrowLeft
            size={24}
            className="mt-1 cursor-pointer"
            onClick={() => setIsCheckingOut(false)}
          />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Checkout
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Shipping Address
            </h2>
            {addressToDisplay ? (
              <AddressList
                addresses={[addressToDisplay]}
                selectedAddressId={addressToDisplay._id} 
                onSelectAddress={() => {}}
              />
            ) : (
              <>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  No home address found. Please add an address to continue.
                </p>
                <button
                  onClick={() => setNewAddress(true)}
                  className="text-sm border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  + ADD NEW ADDRESS
                </button>
              </>
            )}

            <div className="mb-8 mt-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Payment Method
              </h2>
              <div className="space-y-3">
                <div
                  className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer ${
                    paymentMethod === "cod"
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-300 dark:border-gray-700"
                  }`}
                  onChange={() => handlePaymentMethodChange("Cash on Delivery")}
                >
                  <CreditCard className="text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-800 dark:text-gray-200">COD</span>
                </div>
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Order Summary
            </h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Qty: {item.qty}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Rs.{(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-96 lg:sticky lg:top-4 lg:self-start lg:mt-0">
            <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Order Total
              </h2>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Subtotal
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    Rs.{calculateSubtotal}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Tax
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    Rs.{calculateTax}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Shipping
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    Rs.{shippingCosts}
                  </span>
                </div>
                <hr className="mb-4 border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Rs.{calculateTotal}
                  </span>
                </div>
              </div>

              <button className="w-full bg-black dark:bg-white dark:text-black text-white py-3 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                onClick={() => {
                  if (onPlaceOrder) {
                    onPlaceOrder({
                      paymentMethod,
                      shippingAddress: addressToDisplay,
                    });
                  }
                }}  
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
      <NewAddress
        isOpen={newAddress}
        onClose={() => setNewAddress(false)}
        onSuccess={handleAddressAdded}
      />
    </>
  );
};

export default Checkout;