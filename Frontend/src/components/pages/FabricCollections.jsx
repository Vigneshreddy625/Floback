import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Award,
  Palette,
  MessageCircle,
  Calendar,
} from "lucide-react";
import Header from "../Layout/Header";
import { useNavigate } from "react-router-dom";
import useCollections from "../../hooks/useCollection";
import { getFirstWordLower } from "../../hooks/getFirstWordLetter";

const FabricCollections = () => {
  const { collections } = useCollections();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-amber-50 to-amber-100 py-8 sm:py-12 md:py-16">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white rounded-full shadow mb-6 border border-gray-200">
            <Sparkles className="w-4 h-4 text-amber-500 mr-1.5 sm:mr-2" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Premium Collection 2024
            </span>
          </div>
          <h1 className="text-2xl sm:text-6xl font-black text-gray-800 mb-4 sm:mb-6 font-serif leading-tight">
            Exquisite Fabric
            <br />
            <span className="text-2xl sm:text-6xl text-amber-600">
              Collections
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
            Transform your space with our meticulously curated premium fabrics.
            Every thread tells a story of luxury, comfort, and timeless
            elegance.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="hidden md:flex items-center bg-white px-5 py-2.5 rounded-full shadow border border-gray-200">
              <Award className="w-4 h-4 text-amber-500 mr-2" />
              <span className="text-gray-700 font-medium text-xs md:text-lg">
                Premium Quality
              </span>
            </div>
            <div className="hidden md:flex items-center bg-white px-5 py-2.5 rounded-full shadow border border-gray-200">
              <Palette className="w-4 h-4 text-amber-400 mr-2" />
              <span className="text-gray-700 font-medium text-xs md:text-lg">
                Endless Variety
              </span>
            </div>
            <div className="hidden md:flex items-center bg-white px-5 py-2.5 rounded-full shadow border border-gray-200">
              <Sparkles className="w-4 h-4 text-amber-300 mr-2" />
              <span className="text-gray-700 font-medium text-xs md:text-lg">
                Exclusive Designs
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-10 md:py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 font-serif">
              Our Collections
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {collections.map((c) => (
              <div
                key={c._id}
                className="group bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={c.thumbnailImageUrl}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 text-amber-600 px-2 py-0.5 rounded-full text-xs font-semibold">
                    {c.type}
                  </span>
                  <span className="absolute top-3 right-3 bg-white/90 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium">
                    {c.fabricCount} Fabrics
                  </span>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 font-serif group-hover:text-amber-600">
                    {c.name}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-3 line-clamp-2">
                    {c.description}
                  </p>
                  <button
                    className="inline-flex items-center text-amber-600 hover:text-amber-800 font-medium text-sm sm:text-base"
                    onClick={() =>
                      navigate(
                        `/fabric-collection/${getFirstWordLower(c.name)}`,
                        { state: { collection: c } }
                      )
                    }
                  >
                    View Fabrics <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-10 sm:py-14 md:py-20 bg-gradient-to-br from-white via-amber-50 to-amber-100 overflow-hidden">
        <div className="absolute inset-0">
          <div className="hidden md:block absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full"></div>
          <div className="hidden md:block absolute bottom-10 right-10 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute inset-0 md:inset-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 bg-white/5 rounded-full"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center text-black">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-300 backdrop-blur-sm rounded-full mb-6">
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" />
            <span className="text-xs sm:text-sm font-medium">
              Expert Consultation Available
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 font-serif">
            Ready to Transform Your Space?
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-10 max-w-md sm:max-w-2xl mx-auto leading-relaxed">
            Let our fabric specialists guide you to the perfect choice. Get
            personalized recommendations tailored to your style and needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              to="/book-demo"
              className="group bg-white text-amber-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-gray-50 transition transform hover:scale-105 font-semibold text-sm sm:text-base flex items-center space-x-2 sm:space-x-3 shadow-md sm:shadow-lg"
            >
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Book Free Consultation</span>
            </Link>
            <button
              onClick={() =>
                window.open("https://wa.me/917382178982", "_blank")
              }
              className="group bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-green-600 transition transform hover:scale-105 font-semibold text-sm sm:text-base flex items-center space-x-2 sm:space-x-3 shadow-md sm:shadow-lg"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>WhatsApp Us Now</span>
            </button>
          </div>
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600">
            ✨ Free consultation • Expert advice • Instant support
          </p>
        </div>
      </section>
    </div>
  );
};

export default FabricCollections;
