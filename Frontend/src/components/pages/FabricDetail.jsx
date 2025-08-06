import React, { useEffect, useState } from "react";
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
import Header from "../Layout/Header";
import { Lens } from "../ui/lens";
import {
  getFabricById,
  selectCurrentFabric,
} from "../../redux/Fabrics/fabricSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useWishlistActions } from "../../hooks/wishlistHooks";
import { cartHooks } from "../../hooks/userCartActions";
import { useWishlist } from "../../wishlistContext/useWishlist";

const FabricDetail = () => {
  const {wishlistItems} = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { handleAddToWishlist } = useWishlistActions();
  const { handleAddToCart } = cartHooks();
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {fabricId} = useParams(); 
  const fabricData = useSelector(selectCurrentFabric); 
  useEffect(() => {
    if (fabricId) {
      dispatch(getFabricById(fabricId));
    }
  }, [dispatch, fabricId]);

  useEffect(() => {
  if (fabricData && wishlistItems) {
    const alreadyInWishlist = wishlistItems.some(
      (item) => (item.itemId._id || item.itemId) === fabricData._id
    );
    setIsWishlisted(alreadyInWishlist);
  }
}, [fabricData, wishlistItems]);

const handleWhatsAppQuote = (fabricData) => {
  if (!fabricData) return;

  const message = encodeURIComponent(
    `👋 Hello! I'm interested in this fabric.\n\nName: ${fabricData.name}\nID: ${fabricData.fabricId}\nCould you please assist me with more details?`
  );

  window.open(`https://wa.me/917382178982?text=${message}`, '_blank');
};

const handleNativeShare = () => {
      if (navigator.share) {
        navigator
          .share({
            title: "Check out this fabric!",
            text: "👋 Hey! I found this fabric you might like:",
            url: window.location.href,
          })
          .then(() => console.log("Shared successfully"))
          .catch((error) => console.error("Error sharing:", error));
      } else {
        alert("Sharing is not supported in your browser.");
      }
    };


  if (!fabricData) return <div>Loading or no fabric data...</div>;

  const defaultFeatures = [
    "High-quality stitching",
    "Fade-resistant material",
    "Lightweight & breathable",
    "Easy to wash and maintain",
  ];

  const featuresToShow =
    fabricData?.features?.length > 0 ? fabricData.features : defaultFeatures;

  const productImages = [
  fabricData?.mainImageUrl,
  ...(fabricData?.additionalImageUrls || []),
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

  <div className="max-w-3xl lg:max-w-6xl mx-auto px-4 py-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
      <div className="space-y-4">
        <div className="relative group bg-white rounded-2xl shadow">
          <Lens hovering={hovering} setHovering={setHovering}>
            <img
              src={productImages[selectedImage]}
              alt="18 Collection Sofa"
              className="w-full h-[280px] sm:h-[340px] lg:h-[420px] object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
            />
          </Lens>
        </div>

        <div className="flex space-x-2 overflow-x-auto p-1">
          {productImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`rounded-xl overflow-hidden transition-all duration-300 w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 ${
                selectedImage === index
                  ? "ring-2 ring-amber-500 ring-offset-1 scale-105"
                  : "hover:scale-105 hover:shadow"
              }`}
            >
              <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <span className="bg-amber-400 text-white px-2 py-1 rounded text-xs font-semibold">
            {fabricData.collectionId.name}
          </span>

          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mt-1 mb-2">
            {fabricData.name}
          </h1>

          <div className="flex items-baseline space-x-2 mb-3">
            <span className="text-lg sm:text-xl font-bold text-amber-600">
              {formatPrice(fabricData.price)}
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-4">
            {fabricData.description}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap space-x-4 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-white ring-2 ring-gray-300 shadow-sm" style={{ backgroundColor: fabricData.color }} />
              <div>
                <h3 className="text-gray-800 font-semibold text-xs sm:text-sm">Color</h3>
                <span className="text-gray-600 text-xs capitalize">{fabricData.color}</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">Material</h3>
              <span className="text-gray-600 text-xs capitalize">{fabricData.material}</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-xs sm:text-sm">Pattern</h3>
              <span className="text-gray-600 text-xs capitalize">{fabricData.pattern}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-2">
            <button
                  className="col-span-8 bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-xl"
                  onClick={() => handleAddToCart(fabricData)}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    handleAddToWishlist(fabricData);
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
            <button className="bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 text-xs sm:text-sm" onClick={() => handleWhatsAppQuote(fabricData)}>
              <MessageCircle className="w-4 h-4" />
              <span>Quote on WhatsApp</span>
            </button>
            <button className="bg-gray-900 hover:bg-gray-800 text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm" onClick={() => navigate("/book-demo")}>
              Book Home Demo
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Key Features</h3>
          <div className="grid grid-cols-1 gap-3 text-xs sm:text-sm">
            {featuresToShow.map((feature, i) => (
              <div key={i} className="flex items-start space-x-2 bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition">
                <Star className="w-4 h-4 text-amber-500 flex-shrink-0 mt-1" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-full">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-green-800">Secure Payment</span>
          </div>
          {fabricData.price > 1000 && (
            <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-full">
              <Truck className="w-4 h-4 text-blue-600" />
              <span className="text-blue-800">Free Delivery</span>
            </div>
          )}
          <div className="flex items-center space-x-1 bg-purple-50 px-2 py-1 rounded-full">
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

export default FabricDetail;
