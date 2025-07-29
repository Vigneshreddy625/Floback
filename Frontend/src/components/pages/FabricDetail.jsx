
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ZoomIn, ZoomOut, Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import Header from '../Layout/Header';

const FabricDetail = () => {
  const { fabricId } = useParams();
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isFavorite, setIsFavorite] = useState(false);

  // All fabric data from ProductDetail
  const allFabrics = {
    // ATLAS Collection
    'atlas-01': {
      id: 'atlas-01',
      name: 'ATLAS_01',
      image: '/lovable-uploads/577a6125-dda3-40e1-877e-d2cf5a4899cd.png',
      description: 'Light beige textured fabric',
      price: 1249,
      collection: 'ATLAS',
      material: 'Premium Cotton Blend',
      care: 'Dry clean only',
      durability: 'High'
    },
    'atlas-02': {
      id: 'atlas-02',
      name: 'ATLAS_02',
      image: '/lovable-uploads/66170bb8-81d2-4590-a978-083d8455d39d.png',
      description: 'Medium gray textured fabric',
      price: 1249,
      collection: 'ATLAS',
      material: 'Premium Cotton Blend',
      care: 'Dry clean only',
      durability: 'High'
    },
    'atlas-03': {
      id: 'atlas-03',
      name: 'ATLAS_03',
      image: '/lovable-uploads/ebe7df66-4052-4984-8240-527f31a430be.png',
      description: 'Warm brown textured fabric',
      price: 1249,
      collection: 'ATLAS',
      material: 'Premium Cotton Blend',
      care: 'Dry clean only',
      durability: 'High'
    },
    'atlas-04': {
      id: 'atlas-04',
      name: 'ATLAS_04',
      image: '/lovable-uploads/fd8a2775-7c91-4f02-a900-34f33cc2cb64.png',
      description: 'Deep navy textured fabric',
      price: 1249,
      collection: 'ATLAS',
      material: 'Premium Cotton Blend',
      care: 'Dry clean only',
      durability: 'High'
    },
    'atlas-05': {
      id: 'atlas-05',
      name: 'ATLAS_05',
      image: '/lovable-uploads/e5ffb784-6faf-4b11-922f-f696407e88d2.png',
      description: 'Olive green textured fabric',
      price: 1249,
      collection: 'ATLAS',
      material: 'Premium Cotton Blend',
      care: 'Dry clean only',
      durability: 'High'
    },
    'atlas-06': {
      id: 'atlas-06',
      name: 'ATLAS_06',
      image: '/lovable-uploads/3c5fb31c-6892-4f7a-80f5-28e3344d0f56.png',
      description: 'Charcoal black textured fabric',
      price: 1249,
      collection: 'ATLAS',
      material: 'Premium Cotton Blend',
      care: 'Dry clean only',
      durability: 'High'
    },
    // CAMBRIDGE Collection
    'cambridge-01': {
      id: 'cambridge-01',
      name: 'CAMBRIDGE_01',
      image: '/lovable-uploads/322bda1a-8777-4c8c-b030-024554171d3f.png',
      description: 'Dark charcoal leather',
      price: 1049,
      collection: 'CAMBRIDGE',
      material: 'Genuine Leather',
      care: 'Leather conditioner recommended',
      durability: 'Very High'
    },
    'cambridge-02': {
      id: 'cambridge-02',
      name: 'CAMBRIDGE_02',
      image: '/lovable-uploads/02ba3f98-8221-4f19-bd81-5704fa405325.png',
      description: 'Medium gray leather',
      price: 1049,
      collection: 'CAMBRIDGE',
      material: 'Genuine Leather',
      care: 'Leather conditioner recommended',
      durability: 'Very High'
    },
    'cambridge-03': {
      id: 'cambridge-03',
      name: 'CAMBRIDGE_03',
      image: '/lovable-uploads/b06b3d02-1303-4e6c-a10e-9bc9e6547542.png',
      description: 'Light cream leather',
      price: 1049,
      collection: 'CAMBRIDGE',
      material: 'Genuine Leather',
      care: 'Leather conditioner recommended',
      durability: 'Very High'
    },
    'cambridge-04': {
      id: 'cambridge-04',
      name: 'CAMBRIDGE_04',
      image: '/lovable-uploads/bb6e30a6-d0a1-46bc-b38f-eec4c4e9f04f.png',
      description: 'Warm brown leather',
      price: 1049,
      collection: 'CAMBRIDGE',
      material: 'Genuine Leather',
      care: 'Leather conditioner recommended',
      durability: 'Very High'
    },
    'cambridge-05': {
      id: 'cambridge-05',
      name: 'CAMBRIDGE_05',
      image: '/lovable-uploads/8e21e661-5faf-4962-8509-b4ad3c3be73d.png',
      description: 'Rich cognac leather',
      price: 1049,
      collection: 'CAMBRIDGE',
      material: 'Genuine Leather',
      care: 'Leather conditioner recommended',
      durability: 'Very High'
    },
    'cambridge-06': {
      id: 'cambridge-06',
      name: 'CAMBRIDGE_06',
      image: '/lovable-uploads/88ac47ec-60d8-47b3-9127-3cbe68b4d68a.png',
      description: 'Olive green leather',
      price: 1049,
      collection: 'CAMBRIDGE',
      material: 'Genuine Leather',
      care: 'Leather conditioner recommended',
      durability: 'Very High'
    },
    // HERITAGE Collection
    'heritage-02': {
      id: 'heritage-02',
      name: 'HERITAGE_02',
      image: '/lovable-uploads/f311120f-d25a-4666-ba06-f2f9bf86f67b.png',
      description: 'Classic damask pattern',
      price: 890,
      collection: 'HERITAGE',
      material: 'Jacquard Weave',
      care: 'Machine washable',
      durability: 'High'
    },
    'heritage-03': {
      id: 'heritage-03',
      name: 'HERITAGE_03',
      image: '/lovable-uploads/76d0506f-f517-4121-b348-faae74715160.png',
      description: 'Ornate floral damask',
      price: 890,
      collection: 'HERITAGE',
      material: 'Jacquard Weave',
      care: 'Machine washable',
      durability: 'High'
    },
    'heritage-05': {
      id: 'heritage-05',
      name: 'HERITAGE_05',
      image: '/lovable-uploads/48c58c34-3be1-4fbd-97cb-19a69fbbf81d.png',
      description: 'Diamond weave pattern',
      price: 890,
      collection: 'HERITAGE',
      material: 'Jacquard Weave',
      care: 'Machine washable',
      durability: 'High'
    },
    'heritage-06': {
      id: 'heritage-06',
      name: 'HERITAGE_06',
      image: '/lovable-uploads/f07e269e-859f-4e9a-a29a-4059731311e1.png',
      description: 'Traditional floral design',
      price: 890,
      collection: 'HERITAGE',
      material: 'Jacquard Weave',
      care: 'Machine washable',
      durability: 'High'
    },
    'heritage-08': {
      id: 'heritage-08',
      name: 'HERITAGE_08',
      image: '/lovable-uploads/e4c04ad2-aff9-48f3-bc86-3f91212bc120.png',
      description: 'Multi-color damask weave',
      price: 890,
      collection: 'HERITAGE',
      material: 'Jacquard Weave',
      care: 'Machine washable',
      durability: 'High'
    },
    // COSMO Collection
    'cosmo-01': {
      id: 'cosmo-01',
      name: 'COSMO_01',
      image: '/lovable-uploads/5c00a33b-677c-4faa-96e4-32e846559d63.png',
      description: 'Light beige linen texture',
      price: 750,
      collection: 'COSMO',
      material: 'Pure Linen',
      care: 'Machine washable',
      durability: 'Medium'
    },
    'cosmo-02': {
      id: 'cosmo-02',
      name: 'COSMO_02',
      image: '/lovable-uploads/d53d07c4-e151-42f0-a8ef-c95ebb411728.png',
      description: 'Gray linen texture',
      price: 750,
      collection: 'COSMO',
      material: 'Pure Linen',
      care: 'Machine washable',
      durability: 'Medium'
    },
    'cosmo-03': {
      id: 'cosmo-03',
      name: 'COSMO_03',
      image: '/lovable-uploads/8ffeb590-4f9d-47c8-aa67-6b51488b6df0.png',
      description: 'Brown linen texture',
      price: 750,
      collection: 'COSMO',
      material: 'Pure Linen',
      care: 'Machine washable',
      durability: 'Medium'
    },
    'cosmo-04': {
      id: 'cosmo-04',
      name: 'COSMO_04',
      image: '/lovable-uploads/2906462e-c97f-44d5-bf07-1d3bea8aad46.png',
      description: 'Dark brown linen texture',
      price: 750,
      collection: 'COSMO',
      material: 'Pure Linen',
      care: 'Machine washable',
      durability: 'Medium'
    },
    'cosmo-05': {
      id: 'cosmo-05',
      name: 'COSMO_05',
      image: '/lovable-uploads/0b3c4f06-d375-45e6-bf4b-30cfd28fb597.png',
      description: 'Charcoal linen texture',
      price: 750,
      collection: 'COSMO',
      material: 'Pure Linen',
      care: 'Machine washable',
      durability: 'Medium'
    },
    'cosmo-06': {
      id: 'cosmo-06',
      name: 'COSMO_06',
      image: '/lovable-uploads/887c8be9-0a31-4fc7-ba2b-22adfd38fad3.png',
      description: 'Golden linen texture',
      price: 779,
      collection: 'COSMO',
      material: 'Pure Linen',
      care: 'Machine washable',
      durability: 'Medium'
    }
  };

  const fabric = allFabrics[fabricId];

  if (!fabric) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Fabric Not Found</h1>
          <Link to="/shop" className="text-yellow-600 hover:text-yellow-700">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(`Hi! I'm interested in ${fabric.name} fabric. Can you help me with more details?`);
    window.open(`https://wa.me/917382178982?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header/>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/shop" className="hover:text-yellow-600 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Shop
          </Link>
          <span>/</span>
          <span>{fabric.collection}</span>
          <span>/</span>
          <span className="text-gray-900">{fabric.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="relative">
              <div 
                className="aspect-square overflow-hidden rounded-lg border cursor-crosshair relative"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
              >
                <img
                  src={fabric.image}
                  alt={fabric.name}
                  className={`w-full h-full object-cover transition-transform duration-200 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        }
                      : {}
                  }
                />
                {isZoomed && (
                  <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center mt-4 space-x-4">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                >
                  {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                  <span>{isZoomed ? 'Zoom Out' : 'Zoom In'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-yellow-600 text-sm uppercase tracking-wider mb-2">{fabric.collection} Collection</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4 font-serif">{fabric.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-2xl font-bold text-gray-900">₹{fabric.price.toLocaleString()}</span>
              </div>
              <p className="text-gray-600 text-lg">{fabric.description}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fabric Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Material:</span>
                  <span className="font-medium text-gray-900">{fabric.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Care Instructions:</span>
                  <span className="font-medium text-gray-900">{fabric.care}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Durability:</span>
                  <span className="font-medium text-gray-900">{fabric.durability}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Collection:</span>
                  <span className="font-medium text-gray-900">{fabric.collection}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-4">
                <button className="flex-1 bg-yellow-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-lg border transition-colors ${
                    isFavorite 
                      ? 'bg-yellow-600 text-white border-yellow-600' 
                      : 'border-gray-300 hover:border-yellow-600'
                  }`}
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              
              <button 
                onClick={openWhatsApp}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Get Quote on WhatsApp</span>
              </button>

              <Link 
                to="/book-demo"
                className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors text-center block"
              >
                Book Free Home Demo
              </Link>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Choose This Fabric?</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Premium quality materials</li>
                <li>• Expert craftsmanship</li>
                <li>• Color-fast and fade-resistant</li>
                <li>• Available for custom sizing</li>
                <li>• Professional installation included</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={openWhatsApp}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FabricDetail;
