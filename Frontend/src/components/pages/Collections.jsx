
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../Layout/Header';

const Collections = () => {
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
      image: "/lovable-uploads/942e2b2f-2538-47e8-b492-802a8e84e2f4.png",
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
      {/* Header */}
      <Header/>

      {/* Collections Banner */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-4 font-serif">Our Collections</h1>
          <p className="text-xl">Complete range of home decor solutions for every need</p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-12">
            {collections.map((collection) => (
              <div key={collection.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="h-80 lg:h-auto">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 font-serif">{collection.name}</h3>
                    <p className="text-gray-600 mb-6 text-lg">{collection.description}</p>
                    
                    {collection.subcategories.map((subcategory, index) => (
                      <div key={index} className="mb-6">
                        <h4 className="text-lg font-semibold text-yellow-600 mb-3">{subcategory.title}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {subcategory.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                              <span className="text-gray-700 text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <Link to="/shop" className="bg-yellow-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors inline-flex items-center">
                      Shop Collection
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Ready to Transform Your Space?</h2>
          <p className="text-gray-600 text-lg mb-8">Get personalized consultation from our home decor experts</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-demo" className="bg-yellow-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors">
              Book a Demo
            </Link>
            <Link to="/contact" className="bg-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;
