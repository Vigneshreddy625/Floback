import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
import Checkout from "./Checkout";
import OrderSuccessModal from "../Modals/OrderSuccessModal"
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  updateCartItemOptimistic,
  removeFromCartOptimistic,
  removeFromCart,
} from "../../redux/Cart/cartSlice"
import LoadingScreen from "../Items/LoadingScreen";
import { createOrder, resetCreateOrderStatus } from "../../redux/Orders/orderSlice"; 

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, loading, error } = useSelector((state) => state.cart);
  const {
    createOrderStatus, 
    createOrderError,   
    newlyCreatedOrder,  
  } = useSelector((state) => state.orders); 

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Cash on Delivery");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false); 

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (createOrderStatus === "succeeded") {
      setShowOrderSuccessModal(true);
    } else if (createOrderStatus === "failed") {
      alert(`Order placement failed: ${createOrderError}`);
      dispatch(resetCreateOrderStatus());
    }
  }, [createOrderStatus, createOrderError, newlyCreatedOrder, dispatch]);

  const handleOrderSuccessModalClose = () => {
    setShowOrderSuccessModal(false);
    dispatch(resetCreateOrderStatus());
    navigate('/home'); 
  };


  if (!cart && loading.fetch) return <LoadingScreen />;
  if (error && !createOrderError) return <p className="text-red-500">{error}</p>;

  if (!cart || !cart.items || cart.items.length === 0) {
    return showOrderSuccessModal ? null : <EmptyCart navigate={navigate} />;
  }

  const handleUpdateQuantity = (cartItemId, newQty) => {
    const item = cart.items.find((i) => i._id === cartItemId);
    if (!item || newQty < 1) return;

    dispatch(
      updateCartItemOptimistic({
        productId: item.product._id,
        quantity: newQty,
      })
    );
    dispatch(updateCartItem({ productId: item.product._id, quantity: newQty }));
  };

  const handleRemoveItem = (cartItemId) => {
    const item = cart.items.find((i) => i._id === cartItemId);
    if (!item) return;
    dispatch(removeFromCartOptimistic(item.product._id));
    dispatch(removeFromCart(item.product._id));
  };

  const handleSelectedAddress = (address) => {
    setSelectedAddress(address);
  };

  const handlePlaceOrder = ({ paymentMethod, shippingAddress }) => {
    if (createOrderStatus === "loading") {
      return;
    }

    if (!cart || !cart.items || cart.items.length === 0) {
      alert("Your cart is empty. Cannot place an order.");
      return;
    }
    if (!shippingAddress) {
      alert("Please select a shipping address.");
      return;
    }

    const orderPayload = {
      user: cart.user,
      items: cart.items.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
        title: item.product.title,
      })),
      subtotal: cart.subtotal,
      tax: cart.tax,
      total: cart.total,
      shipping: cart.shipping.cost,
      paymentMethod: paymentMethod,
      shippingAddress: {
        type: shippingAddress.type,
        name: shippingAddress.name,
        mobile: shippingAddress.mobile,
        // houseNo: shippingAddress.houseNo,
        locality: shippingAddress.locality,
        street: shippingAddress.street,
        city: shippingAddress.city,
        district: shippingAddress.district,
        state: shippingAddress.state,
        country: shippingAddress.country,
        postalCode: shippingAddress.postalCode,
      },
    };

    console.log("Order Payload:", orderPayload);
    dispatch(createOrder(orderPayload));
    dispatch(fetchCart()); // Refresh cart after order creation
  };

  return (
    <>
      {isCheckingOut ? (
        <Checkout
          cartItems={cart.items.map((item) => ({
            id: item._id,
            name: item.product.title,
            image: item.product.image,
            itemNo: item.product._id.slice(-6),
            color: item.product.colors[0]?.name || "Default",
            qty: item.quantity,
            price: item.product.price,
            originalPrice: item.product.originalPrice,
          }))}
          calculateSubtotal={cart.subtotal}
          calculateTotal={cart.total}
          calculateTax={cart.tax}
          shippingCosts={cart.shipping.cost}
          setIsCheckingOut={setIsCheckingOut}
          selectedPaymentMethod={selectedPaymentMethod}
          onAddressSelect={handleSelectedAddress}
          onPlaceOrder={handlePlaceOrder}
        />
      ) : (
        <div className="w-full lg:min-w-[1024px] min-h-screen flex flex-col lg:flex-row gap-8 bg-white dark:bg-black mt-2">
          <div className="flex-grow p-4 lg:p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                MY SHOPPING BAG ({cart.items.length})
              </h1>
              <button className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
                Save for later
              </button>
            </div>
            <hr className="mb-4" />
            <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                PRODUCT
              </span>
              <div className="flex gap-24">
                <span className="hidden md:flex text-sm text-gray-500 dark:text-gray-400">
                  PRICE
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
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