import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, MessageCircle, CheckCircle, Star, Home, Sparkles } from 'lucide-react';
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
    // TODO: Submit data to backend
    alert('Thank you! Your demo has been booked. We will contact you soon.');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hello! I'd like to book a demo for home interior design.");
    window.open(`https://wa.me/917382178982?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <Header/>

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

      <section className="py-8 sm:py-16 px-4" id="booking-form">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-200/50 shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Schedule Your Visit</h2>
                <p className="text-slate-600">Fill out the form below and we'll contact you within 24 hours</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Home Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Complete address with pincode"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Time</label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select Time Slot</option>
                      <option value="10:00 AM">10:00 AM - 12:00 PM</option>
                      <option value="12:00 PM">12:00 PM - 2:00 PM</option>
                      <option value="2:00 PM">2:00 PM - 4:00 PM</option>
                      <option value="4:00 PM">4:00 PM - 6:00 PM</option>
                      <option value="6:00 PM">6:00 PM - 8:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Service Interest</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">What are you looking for?</option>
                    <option value="curtains">Curtains & Window Treatments</option>
                    <option value="upholstery">Sofa & Furniture Upholstery</option>
                    <option value="bedding">Bedroom & Bath Essentials</option>
                    <option value="wallpaper">Wallpaper & Wall Coverings</option>
                    <option value="complete">Complete Home Makeover</option>
                    <option value="consultation">Design Consultation Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Details</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell us about your style preferences, budget range, or any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Your Free Demo</span>
                </button>
              </form>
            </div>

            <div className="space-y-6">
              {/* What to Expect */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-200/50 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 text-emerald-500 mr-3" />
                  What to Expect
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                    <Calendar className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Free Consultation</h4>
                      <p className="text-slate-600 text-sm">Complimentary in-home visit at your preferred time</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                    <MapPin className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Professional Measurement</h4>
                      <p className="text-slate-600 text-sm">Precise space assessment by certified experts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl">
                    <Clock className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">Custom Recommendations</h4>
                      <p className="text-slate-600 text-sm">Personalized design solutions for your lifestyle</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Options */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-200/50 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Need Immediate Help?</h3>
                <div className="space-y-4">
                  <button
                    onClick={openWhatsApp}
                    className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp: +91 73821 78982</span>
                  </button>
                  <button
                    onClick={() => window.open('tel:+917382178982')}
                    className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-2xl font-semibold border-2 border-slate-300 hover:border-indigo-400 hover:shadow-lg transition-all duration-300"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call: +91 73821 78982</span>
                  </button>
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                  <p className="text-sm text-amber-800 text-center">
                    <strong>Available:</strong> Mon-Sat, 9:00 AM - 7:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookDemo;