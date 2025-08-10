import { Calendar, MessageCircle, Sparkles } from 'lucide-react';
import React from 'react'

const HeroSection = () => {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Hello! I'd like to book a demo for home interior design.");
    window.open(`https://wa.me/917382178982?text=${message}`, '_blank');
  };

  return (
    <section className="py-12 md:pt-24 md:pb-16 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Free Home Consultation Available
          </div>
          <h1 className="text-3xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
            Transform Your
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block">
              Dream Home
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience personalized interior design with our expert consultation. 
            Get precise measurements and tailored solutions that bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Free Demo</span>
            </button>
            <button
              onClick={openWhatsApp}
              className="bg-white text-slate-700 px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Quick Chat</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection