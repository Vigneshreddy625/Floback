import React, { useState } from 'react';
import { Heart, ZoomIn, Star, Shield, Truck, RotateCcw, MessageCircle, Share2, Minus, Plus } from 'lucide-react';
import Header from '../Layout/Header';
import { Lens } from '../ui/lens';

const FabricDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('slate');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [hovering, setHovering] = useState(false);

  const productImages = [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop&sat=-100',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop&hue=30'
  ];

  const colorOptions = [
    { name: 'Slate Blue', value: 'slate', color: 'bg-slate-500' },
    { name: 'Charcoal', value: 'charcoal', color: 'bg-gray-800' },
    { name: 'Cream', value: 'cream', color: 'bg-amber-100' },
    { name: 'Mustard', value: 'mustard', color: 'bg-yellow-600' },
    { name: 'Navy', value: 'navy', color: 'bg-blue-900' }
  ];

  const features = [
    { icon: Shield, text: 'Premium quality materials' },
    { icon: Truck, text: 'Professional installation included' },
    { icon: RotateCcw, text: '2-year warranty' },
    { text: 'Custom sizing available' },
    { text: 'Easy maintenance' },
    { text: 'Stain resistant fabric' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-sm md:text-base">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <div className="relative group bg-white rounded-2xl shadow">
              <Lens hovering={hovering} setHovering={setHovering}>
                <img
                  src={productImages[selectedImage]}
                  alt="18 Collection Sofa"
                  className="w-full h-[420px] object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />
              </Lens>
            </div>

            <div className="flex space-x-3 overflow-x-auto p-1">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-xl overflow-hidden transition-all duration-300 w-16 h-16 flex-shrink-0 ${
                    selectedImage === index
                      ? 'ring-2 ring-amber-500 ring-offset-1 scale-105'
                      : 'hover:scale-105 hover:shadow'
                  }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-amber-400 text-white px-2 py-1 rounded text-xs font-semibold">
                  SOFA UPHOLSTERY
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">18 Collection</h1>

              <div className="flex items-baseline space-x-2 mb-3">
                <span className="text-xl font-bold text-amber-600">₹2,999</span>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm">
                Premium quality home furnishing with customizable fabric options. Transform your living space with our luxurious upholstery collection.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Choose Color</h3>
              <div className="flex space-x-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-9 h-9 rounded-full ${color.color} transition-all duration-300 ${
                      selectedColor === color.value ? 'ring-2 ring-amber-500 scale-105' : 'hover:scale-105 shadow'
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">Qty:</span>
                <div className="flex items-center border rounded overflow-hidden text-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-1 font-medium min-w-[40px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div> */}

              <div className="grid grid-cols-12 gap-2">
                <button className="col-span-8 bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-xl">
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`col-span-2 border rounded-xl p-3 ${
                    isWishlisted ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-300 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 mx-auto ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button className="col-span-2 border border-gray-300 rounded-xl p-3 hover:bg-gray-100">
                  <Share2 className="w-5 h-5 mx-auto text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button className="bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 text-sm">
                  <MessageCircle className="w-4 h-4" />
                  <span>Quote on WhatsApp</span>
                </button>
                <button className="bg-gray-900 hover:bg-gray-800 text-white py-2.5 px-4 rounded-xl text-sm">
                  Book Home Demo
                </button>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur border border-gray-100 shadow-md rounded-xl p-4">
              <h3 className="text-base font-semibold mb-3 text-gray-800">Product Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm text-gray-700 hover:bg-white/50 p-2 rounded"
                  >
                    {feature.icon && <feature.icon className="w-4 h-4 text-amber-600" />}
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 text-xs">
              <div className="flex items-center space-x-1 bg-green-50 px-3 py-1.5 rounded-full">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-green-800">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-1 bg-blue-50 px-3 py-1.5 rounded-full">
                <Truck className="w-4 h-4 text-blue-600" />
                <span className="text-blue-800">Free Delivery</span>
              </div>
              <div className="flex items-center space-x-1 bg-purple-50 px-3 py-1.5 rounded-full">
                <RotateCcw className="w-4 h-4 text-purple-600" />
                <span className="text-purple-800">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FabricDetail;