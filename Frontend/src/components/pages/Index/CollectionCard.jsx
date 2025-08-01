import { ArrowRight, Eye, Palette, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import React from 'react'

function CollectionCard({collections, getFirstWordLower}) {
    const navigate = useNavigate();
  return (
    <div className="py-8 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              <span>Premium Quality</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Fabric <span className="text-yellow-600">Collections</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our exquisite range of premium fabrics. From classic
              heritage patterns to contemporary designs, each collection offers
              unique textures and styles to transform your space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {collections.map((collection, index) => (
              <div
                key={collection.id}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={collection.thumbnailImageUrl}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={() =>
                        navigate(
                          `/fabric-collection/${getFirstWordLower(
                            collection.name
                          )}`, {state : {collection}}
                        )
                      }
                    >
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-center space-x-2 bg-white/90 backdrop-blur-sm text-gray-900 py-2 px-4 rounded-full text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <Eye className="w-4 h-4" />
                          <span>View Collection</span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4">
                      <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        {collection.fabricCount}+ Items
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-yellow-600 font-bold uppercase tracking-wider bg-yellow-50 px-2 py-1 rounded">
                        {collection.type}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {collection.description}
                    </p>
                    <div
                      className="flex items-center text-yellow-600 font-semibold group-hover:text-yellow-700"
                      onClick={() =>
                        navigate(
                          `/fabric-collection/${getFirstWordLower(
                            collection.name
                          )}`, {state : {collection}}
                        )
                      }
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              className="cursor-pointer group inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-10 py-4 rounded-full font-bold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
              onClick={() => navigate("/fabric-collections")}
            >
              <Palette className="w-5 h-5" />
              <span>View All Collections</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
  )
}

export default CollectionCard