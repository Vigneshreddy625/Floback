import React, { use, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  Heart,
  MessageCircle,
  ShoppingCart,
  Sparkles,
  Star,
} from "lucide-react";
import Header from "../Layout/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  getCollectionWithFabrics,
  selectCollectionWithFabrics,
} from "../../redux/Collections/collectionSlice";
import { useWishlistActions } from "../../hooks/wishlistHooks";
import { cartHooks } from "../../hooks/userCartActions";
import { fetchUserCart } from "../../redux/Cart/cartSlice";

const FabricCollectionDetail = () => {
  const location = useLocation();
  const collection = location.state?.collection;
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const { handleAddToCart } = cartHooks();

  const { handleAddToWishlist } = useWishlistActions();

  useEffect(() => {
    dispatch(fetchUserCart());
  }, [dispatch]);

  console.log(collection);

  useEffect(() => {
    if (collection) {
      dispatch(getCollectionWithFabrics(collection._id));
    }
  }, [dispatch, collection]);

  const fabrics = useSelector(selectCollectionWithFabrics);
  console.log(fabrics);
  console.log(cart);

  if (!fabrics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center p-12 bg-white rounded-3xl shadow-2xl border border-amber-100">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Collection Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The collection you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/fabric-collections"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  const openWhatsApp = (fabricName) => {
    const message = encodeURIComponent(
      `Hi! I'm interested in ${fabricName} from ${collection.name}. Can you help me with more details?`
    );
    window.open(`https://wa.me/917382178982?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-xs sm:text-sm">
            <Link
              to="/fabric-collections"
              className="flex items-center text-gray-600 hover:text-amber-600 transition group"
            >
              <ArrowLeft className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition" />
              <span className="font-medium">Back to Collections</span>
            </Link>
            <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
            <span className="text-amber-700 font-semibold truncate">
              {collection.name}
            </span>
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="relative max-w-5xl mx-auto px-4 py-12 sm:py-16 md:py-20 text-center">
          <div className="inline-flex items-center px-3 py-1.5 bg-white rounded-full shadow-lg border border-amber-200 mb-4 text-xs sm:text-sm">
            <Star className="w-4 h-4 text-amber-500 mr-2" />
            <span className="text-amber-700 font-semibold uppercase tracking-wider">
              {collection.type}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 font-serif leading-tight">
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent block">
              {collection.name}
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
            {collection.description}
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-lg border border-amber-200 text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-amber-500 mr-2" />
            <span>
              {collection.fabricCount} Premium Fabric Options Available
            </span>
          </div>
        </div>
        <div className="absolute top-10 left-4 w-16 h-16 bg-amber-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="hidden md:block absolute bottom-20 right-10 w-24 h-24 bg-amber-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      <section className="py-6 sm:py-10 md:py-14 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 font-serif">
              Discover Our Exquisite Collection
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {fabrics.fabrics.map((fabric, index) => (
              <div
                key={fabric._id}
                className="group relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-amber-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="md:aspect-square overflow-hidden relative">
                  <img
                    src={fabric.mainImageUrl}
                    alt={fabric.name}
                    className="w-full h-32 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link
                      to={`/fabric/${fabric.fabricId}`}
                      className="bg-white text-gray-900 px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center space-x-1 text-xs sm:text-sm shadow hover:shadow-md hover:scale-105"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </Link>
                  </div>

                  <button
                    className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 shadow-sm"
                    onClick={() => handleAddToWishlist(fabric)}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 sm:p-4">
                  <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full mb-2">
                    {fabric.color}
                  </span>

                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm sm:text-lg font-bold text-gray-900 font-serif group-hover:text-amber-600 transition">
                      {fabric.name}
                    </h3>
                    <ShoppingCart
                      onClick={() => handleAddToCart(fabric)}
                      className="w-5 h-5 cursor-pointer text-gray-600 hover:text-black"
                    />
                  </div>

                  <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-3">
                    {fabric.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      ₹{fabric.price.toLocaleString()}
                    </span>

                    <button
                      onClick={() => openWhatsApp(fabric.name)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition transform hover:scale-105 shadow hover:shadow-md flex items-center space-x-1 text-xs sm:text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">Enquire</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-8 sm:py-12 md:py-16 bg-gradient-to-b from-white to-amber-50 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-black mb-4 font-serif">
            <Sparkles className="inline-block w-6 h-6 text-black mr-2 opacity-90" />
            Ready to Transform Your Space?
          </h2>
          <p className="text-base sm:text-lg text-amber-500 mb-6 max-w-md mx-auto leading-relaxed">
            Book a free home consultation to see these exquisite fabrics in your
            space with our expert guidance.
          </p>
          <Link
            to="/book-demo"
            className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-amber-700 rounded-full hover:bg-amber-50 transition transform hover:scale-105 font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl"
          >
            <Sparkles className="w-5 h-5 mr-2 sm:mr-3" />
            Book Free Home Demo
          </Link>
        </div>
      </section>

      <button
        onClick={() => openWhatsApp(collection.name)}
        className="fixed bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-2xl hover:shadow-xl transition transform hover:scale-110 flex items-center justify-center z-50"
      >
        <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>
    </div>
  );
};

export default FabricCollectionDetail;
