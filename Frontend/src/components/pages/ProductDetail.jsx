import React, { useState, useEffect } from "react";
import {
  Heart,
  ZoomIn,
  Star,
  Shield,
  Truck,
  RotateCcw,
  MessageCircle,
  Share2,
  Minus,
  Plus,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Layout/Header";
import { Lens } from "../ui/lens";
import { useWishlistActions } from "../../hooks/wishlistHooks";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  selectSelectedProduct,
} from "../../redux/Products/productSlice";
import { useWishlist } from "../../wishlistContext/useWishlist";
import { cartHooks } from "../../hooks/userCartActions";

const ProductDetailPage = () => {
  const { wishlistItems } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { handleAddToWishlist } = useWishlistActions();
  const { handleAddToCart } = cartHooks();
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const productData = useSelector(selectSelectedProduct);
  console.log(wishlistItems);
  useEffect(() => {
    if (productId) {
      dispatch(getProductById(productId));
    }
  }, [dispatch, productId]);

  console.log(productData);
  console.log(wishlistItems);

  useEffect(() => {
    if (productData && wishlistItems) {
      const alreadyInWishlist = wishlistItems.some(
        (item) => (item?.itemId?._id || item.itemId) === productData._id
      );
      setIsWishlisted(alreadyInWishlist);
    }
  }, [productData, wishlistItems]);

  const handleWhatsAppQuote = (productData) => {
    if (!productData) return;

    const message = encodeURIComponent(
      `👋 Hello! I'm interested in this product.\n\nName: ${productData.name}\nID: ${productData.productId}\nCould you please assist me with more details?`
    );

    window.open(`https://wa.me/917382178982?text=${message}`, "_blank");
  };

  const handleNativeShare = () => {
      if (navigator.share) {
        navigator
          .share({
            title: "Check out this product!",
            text: "👋 Hey! I found this product you might like:",
            url: window.location.href,
          })
          .then(() => console.log("Shared successfully"))
          .catch((error) => console.error("Error sharing:", error));
      } else {
        alert("Sharing is not supported in your browser.");
      }
    };

  if (!productData) return <div>Loading or no product data...</div>;

  const defaultFeatures = [
    "High-quality stitching",
    "Fade-resistant material",
    "Lightweight & breathable",
    "Easy to wash and maintain",
  ];

  const featuresToShow =
    productData?.features?.length > 0 ? productData.features : defaultFeatures;

  const productImages = [
    productData.mainImageUrl,
    ...productData.additionalImageUrls,
  ];

  const formatPrice = (price) => {
    return `₹${price.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-sm md:text-base">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <div className="relative group bg-white rounded-2xl shadow">
              <Lens hovering={hovering} setHovering={setHovering}>
                <img
                  src={productImages[selectedImage]}
                  alt="18 Collection Sofa"
                  className="w-full h-[420px] object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />
              </Lens>
            </div>

            <div className="flex space-x-3 overflow-x-auto p-1">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-xl overflow-hidden transition-all duration-300 w-16 h-16 flex-shrink-0 ${
                    selectedImage === index
                      ? "ring-2 ring-amber-500 ring-offset-1 scale-105"
                      : "hover:scale-105 hover:shadow"
                  }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-amber-400 text-white px-2 py-1 rounded text-xs font-semibold">
                  {productData.category}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {productData.name}
              </h1>

              <div className="flex items-baseline space-x-2 mb-3">
                <span className="text-xl font-bold text-amber-600">
                  {formatPrice(productData.price)}
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm">
                {productData.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-6">
                {productData?.color && (
                  <div>
                    <h3 className="font-semibold text-gray-800">Color</h3>
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white ring-2 ring-gray-300 shadow-sm mt-1"
                      style={{ backgroundColor: productData.color }}
                    ></div>
                  </div>
                )}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Material</h3>
                  <span className="text-gray-600 capitalize">
                    {productData.material}
                  </span>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Pattern</h3>
                  <span className="text-gray-600 capitalize">
                    {productData.pattern}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-2">
                <button
                  className="col-span-8 bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-xl"
                  onClick={() => handleAddToCart(productData)}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    handleAddToWishlist(productData);
                  }}
                  disabled={isWishlisted}
                  className={`col-span-2 border rounded-xl p-3 ${
                    isWishlisted
                      ? "border-red-500 bg-red-50 text-red-600"
                      : "border-gray-300 hover:bg-red-50"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 mx-auto ${
                      isWishlisted ? "fill-current" : ""
                    }`}
                  />
                </button>
                <button className="col-span-2 border border-gray-300 rounded-xl p-3 hover:bg-gray-100" onClick={handleNativeShare}>
                  <Share2 className="w-5 h-5 mx-auto text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 text-sm"
                  onClick={() => handleWhatsAppQuote(productData)}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Quote on WhatsApp</span>
                </button>
                <button
                  className="bg-gray-900 hover:bg-gray-800 text-white py-2.5 px-4 rounded-xl text-sm"
                  onClick={() => navigate("/book-demo")}
                >
                  Book Home Demo
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Key Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuresToShow.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2 text-xs">
              <div className="flex items-center space-x-1 bg-green-50 px-3 py-1.5 rounded-full">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-green-800">Secure Payment</span>
              </div>
              {productData.price > 1000 && (
                <div className="flex items-center space-x-1 bg-blue-50 px-3 py-1.5 rounded-full">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-800">Free Delivery</span>
                </div>
              )}
              <div className="flex items-center space-x-1 bg-purple-50 px-3 py-1.5 rounded-full">
                <RotateCcw className="w-4 h-4 text-purple-600" />
                <span className="text-purple-800">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
