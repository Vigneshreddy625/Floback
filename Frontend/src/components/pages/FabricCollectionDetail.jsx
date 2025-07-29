
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye, Heart, MessageCircle } from 'lucide-react';
import Header from '../Layout/Header';

const FabricCollectionDetail = () => {
  const { collectionId } = useParams();

  // Fabric data organized by collection
  const fabricCollections = {
    atlas: {
      name: 'ATLAS Collection',
      description: 'Premium Cotton Blend fabrics with rich textures and high durability',
      category: 'Textured Cotton',
      fabrics: [
        {
          id: 'atlas-01',
          name: 'ATLAS_01',
          image: '/lovable-uploads/577a6125-dda3-40e1-877e-d2cf5a4899cd.png',
          description: 'Light beige textured fabric',
          price: 1249,
          color: 'Beige'
        },
        {
          id: 'atlas-02',
          name: 'ATLAS_02',
          image: '/lovable-uploads/66170bb8-81d2-4590-a978-083d8455d39d.png',
          description: 'Medium gray textured fabric',
          price: 1249,
          color: 'Gray'
        },
        {
          id: 'atlas-03',
          name: 'ATLAS_03',
          image: '/lovable-uploads/ebe7df66-4052-4984-8240-527f31a430be.png',
          description: 'Warm brown textured fabric',
          price: 1249,
          color: 'Brown'
        },
        {
          id: 'atlas-04',
          name: 'ATLAS_04',
          image: '/lovable-uploads/fd8a2775-7c91-4f02-a900-34f33cc2cb64.png',
          description: 'Deep navy textured fabric',
          price: 1249,
          color: 'Navy'
        },
        {
          id: 'atlas-05',
          name: 'ATLAS_05',
          image: '/lovable-uploads/e5ffb784-6faf-4b11-922f-f696407e88d2.png',
          description: 'Olive green textured fabric',
          price: 1249,
          color: 'Olive'
        },
        {
          id: 'atlas-06',
          name: 'ATLAS_06',
          image: '/lovable-uploads/3c5fb31c-6892-4f7a-80f5-28e3344d0f56.png',
          description: 'Charcoal black textured fabric',
          price: 1249,
          color: 'Charcoal'
        }
      ]
    },
    cambridge: {
      name: 'CAMBRIDGE Collection',
      description: 'Genuine Leather collection with premium quality and very high durability',
      category: 'Premium Leather',
      fabrics: [
        {
          id: 'cambridge-01',
          name: 'CAMBRIDGE_01',
          image: '/lovable-uploads/322bda1a-8777-4c8c-b030-024554171d3f.png',
          description: 'Dark charcoal leather',
          price: 1049,
          color: 'Charcoal'
        },
        {
          id: 'cambridge-02',
          name: 'CAMBRIDGE_02',
          image: '/lovable-uploads/02ba3f98-8221-4f19-bd81-5704fa405325.png',
          description: 'Medium gray leather',
          price: 1049,
          color: 'Gray'
        },
        {
          id: 'cambridge-03',
          name: 'CAMBRIDGE_03',
          image: '/lovable-uploads/b06b3d02-1303-4e6c-a10e-9bc9e6547542.png',
          description: 'Light cream leather',
          price: 1049,
          color: 'Cream'
        },
        {
          id: 'cambridge-04',
          name: 'CAMBRIDGE_04',
          image: '/lovable-uploads/bb6e30a6-d0a1-46bc-b38f-eec4c4e9f04f.png',
          description: 'Warm brown leather',
          price: 1049,
          color: 'Brown'
        },
        {
          id: 'cambridge-05',
          name: 'CAMBRIDGE_05',
          image: '/lovable-uploads/8e21e661-5faf-4962-8509-b4ad3c3be73d.png',
          description: 'Rich cognac leather',
          price: 1049,
          color: 'Cognac'
        },
        {
          id: 'cambridge-06',
          name: 'CAMBRIDGE_06',
          image: '/lovable-uploads/88ac47ec-60d8-47b3-9127-3cbe68b4d68a.png',
          description: 'Olive green leather',
          price: 1049,
          color: 'Olive'
        }
      ]
    },
    heritage: {
      name: 'HERITAGE Collection',
      description: 'Traditional Jacquard Weave patterns with classic designs',
      category: 'Jacquard Weave',
      fabrics: [
        {
          id: 'heritage-02',
          name: 'HERITAGE_02',
          image: '/lovable-uploads/f311120f-d25a-4666-ba06-f2f9bf86f67b.png',
          description: 'Classic damask pattern',
          price: 890,
          color: 'Multi'
        },
        {
          id: 'heritage-03',
          name: 'HERITAGE_03',
          image: '/lovable-uploads/76d0506f-f517-4121-b348-faae74715160.png',
          description: 'Ornate floral damask',
          price: 890,
          color: 'Multi'
        },
        {
          id: 'heritage-05',
          name: 'HERITAGE_05',
          image: '/lovable-uploads/48c58c34-3be1-4fbd-97cb-19a69fbbf81d.png',
          description: 'Diamond weave pattern',
          price: 890,
          color: 'Multi'
        },
        {
          id: 'heritage-06',
          name: 'HERITAGE_06',
          image: '/lovable-uploads/f07e269e-859f-4e9a-a29a-4059731311e1.png',
          description: 'Traditional floral design',
          price: 890,
          color: 'Multi'
        },
        {
          id: 'heritage-08',
          name: 'HERITAGE_08',
          image: '/lovable-uploads/e4c04ad2-aff9-48f3-bc86-3f91212bc120.png',
          description: 'Multi-color damask weave',
          price: 890,
          color: 'Multi'
        }
      ]
    },
    cosmo: {
      name: 'COSMO Collection',
      description: 'Pure Linen fabrics with natural textures and breathable quality',
      category: 'Pure Linen',
      fabrics: [
        {
          id: 'cosmo-01',
          name: 'COSMO_01',
          image: '/lovable-uploads/5c00a33b-677c-4faa-96e4-32e846559d63.png',
          description: 'Light beige linen texture',
          price: 750,
          color: 'Beige'
        },
        {
          id: 'cosmo-02',
          name: 'COSMO_02',
          image: '/lovable-uploads/d53d07c4-e151-42f0-a8ef-c95ebb411728.png',
          description: 'Gray linen texture',
          price: 750,
          color: 'Gray'
        },
        {
          id: 'cosmo-03',
          name: 'COSMO_03',
          image: '/lovable-uploads/8ffeb590-4f9d-47c8-aa67-6b51488b6df0.png',
          description: 'Brown linen texture',
          price: 750,
          color: 'Brown'
        },
        {
          id: 'cosmo-04',
          name: 'COSMO_04',
          image: '/lovable-uploads/2906462e-c97f-44d5-bf07-1d3bea8aad46.png',
          description: 'Dark brown linen texture',
          price: 750,
          color: 'Dark Brown'
        },
        {
          id: 'cosmo-05',
          name: 'COSMO_05',
          image: '/lovable-uploads/0b3c4f06-d375-45e6-bf4b-30cfd28fb597.png',
          description: 'Charcoal linen texture',
          price: 750,
          color: 'Charcoal'
        },
        {
          id: 'cosmo-06',
          name: 'COSMO_06',
          image: '/lovable-uploads/887c8be9-0a31-4fc7-ba2b-22adfd38fad3.png',
          description: 'Golden linen texture',
          price: 779,
          color: 'Golden'
        }
      ]
    }
  };

  const collection = fabricCollections[collectionId];

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Collection Not Found</h1>
          <Link to="/fabric-collections" className="text-yellow-600 hover:text-yellow-700">
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  const openWhatsApp = (fabricName) => {
    const message = encodeURIComponent(`Hi! I'm interested in ${fabricName} from ${collection.name}. Can you help me with more details?`);
    window.open(`https://wa.me/917382178982?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header/>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/fabric-collections" className="hover:text-yellow-600 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Collections
          </Link>
          <span>/</span>
          <span className="text-gray-900">{collection.name}</span>
        </div>
      </div>

      {/* Collection Header */}
      <section className="bg-gradient-to-r from-yellow-50 to-yellow-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-yellow-600 text-sm uppercase tracking-wider font-medium">{collection.category}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
            {collection.name}
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            {collection.description}
          </p>
          <div className="flex items-center justify-center text-sm text-gray-600">
            <span>{collection.fabrics.length} Fabric Options Available</span>
          </div>
        </div>
      </section>

      {/* Fabrics Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collection.fabrics.map((fabric) => (
              <div key={fabric.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={fabric.image}
                    alt={fabric.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Link
                      to={`/fabric/${fabric.id}`}
                      className="bg-white text-gray-900 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-yellow-600 font-medium">{fabric.color}</span>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">{fabric.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{fabric.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">₹{fabric.price.toLocaleString()}</span>
                    <button
                      onClick={() => openWhatsApp(fabric.name)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1 text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Enquire</span>
                    </button>
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
          <h2 className="text-3xl font-bold mb-6 font-serif">Ready to Transform Your Space?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Book a free home consultation to see these fabrics in your space with our expert guidance.
          </p>
          <Link
            to="/book-demo"
            className="bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition-colors font-medium inline-block"
          >
            Book Free Home Demo
          </Link>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <button
        onClick={() => openWhatsApp(collection.name)}
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FabricCollectionDetail;
