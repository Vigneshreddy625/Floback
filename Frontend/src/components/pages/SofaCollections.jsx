
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle } from 'lucide-react';
import Header from '../Layout/Header';

const SofaCollections = () => {
  const sofaCollections = [
    {
      id: 'atlas',
      name: 'ATLAS',
      image: '/lovable-uploads/398fa471-0d5d-4025-af2c-d359608273a4.png',
      description: 'Modern minimalist design with clean lines'
    },
    {
      id: 'cambridge',
      name: 'CAMBRIDGE',
      image: '/lovable-uploads/398fa471-0d5d-4025-af2c-d359608273a4.png',
      description: 'Classic chesterfield style with button tufting'
    },
    {
      id: 'heritage',
      name: 'HERITAGE',
      image: '/lovable-uploads/398fa471-0d5d-4025-af2c-d359608273a4.png',
      description: 'Traditional comfort with contemporary appeal'
    },
    {
      id: 'cosmo',
      name: 'COSMO',
      image: '/lovable-uploads/398fa471-0d5d-4025-af2c-d359608273a4.png',
      description: 'Vibrant colors and modern aesthetics'
    },
    {
      id: 'royal',
      name: 'ROYAL',
      image: '/lovable-uploads/398fa471-0d5d-4025-af2c-d359608273a4.png',
      description: 'Luxury design with premium materials'
    },
    {
      id: 'comfort',
      name: 'COMFORT',
      image: '/lovable-uploads/398fa471-0d5d-4025-af2c-d359608273a4.png',
      description: 'Maximum comfort with ergonomic design'
    }
  ];

  const openWhatsApp = () => {
    window.open('https://wa.me/917382178982', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header/>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-yellow-600 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
          <span>/</span>
          <span className="text-gray-900">Sofa Collections</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <img
                src="/lovable-uploads/398fa471-0d5d-4025-af2c-d359608273a4.png"
                alt="Sofa Collections"
                className="w-full max-w-2xl h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="flex-1 ml-12">
              <h1 className="text-5xl font-bold mb-4 font-serif">SOFA COLLECTIONS</h1>
              <p className="text-xl mb-8">Liked what you saw?</p>
              <button 
                onClick={openWhatsApp}
                className="bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
              >
                GET IN TOUCH
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sofa Collections Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sofaCollections.map((sofa) => (
              <div key={sofa.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <div className="relative overflow-hidden">
                  <img
                    src={sofa.image}
                    alt={sofa.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <Link 
                      to={`/product/sofa-${sofa.id}`}
                      className="bg-white text-gray-900 px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-medium hover:bg-gray-100"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{sofa.name}</h3>
                  <p className="text-gray-600 mb-4">{sofa.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-600 font-bold text-lg">From ₹2,999</span>
                    <Link 
                      to={`/product/sofa-${sofa.id}`}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <button
        onClick={openWhatsApp}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SofaCollections;
