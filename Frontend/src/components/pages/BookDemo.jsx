import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, MessageCircle, Sparkles, Heart, Star } from 'lucide-react';
import Header from '../Layout/Header';

const BookDemo = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    preferredDate: '',
    preferredTime: '',
    serviceType: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Demo booking submitted:', formData);
    // Handle form submission here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("👋 Hello! Can we help you with booking a demo?");
    window.open(`https://wa.me/917382178982?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <Header/>
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-20 left-40 w-40 h-40 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-20"></div>
      <div className="absolute bottom-40 right-10 w-20 h-20 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full opacity-20 animate-pulse"></div>

      <section className="relative bg-gradient-to-r from-white via-amber-50 to-amber-100 py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 to-pink-200/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-1/4 animate-float">
            <Sparkles className="w-8 h-8 text-yellow-300" />
          </div>
          <div className="absolute top-16 right-1/3 animate-bounce">
            <Heart className="w-6 h-6 text-pink-300" />
          </div>
          <div className="absolute bottom-20 left-1/3 animate-pulse">
            <Star className="w-10 h-10 text-cyan-300" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center text-black relative z-10">
          <h1 className="text-6xl font-bold mb-6 text-gray-700 font-serif bg-gradient-to-r from-white to-yellow-100 bg-clip-text drop-shadow-lg">
            Book a Free Demo ✨
          </h1>
          <p className="text-2xl font-medium text-gray-600 drop-shadow">
            Get personalized consultation and free home measurement
          </p>
          <div className="mt-8 flex justify-center">
            <div className="bg-white/40 backdrop-blur-sm rounded-full px-8 py-4 border border-white/30">
              <span className="text-lg font-semibold text-gray-500">🏠 Transform Your Space Today</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form Section */}
            <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 p-10 rounded-3xl shadow-2xl border border-purple-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full -translate-y-16 translate-x-16 opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full translate-y-12 -translate-x-12 opacity-30"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-8">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-full mr-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-serif">
                    Schedule Your Demo
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-purple-700 mb-3">
                        Full Name ✨
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-gradient-to-r from-white to-purple-50 hover:shadow-lg"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-purple-700 mb-3">
                        Phone Number 📱
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-gradient-to-r from-white to-purple-50 hover:shadow-lg"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-purple-700 mb-3">
                      Email Address 💌
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-gradient-to-r from-white to-purple-50 hover:shadow-lg"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-bold text-purple-700 mb-3">
                      Home Address 🏡
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-gradient-to-r from-white to-purple-50 hover:shadow-lg"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="preferredDate" className="block text-sm font-bold text-purple-700 mb-3">
                        Preferred Date 📅
                      </label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-gradient-to-r from-white to-purple-50 hover:shadow-lg"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="preferredTime" className="block text-sm font-bold text-purple-700 mb-3">
                        Preferred Time ⏰
                      </label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-gradient-to-r from-white to-purple-50 hover:shadow-lg"
                      >
                        <option value="">Select Time</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="4:00 PM">4:00 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-bold text-purple-700 mb-3">
                      Service Type 🎨
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-gradient-to-r from-white to-purple-50 hover:shadow-lg"
                    >
                      <option value="">Select Service</option>
                      <option value="curtains">Curtains & Blinds</option>
                      <option value="upholstery">Sofa Upholstery</option>
                      <option value="bedding">Bed & Bath</option>
                      <option value="wallpaper">Wallpaper</option>
                      <option value="complete">Complete Home Makeover</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-purple-700 mb-3">
                      Special Requirements 💭
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-gradient-to-r from-white to-purple-50 hover:shadow-lg resize-none"
                      placeholder="Any specific requirements or questions..."
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
                  >
                    ✨ Book Demo Now ✨
                  </button>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-8 rounded-3xl shadow-xl border border-cyan-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full -translate-y-20 translate-x-20 opacity-20"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-400 p-3 rounded-full mr-4">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent font-serif">
                      What to Expect
                    </h2>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="flex items-start space-x-6 p-4 rounded-2xl bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-4 rounded-2xl shadow-lg">
                        <Calendar className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-orange-700 mb-2">Free Consultation 🎯</h3>
                        <p className="text-orange-600 font-medium">Our expert will visit your home at your convenience</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-6 p-4 rounded-2xl bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-200">
                      <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-4 rounded-2xl shadow-lg">
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-purple-700 mb-2">Free Measurement 📏</h3>
                        <p className="text-purple-600 font-medium">Accurate measurements for perfect fitting</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-6 p-4 rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200">
                      <div className="bg-gradient-to-r from-green-400 to-emerald-400 p-4 rounded-2xl shadow-lg">
                        <Clock className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-emerald-700 mb-2">Design Consultation 🎨</h3>
                        <p className="text-emerald-600 font-medium">Personalized design recommendations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 p-8 rounded-3xl shadow-xl border border-emerald-200 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full translate-y-16 -translate-x-16 opacity-20"></div>
                
                <div className="relative z-10">
                  <h3 className="font-bold text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
                    Need Immediate Assistance? 🚀
                  </h3>
                  <div className="space-y-4">
                    <button
                      onClick={openWhatsApp}
                      className="flex items-center space-x-4 w-full p-4 bg-gradient-to-r from-green-400 to-emerald-400 text-white rounded-2xl hover:from-green-500 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <MessageCircle className="w-6 h-6" />
                      <span className="font-bold text-lg">WhatsApp: +91 73821 78982</span>
                    </button>
                    <button
                      onClick={() => window.open('tel:+917382178982')}
                      className="flex items-center space-x-4 w-full p-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-2xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <Phone className="w-6 h-6" />
                      <span className="font-bold text-lg">Call: +91 73821 78982</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <button
        onClick={openWhatsApp}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-green-400 to-emerald-400 text-white p-5 rounded-full shadow-2xl hover:from-green-500 hover:to-emerald-500 transition-all duration-300 z-50 transform hover:scale-110 hover:-translate-y-2 animate-bounce"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BookDemo;