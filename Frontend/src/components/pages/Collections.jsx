import React from 'react';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import Header from '../Layout/Header';
import { useNavigate } from 'react-router-dom';

const Collections = () => {
  const navigate = useNavigate();
  const collections = [
    {
      id: 1,
      name: "Ready-Made Curtains",
      description: "Complete range of heading styles, materials, and functional curtains",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      subcategories: [
        {
          title: "Heading Styles (6 types)",
          items: ["Eyelet (Grommet) Curtains", "Pinch Pleat Curtains", "Pencil Pleat Curtains", "Rod Pocket Curtains", "Tab Top Curtains", "Wave Curtains"]
        },
        {
          title: "Materials (5 types)", 
          items: ["Cotton Curtains", "Linen Curtains", "Velvet Curtains", "Silk Curtains", "Sheer Curtains (Voile, Net)"]
        },
        {
          title: "Functions (4 types)",
          items: ["Blackout Curtains", "Thermal Insulated Curtains", "Soundproof Curtains", "Day/Night Curtains (Layered)"]
        }
      ]
    },
    {
      id: 2,
      name: "Bed & Bath",
      description: "Premium bed linen and bath essentials for your comfort",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      subcategories: [
        {
          title: "Bed Linen (7 types)",
          items: ["Flat Sheets", "Fitted Sheets", "Duvet Covers", "Comforters/Quilts", "Blankets/Throws", "Pillowcases & Cushions", "Mattress Protectors/Topper"]
        },
        {
          title: "Bath Linen (5 types)",
          items: ["Bath Towels", "Hand Towels", "Face Towels", "Bath Mats", "Bathrobes"]
        }
      ]
    },
    {
      id: 3,
      name: "Sofa Upholstery",
      description: "Transform your furniture with premium upholstery options",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      subcategories: [
        {
          title: "Fabric Types (8 types)",
          items: ["Cotton Upholstery", "Linen", "Velvet", "Chenille", "Leatherette (Faux Leather)", "Suede", "Polyester/Blends", "Jacquard Fabric"]
        },
        {
          title: "Functionality (4 types)",
          items: ["Removable/Zip Covers", "Stain-Resistant Fabric", "Water-Resistant/Waterproof", "Fire Retardant Fabric"]
        }
      ]
    },
    {
      id: 4,
      name: "Curtains & Blinds",
      description: "Modern window treatments for light control and privacy",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      subcategories: [
        {
          title: "Blinds Types (8 types)",
          items: ["Roller Blinds", "Roman Blinds", "Vertical Blinds", "Venetian Blinds (Aluminum/Wood)", "Honeycomb (Cellular) Blinds", "Zebra (Day/Night) Blinds", "Panel Track Blinds", "Motorized Smart Blinds"]
        }
      ]
    },
    {
      id: 5,
      name: "Wallpaper",
      description: "Transform your walls with premium wallpaper collections",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      subcategories: [
        {
          title: "Material Types (7 types)",
          items: ["Vinyl Wallpaper", "Non-Woven Wallpaper", "Paper Wallpaper", "Fabric-Backed Wallpaper", "Foil Wallpaper", "Textile Wallpaper", "Grasscloth/Natural Fibers"]
        },
        {
          title: "Design/Finish (6 types)",
          items: ["3D Wallpapers", "Textured Wallpapers", "Metallic Finish", "Matte Finish", "Custom/Mural Wallpapers", "Peel & Stick Wallpapers"]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header/>
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-yellow-200/30 to-amber-200/30 rounded-full blur-xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-200/50 mb-8">
            <Star className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-700">Premium Collections</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Our Exquisite
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
              Collections
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover premium home decor solutions crafted with precision and designed to transform your living spaces into works of art
          </p>
        </div>
      </section>

      <section className="pt-20 md:py-20 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-8 md:space-y-20">
            {collections.map((collection, index) => (
              <div key={collection.id} className="group">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-700">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-orange-600/20 z-10"></div>
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-6 right-6 z-20">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-sm font-semibold text-amber-600">Premium</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`space-y-4 md:space-y-8 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div>
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-full mb-4">
                        <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-amber-700">Collection {collection.id}</span>
                      </div>
                      
                      <h3 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                        {collection.name}
                      </h3>
                      <p className="text-md md:text-xl text-gray-600 leading-relaxed">
                        {collection.description}
                      </p>
                    </div>
                    
                    <div className="space-y-3 md:space-y-6">
                      {collection.subcategories.map((subcategory, subIndex) => (
                        <div key={subIndex} className="bg-gradient-to-r from-gray-50 to-amber-50/30 rounded-2xl p-3 md:p-6 border border-gray-100/50">
                          <h4 className="text-lg font-bold text-amber-600 mb-4 flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-white text-sm font-bold">{subcategory.items.length}</span>
                            </div>
                            {subcategory.title}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {subcategory.items.map((item, itemIndex) => (
                              <div key={itemIndex} className="flex items-center space-x-3 group/item hover:bg-white/60 rounded-lg p-2 transition-colors">
                                <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full group-hover/item:scale-125 transition-transform"></div>
                                <span className="text-gray-700 font-medium text-sm group-hover/item:text-gray-900 transition-colors">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4">
                      <button className="group bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center" onClick={() => navigate("/shop")}>
                        <span>Explore Collection</span>
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-24 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-amber-50/30 to-orange-50/30"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-yellow-200/20 to-amber-200/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-200/50 mb-8">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-700">Ready to Begin?</span>
          </div>
          
          <h2 className="text-3xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Transform Your Space
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
              Into Something Magical
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
            Get personalized consultation from our expert designers and bring your dream home to life with our premium collections
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group bg-gradient-to-r from-amber-500 to-orange-500 text-white px-10 py-4 rounded-2xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center justify-center" onClick={() => navigate("/book-demo")}>
              <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              <span>Book Your Demo</span>
            </button>
            <button className="group bg-white text-gray-700 px-10 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 hover:border-gray-300 inline-flex items-center justify-center" onClick={() => navigate("/contact")}>
              <span>Contact Our Experts</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;