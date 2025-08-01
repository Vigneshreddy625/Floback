import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, ArrowRight } from 'lucide-react';
import Header from '../Layout/Header';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const message = encodeURIComponent("👋 Hello! Can we help you?");
      window.open(`https://wa.me/917382178982?text=${message}`, '_blank');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("👋 Hello! Can we help you?");
    window.open(`https://wa.me/917382178982?text=${message}`, '_blank');
  };

  const makeCall = () => {
    window.open('tel:+917382178982', '_blank');
  };

  const sendEmail = () => {
    window.open('mailto:info@floriva.com', '_blank');
  };

  const openChat = () => {
    openWhatsApp();
  };

  return (
    <div className="min-h-screen bg-white">
      <Header/>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase">
              Get In Touch
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight">
            Let's Create Something
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Beautiful Together
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform your space with our expert home decor consultation. We're here to bring your vision to life.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-2xl shadow-blue-100/50 p-10 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -translate-y-20 translate-x-20 opacity-50"></div>
                
                <div className="relative">
                  <h2 className="text-4xl font-bold text-gray-900 mb-3">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-3">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50 focus:bg-white group-hover:border-gray-300"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      
                      <div className="group">
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-3">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50 focus:bg-white group-hover:border-gray-300"
                          placeholder="+91 12345 67890"
                        />
                      </div>
                    </div>
                    
                    <div className="group">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50 focus:bg-white group-hover:border-gray-300"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    
                    <div className="group">
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-3">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50 focus:bg-white resize-none group-hover:border-gray-300"
                        placeholder="Tell us about your project, requirements, or any questions you have..."
                        required
                      />
                    </div>
                    
                    <button
                      onClick={handleSubmit}
                      className={`w-full py-4 px-8 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 ${
                        isSubmitted 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {isSubmitted ? (
                        <>
                          <span>Message Sent!</span>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info & Actions */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Contact</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={openChat}
                    className="group bg-white border-2 border-blue-200 text-blue-600 py-4 px-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <MessageCircle className="w-6 h-6 mx-auto mb-2 group-hover:animate-bounce" />
                    <span className="text-sm font-semibold">Chat</span>
                  </button>
                  
                  <button
                    onClick={makeCall}
                    className="group bg-white border-2 border-green-200 text-green-600 py-4 px-4 rounded-2xl hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Phone className="w-6 h-6 mx-auto mb-2 group-hover:animate-bounce" />
                    <span className="text-sm font-semibold">Call</span>
                  </button>
                  
                  <button
                    onClick={sendEmail}
                    className="group bg-white border-2 border-purple-200 text-purple-600 py-4 px-4 rounded-2xl hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <Mail className="w-6 h-6 mx-auto mb-2 group-hover:animate-bounce" />
                    <span className="text-sm font-semibold">Email</span>
                  </button>
                  
                  <button
                    onClick={openWhatsApp}
                    className="group bg-white border-2 border-green-200 text-green-500 py-4 px-4 rounded-2xl hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <MessageCircle className="w-6 h-6 mx-auto mb-2 group-hover:animate-bounce" />
                    <span className="text-sm font-semibold">WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-3xl shadow-2xl shadow-purple-100/50 p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 group">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                      <p className="text-gray-600 leading-relaxed">
                        123 Home Decor Street<br />
                        Design City, DC 12345
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="bg-gradient-to-br from-green-500 to-blue-500 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                      <p className="text-gray-600">+91 73821 78982</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <p className="text-gray-600">info@floriva.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 group">
                    <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Monday - Friday: 10 AM - 8 PM<br />
                        Saturday: 10 AM - 6 PM<br />
                        Sunday: 11 AM - 5 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h3>
                <div className="space-y-4">
                  {[
                    { icon: "🏠", text: "Free Home Measurement" },
                    { icon: "🎨", text: "Custom Design Consultation" },
                    { icon: "🔧", text: "Professional Installation" },
                    { icon: "💬", text: "Customer Care Support" }
                  ].map((service, index) => (
                    <div key={index} className="flex items-center space-x-3 group">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </span>
                      <span className="text-gray-700 font-medium">{service.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <button
        onClick={openWhatsApp}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-green-400 to-green-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-50 animate-pulse"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;