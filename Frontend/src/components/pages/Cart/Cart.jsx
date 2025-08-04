import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../authContext/useAuth";
import EmptyCart from "./EmptyCart";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
import Checkout from "./Checkout";
import OrderSuccessModal from "../../Modals/OrderSuccessModal";
import LoadingScreen from "../../Items/LoadingScreen";

import {
  fetchUserCart,
  updateCartItemQuantity,
  removeItemFromCart,
} from "../../../redux/Cart/cartSlice";

import {
  placeOrder,
  clearError,
  clearSuccessMessage,
  clearCurrentOrder,
  selectOrdersLoading,
  selectOrdersError,
  selectOrdersSuccessMessage,
  selectCurrentOrder,
} from "../../../redux/Orders/orderSlice";
import Header from "../../Layout/Header";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useAuth();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const isPlacingOrder = useSelector(
    (state) => selectOrdersLoading(state).placeOrder
  );
  const placeOrderError = useSelector(
    (state) => selectOrdersError(state).placeOrder
  );
  const successMessage = useSelector(selectOrdersSuccessMessage);
  const currentOrder = useSelector(selectCurrentOrder);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("Cash on Delivery");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUserCart());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage && currentOrder) {
      setShowOrderSuccessModal(true);
    } else if (placeOrderError) {
      alert(`Order placement failed: ${placeOrderError}`);
      dispatch(clearError("placeOrder"));
    }
  }, [successMessage, currentOrder, placeOrderError, dispatch]);

  const handleOrderSuccessModalClose = () => {
    setShowOrderSuccessModal(false);
    dispatch(clearError("placeOrder"));
    dispatch(clearSuccessMessage());
    dispatch(clearCurrentOrder());
    navigate("/home");
  };

  if (!cart && loading.fetch) return <LoadingScreen />;
  if (error && !placeOrderError) return <p className="text-red-500">{error}</p>;
  if (!cart || !cart.items || cart.items.length === 0) {
    return showOrderSuccessModal ? null : <EmptyCart navigate={navigate} />;
  }

  const handleUpdateQuantity = (cartItemId, newQty) => {
    const item = cart.items.find((i) => i._id === cartItemId);
    if (!item || newQty < 1) return;

    dispatch(
      updateCartItemQuantity({ productId: item.product._id, quantity: newQty })
    );
  };

  const handleRemoveItem = (item) => {
    if (!item) return;
    dispatch(removeItemFromCart({itemId : item.itemId, itemType : item.itemType}));
  };

  const handleSelectedAddress = (address) => {
    setSelectedAddress(address);
  };

  const handlePlaceOrder = ({ paymentMethod, shippingAddress }) => {
    if (isPlacingOrder) return;

    if (!cart || !cart.items || cart.items.length === 0) {
      alert("Your cart is empty. Cannot place an order.");
      return;
    }

    if (!shippingAddress) {
      alert("Please select a shipping address.");
      return;
    }

    const orderPayload = {
      user: user._id,
      items: cart.items.map((item) => ({
        itemId: item.itemId,
        itemType: item.itemType,
        quantity: item.quantity,
        price: item.currentPrice,
        title: item.currentTitle,
        imageUrl: item.currentImageUrl,
      })),
      subtotal: cart.subtotal,
      tax: cart.tax,
      total: cart.total,
      shipping: cart.shipping.cost,
      paymentMethod,
      shippingAddress: {
        type: shippingAddress.type,
        name: shippingAddress.name,
        mobile: shippingAddress.mobile,
        locality: shippingAddress.locality,
        street: shippingAddress.street,
        city: shippingAddress.city,
        district: shippingAddress.district,
        state: shippingAddress.state,
        country: shippingAddress.country,
        postalCode: shippingAddress.postalCode,
      },
    };

    dispatch(placeOrder(orderPayload));
    dispatch(fetchUserCart());
  };

  return (
    <>
    <Header/>
      {isCheckingOut ? (
        <Checkout
          cartItems={cart.items.map((item) => ({
            itemId: item.itemId,
            itemType: item.itemType,
            quantity: item.quantity,
            price: item.currentPrice, 
            title: item.currentTitle,
            imageUrl: item.currentImageUrl,
          }))}
          calculateSubtotal={cart.subtotal}
          calculateTotal={cart.total}
          calculateTax={cart.tax}
          shippingCosts={cart.shipping}
          setIsCheckingOut={setIsCheckingOut}
          selectedPaymentMethod={selectedPaymentMethod}
          onAddressSelect={handleSelectedAddress}
          onPlaceOrder={handlePlaceOrder}
        />
      ) : (
        <div className="w-full max-w-6xl mx-auto min-h-screen flex flex-col lg:flex-row gap-8 bg-white">
          <div className="flex-grow p-4 lg:p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                MY SHOPPING BAG ({cart.items.length})
              </h1>
            </div>
            <hr className="mb-4" />
            <div className="flex justify-between border-b border-gray-200 pb-2 mb-4">
              <span className="text-sm text-gray-500">
                PRODUCT
              </span>
              <div className="flex gap-24">
                <span className="hidden md:flex text-sm text-gray-500">
                  PRICE
                </span>
                <span className="text-sm text-gray-500">
                  TOTAL
                </span>
              </div>
            </div>

            <CartItems
              cartItems={cart.items}
              loading={loading}
              updateQuantity={handleUpdateQuantity}
              removeItem={handleRemoveItem}
            />
          </div>

          <CartSummary
            cartItems={cart.items}
            cart={cart}
            setIsCheckingOut={setIsCheckingOut}
            navigate={navigate}
          />
        </div>
      )}

      <OrderSuccessModal
        isOpen={showOrderSuccessModal}
        onClose={handleOrderSuccessModalClose}
      />
    </>
  );
};

export default Cart;
