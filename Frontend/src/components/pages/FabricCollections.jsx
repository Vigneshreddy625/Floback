import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  Award,
  Palette,
  MessageCircle,
  Calendar
} from 'lucide-react';
import Header from '../Layout/Header';
import { useNavigate } from 'react-router-dom';
import useCollections from '../../hooks/useCollection';
import { getFirstWordLower } from '../../hooks/getFirstWordLetter';

const FabricCollections = () => {
  const { collections } = useCollections();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-amber-50 to-amber-100 py-12 md:py-28">
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow mb-8 border border-gray-200">
            <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">Premium Collection 2024</span>
          </div>

          <h1 className="text-3xl sm:text-7xl font-black text-gray-800 mb-6 font-serif leading-tight">
            Exquisite Fabric<br />
            <span className="text-3xl sm:text-6xl text-amber-600">Collections</span>
          </h1>

          <p className="text-lg sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform your space with our meticulously curated premium fabrics.
            Every thread tells a story of luxury, comfort, and timeless elegance.
          </p>

          <div className="hidden md:flex flex-wrap justify-center items-center gap-6 mb-6 ">
            <div className="flex items-center bg-white px-6 py-3 rounded-full shadow border border-gray-200">
              <Award className="w-5 h-5 text-amber-500 mr-3" />
              <span className="text-gray-700 font-medium">Premium Quality</span>
            </div>
            <div className="flex items-center bg-white px-6 py-3 rounded-full shadow border border-gray-200">
              <Palette className="w-5 h-5 text-amber-400 mr-3" />
              <span className="text-xs text-gray-700 font-medium">Endless Variety</span>
            </div>
            <div className="flex items-center bg-white px-6 py-3 rounded-full shadow border border-gray-200">
              <Sparkles className="w-5 h-5 text-amber-300 mr-3" />
              <span className="text-gray-700 font-medium">Exclusive Designs</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Our Collections</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {collections.map((collection) => (
              <div
                key={collection._id}
                className="group bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={collection.thumbnailImageUrl}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/90 text-amber-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {collection.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {collection.fabricCount} Fabrics
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 font-serif group-hover:text-amber-600">
                    {collection.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {collection.description}
                  </p>
                  <button
                    className="inline-flex items-center text-amber-600 hover:text-amber-800 font-medium text-sm"
                    onClick={() => navigate(`/fabric-collection/${getFirstWordLower(collection.name)}`, { state: { collection } })}
                  >
                    View Fabrics <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative py-24 bg-gradient-to-br from-white via-amber-50 to-amber-100 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 text-center text-black">
          <div className="inline-flex items-center px-4 py-2 bg-amber-300 backdrop-blur-sm rounded-full mb-8">
            <MessageCircle className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Expert Consultation Available</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Let our fabric specialists guide you to the perfect choice. 
            Get personalized recommendations tailored to your style and needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/book-demo"
              className="group bg-white text-amber-600 px-10 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center space-x-3"
            >
              <Calendar className="w-6 h-6" />
              <span>Book Free Consultation</span>
            </Link>
            <button
              onClick={() => window.open('https://wa.me/917382178982', '_blank')}
              className="group bg-green-500 text-white px-10 py-4 rounded-2xl hover:bg-green-600 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center space-x-3"
            >
              <MessageCircle className="w-6 h-6" />
              <span>WhatsApp Us Now</span>
            </button>
          </div>
          
          <div className="mt-12 text-gray-600">
            <p className="text-sm">✨ Free consultation • Expert advice • Instant support</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FabricCollections;
