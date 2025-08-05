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
  const {cart} = useSelector((state) => state.cart);

  const { handleAddToCart } = cartHooks();

  const { handleAddToWishlist } = useWishlistActions();

  useEffect(() => {
    dispatch(fetchUserCart())
  }, [dispatch])

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
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-3 text-sm">
            <Link
              to="/fabric-collections"
              className="flex items-center text-gray-600 hover:text-amber-600 transition-all duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Back to Collections</span>
            </Link>
            <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
            <span className="text-amber-700 font-semibold">
              {collection.name}
            </span>
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-lg border border-amber-200 mb-6">
              <Star className="w-4 h-4 text-amber-500 mr-2" />
              <span className="text-amber-700 text-sm font-semibold uppercase tracking-wider">
                {collection.type}
              </span>
            </div>

            <h1 className="text-3xl md:text-7xl font-bold mb-6 font-serif">
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
                {collection.name}
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              {collection.description}
            </p>

            <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-lg border border-amber-200">
              <Sparkles className="w-5 h-5 text-amber-500 mr-3" />
              <span className="text-xs text-amber-700 font-semibold">
                {collection.fabricCount} Premium Fabric Options Available
              </span>
            </div>
          </div>
        </div>

        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="hidden md:absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      <section className="py-8 md:py-20 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-7xl mx-auto px-2 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
              Discover Our Exquisite Collection
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
            {fabrics.fabrics.map((fabric, index) => (
              <div
                key={fabric._id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-amber-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={fabric.mainImageUrl}
                    alt={fabric.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <Link
                      to={`/fabric/${fabric.fabricId}`}
                      className="bg-white text-gray-900 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-6 group-hover:translate-y-0 flex items-center space-x-2 shadow-xl hover:shadow-lg hover:scale-105 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="font-medium">View</span>
                    </Link>
                  </div>

                  <button
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 opacity-0 group-hover:opacity-100"
                    onClick={() => handleAddToWishlist(fabric)}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-xs font-medium rounded-full">
                      {fabric.color}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif group-hover:text-amber-600 transition-colors duration-300">
                      {fabric.name}
                    </h3>

                    <ShoppingCart
                      onClick={() =>
                        handleAddToCart(fabric)
                      }
                      className="w-5 h-5 cursor-pointer text-gray-600 hover:text-black"
                    />
                  </div>

                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {fabric.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      ₹{fabric.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => openWhatsApp(fabric.name)}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-1 shadow-md hover:shadow-lg transform hover:scale-105 text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="hidden sm:inline-block">Enquire</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-12 md:py-20 bg-gradient-to-b from-white to-amber-50 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h2 className="flex items-center gap-4 text-2xl md:text-5xl font-bold text-black mb-6 font-serif">
            <Sparkles className="hidden sm:inline-block w-8 h-8 md:w-12 md:h-12 text-black opacity-90 shrink-0" />
            <span>Ready to Transform Your Space?</span>
          </h2>

          <p className="text-xl text-amber-500 mb-10 max-w-3xl mx-auto leading-relaxed">
            Book a free home consultation to see these exquisite fabrics in your
            space with our expert guidance and personalized recommendations.
          </p>

          <Link
            to="/book-demo"
            className="inline-flex items-center px-10 py-4 bg-white text-amber-700 rounded-full hover:bg-amber-50 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-xl transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5 mr-3" />
            Book Free Home Demo
          </Link>
        </div>
      </section>

      <button
        onClick={() => openWhatsApp(collection.name)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 z-50 transform hover:scale-110 flex items-center justify-center"
      >
        <MessageCircle className="w-8 h-8" />
      </button>
    </div>
  );
};

export default FabricCollectionDetail;
