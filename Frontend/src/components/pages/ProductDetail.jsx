import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingBag, MessageCircle, Check } from 'lucide-react';
import Header from '../Layout/Header';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedFabric, setSelectedFabric] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const productType = id?.includes('sofa') ? 'sofa' : 
                     id?.includes('curtain') ? 'curtain' : 
                     id?.includes('bathrobe') ? 'bathrobe' : 'sofa';
  const productId = id?.split('-').pop();


  const fabricOptions = {
    'sofa': {
      'atlas': [
        {
          id: 'atlas-01',
          name: 'ATLAS_01',
          image: '/lovable-uploads/577a6125-dda3-40e1-877e-d2cf5a4899cd.png',
          description: 'Light beige textured fabric',
          price: 1249
        },
        {
          id: 'atlas-02',
          name: 'ATLAS_02',
          image: '/lovable-uploads/66170bb8-81d2-4590-a978-083d8455d39d.png',
          description: 'Medium gray textured fabric',
          price: 1249
        },
        {
          id: 'atlas-03',
          name: 'ATLAS_03',
          image: '/lovable-uploads/ebe7df66-4052-4984-8240-527f31a430be.png',
          description: 'Warm brown textured fabric',
          price: 1249
        },
        {
          id: 'atlas-04',
          name: 'ATLAS_04',
          image: '/lovable-uploads/fd8a2775-7c91-4f02-a900-34f33cc2cb64.png',
          description: 'Deep navy textured fabric',
          price: 1249
        },
        {
          id: 'atlas-05',
          name: 'ATLAS_05',
          image: '/lovable-uploads/e5ffb784-6faf-4b11-922f-f696407e88d2.png',
          description: 'Olive green textured fabric',
          price: 1249
        },
        {
          id: 'atlas-06',
          name: 'ATLAS_06',
          image: '/lovable-uploads/3c5fb31c-6892-4f7a-80f5-28e3344d0f56.png',
          description: 'Charcoal black textured fabric',
          price: 1249
        }
      ],
      'cambridge': [
        {
          id: 'cambridge-01',
          name: 'CAMBRIDGE_01',
          image: '/lovable-uploads/322bda1a-8777-4c8c-b030-024554171d3f.png',
          description: 'Dark charcoal leather',
          price: 1049
        },
        {
          id: 'cambridge-02',
          name: 'CAMBRIDGE_02',
          image: '/lovable-uploads/02ba3f98-8221-4f19-bd81-5704fa405325.png',
          description: 'Medium gray leather',
          price: 1049
        },
        {
          id: 'cambridge-03',
          name: 'CAMBRIDGE_03',
          image: '/lovable-uploads/b06b3d02-1303-4e6c-a10e-9bc9e6547542.png',
          description: 'Light cream leather',
          price: 1049
        },
        {
          id: 'cambridge-04',
          name: 'CAMBRIDGE_04',
          image: '/lovable-uploads/bb6e30a6-d0a1-46bc-b38f-eec4c4e9f04f.png',
          description: 'Warm brown leather',
          price: 1049
        },
        {
          id: 'cambridge-05',
          name: 'CAMBRIDGE_05',
          image: '/lovable-uploads/8e21e661-5faf-4962-8509-b4ad3c3be73d.png',
          description: 'Rich cognac leather',
          price: 1049
        },
        {
          id: 'cambridge-06',
          name: 'CAMBRIDGE_06',
          image: '/lovable-uploads/88ac47ec-60d8-47b3-9127-3cbe68b4d68a.png',
          description: 'Olive green leather',
          price: 1049
        }
      ],
      'heritage': [
        {
          id: 'heritage-02',
          name: 'HERITAGE_02',
          image: '/lovable-uploads/f311120f-d25a-4666-ba06-f2f9bf86f67b.png',
          description: 'Classic damask pattern',
          price: 890
        },
        {
          id: 'heritage-03',
          name: 'HERITAGE_03',
          image: '/lovable-uploads/76d0506f-f517-4121-b348-faae74715160.png',
          description: 'Ornate floral damask',
          price: 890
        },
        {
          id: 'heritage-05',
          name: 'HERITAGE_05',
          image: '/lovable-uploads/48c58c34-3be1-4fbd-97cb-19a69fbbf81d.png',
          description: 'Diamond weave pattern',
          price: 890
        },
        {
          id: 'heritage-06',
          name: 'HERITAGE_06',
          image: '/lovable-uploads/f07e269e-859f-4e9a-a29a-4059731311e1.png',
          description: 'Traditional floral design',
          price: 890
        },
        {
          id: 'heritage-08',
          name: 'HERITAGE_08',
          image: '/lovable-uploads/e4c04ad2-aff9-48f3-bc86-3f91212bc120.png',
          description: 'Multi-color damask weave',
          price: 890
        }
      ],
      'cosmo': [
        {
          id: 'cosmo-01',
          name: 'COSMO_01',
          image: '/lovable-uploads/5c00a33b-677c-4faa-96e4-32e846559d63.png',
          description: 'Light beige linen texture',
          price: 750
        },
        {
          id: 'cosmo-02',
          name: 'COSMO_02',
          image: '/lovable-uploads/d53d07c4-e151-42f0-a8ef-c95ebb411728.png',
          description: 'Gray linen texture',
          price: 750
        },
        {
          id: 'cosmo-03',
          name: 'COSMO_03',
          image: '/lovable-uploads/8ffeb590-4f9d-47c8-aa67-6b51488b6df0.png',
          description: 'Brown linen texture',
          price: 750
        },
        {
          id: 'cosmo-04',
          name: 'COSMO_04',
          image: '/lovable-uploads/2906462e-c97f-44d5-bf07-1d3bea8aad46.png',
          description: 'Dark brown linen texture',
          price: 750
        },
        {
          id: 'cosmo-05',
          name: 'COSMO_05',
          image: '/lovable-uploads/0b3c4f06-d375-45e6-bf4b-30cfd28fb597.png',
          description: 'Charcoal linen texture',
          price: 750
        },
        {
          id: 'cosmo-06',
          name: 'COSMO_06',
          image: '/lovable-uploads/887c8be9-0a31-4fc7-ba2b-22adfd38fad3.png',
          description: 'Golden linen texture',
          price: 779
        }
      ]
    },
    'curtain': [
      {
        id: 'sarom-fabric-1',
        name: 'Sarom Classic',
        image: '/lovable-uploads/3b26185f-d97f-4279-9118-3b495cada172.png',
        description: 'Elegant white curtain fabric',
        price: 899
      },
      {
        id: 'sarom-fabric-2',
        name: 'Sarom Premium',
        image: '/lovable-uploads/f84e136d-9091-439a-83b4-aeb25d188448.png',
        description: 'Luxurious green textured fabric',
        price: 1299
      }
    ],
    'bathrobe': [
      {
        id: 'bathrobe-classic',
        name: 'Premium Waffle',
        image: '/lovable-uploads/8bc726dc-364c-418c-a5b5-b01cad86db16.png',
        description: 'Luxurious waffle texture bathrobe',
        price: 1999
      }
    ]
  };

  const product = {
    id: parseInt(productId || '1'),
    name: productType === 'sofa' ? `${productId?.toUpperCase()} Collection` : 
          productType === 'curtain' ? 'Designer Curtains' : 
          'Premium Bathrobes',
    category: productType === 'sofa' ? 'Sofa Upholstery' : 
              productType === 'curtain' ? 'Curtains' : 
              'Bathrobes',
    description: 'Premium quality home furnishing with customizable fabric options',
    mainImage: productType === 'sofa' ? '/lovable-uploads/398fa471-0d5d-4025-af2c-d359608273a4.png' : 
               productType === 'curtain' ? '/lovable-uploads/3b26185f-d97f-4279-9118-3b495cada172.png' :
               '/lovable-uploads/8bc726dc-364c-418c-a5b5-b01cad86db16.png'
  };

  const getCurrentFabrics = ()=> {
    if (productType === 'sofa' && productId) {
      const sofaFabrics = fabricOptions.sofa[productId];
      return sofaFabrics || [];
    }
    return fabricOptions[productType] || [];
  };

  const currentFabrics = getCurrentFabrics();
  const selectedFabricData = currentFabrics.find(f => f.id === selectedFabric);

  React.useEffect(() => {
    if (currentFabrics.length > 0) {
      setSelectedFabric(currentFabrics[0].id);
    }
  }, [productType, productId]);

  const openWhatsApp = () => {
    const message = encodeURIComponent(`Hi! I'm interested in ${product.name} with ${selectedFabricData?.name} fabric. Can you help me with more details?`);
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
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <img
                src={selectedFabricData?.image || product.mainImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-yellow-600 text-sm uppercase tracking-wider mb-2">{product.category}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4 font-serif">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{selectedFabricData?.price?.toLocaleString() || '2,999'}
                </span>
              </div>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {currentFabrics.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Fabric</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {currentFabrics.map((fabric) => (
                    <div key={fabric.id} className="relative">
                      <button
                        onClick={() => setSelectedFabric(fabric.id)}
                        className={`relative border-2 rounded-lg overflow-hidden transition-colors w-full ${
                          selectedFabric === fabric.id
                            ? 'border-yellow-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={fabric.image}
                          alt={fabric.name}
                          className="w-full h-24 object-cover"
                        />
                        {selectedFabric === fabric.id && (
                          <div className="absolute top-2 right-2 bg-yellow-600 text-white rounded-full p-1">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                        <div className="p-2 text-center">
                          <p className="text-xs font-medium text-gray-900">{fabric.name}</p>
                          <p className="text-xs text-yellow-600 font-bold">₹{fabric.price}</p>
                        </div>
                      </button>
                      
                      <Link 
                        to={`/fabric/${fabric.id}`}
                        className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center rounded-lg"
                      >
                        <span className="text-white text-xs font-medium opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-75 px-2 py-1 rounded">
                          View Details
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
                
                {selectedFabricData && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1">{selectedFabricData.name}</h4>
                    <p className="text-sm text-gray-600">{selectedFabricData.description}</p>
                    <p className="text-sm font-bold text-yellow-600 mt-1">₹{selectedFabricData.price}</p>
                    <Link 
                      to={`/fabric/${selectedFabricData.id}`}
                      className="inline-block mt-2 text-xs text-yellow-600 hover:text-yellow-700 font-medium"
                    >
                      View Detailed Specifications →
                    </Link>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex space-x-4">
                <button className="flex-1 bg-yellow-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-yellow-700 transition-colors">
                  Add to Cart
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

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Premium quality materials</li>
                <li>• Professional installation included</li>
                <li>• 2-year warranty</li>
                <li>• Custom sizing available</li>
                <li>• Easy maintenance</li>
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

export default ProductDetail;
