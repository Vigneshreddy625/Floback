
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '../Layout/Header';

const FabricCollections = () => {
  const collections = [
    {
      id: 'atlas',
      name: 'ATLAS Collection',
      description: 'Premium Cotton Blend - High Durability',
      image: '/lovable-uploads/577a6125-dda3-40e1-877e-d2cf5a4899cd.png',
      fabricCount: 6,
      priceRange: '₹1,249',
      category: 'Textured Cotton'
    },
    {
      id: 'cambridge',
      name: 'CAMBRIDGE Collection',
      description: 'Genuine Leather - Very High Durability',
      image: '/lovable-uploads/322bda1a-8777-4c8c-b030-024554171d3f.png',
      fabricCount: 6,
      priceRange: '₹1,049',
      category: 'Premium Leather'
    },
    {
      id: 'heritage',
      name: 'HERITAGE Collection',
      description: 'Jacquard Weave - Traditional Patterns',
      image: '/lovable-uploads/f311120f-d25a-4666-ba06-f2f9bf86f67b.png',
      fabricCount: 5,
      priceRange: '₹890',
      category: 'Jacquard Weave'
    },
    {
      id: 'cosmo',
      name: 'COSMO Collection',
      description: 'Pure Linen - Natural Texture',
      image: '/lovable-uploads/5c00a33b-677c-4faa-96e4-32e846559d63.png',
      fabricCount: 6,
      priceRange: '₹750 - ₹779',
      category: 'Pure Linen'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header/>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-50 to-yellow-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-serif">
            Premium Fabric Collections
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover our exclusive range of premium fabrics for sofas, curtains, and home furnishing. 
            Each collection is carefully curated for quality, durability, and style.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></span>
              Premium Quality
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></span>
              Multiple Textures
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></span>
              Color Variety
            </div>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {collections.map((collection) => (
              <div key={collection.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-yellow-600 font-medium">{collection.category}</span>
                    <span className="text-sm text-gray-500">{collection.fabricCount} Fabrics</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif">{collection.name}</h3>
                  <p className="text-gray-600 mb-4">{collection.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">{collection.priceRange}</span>
                    <Link
                      to={`/fabric-collection/${collection.id}`}
                      className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
                    >
                      <span>View Collection</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-serif">Need Help Choosing?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Our experts can help you select the perfect fabric for your home. 
            Book a free consultation or get instant assistance on WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-demo"
              className="bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition-colors font-medium"
            >
              Book Free Consultation
            </Link>
            <button
              onClick={() => window.open('https://wa.me/917382178982', '_blank')}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              WhatsApp Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FabricCollections;
