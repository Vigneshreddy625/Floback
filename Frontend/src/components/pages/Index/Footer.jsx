import React from 'react'
import { ArrowRight, Facebook, Heart, Instagram, Mail, MapPin, MessageCircle, Phone, Sofa } from 'lucide-react'
function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/25">
                  <Sofa className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-3xl font-black">
                    <span className="text-black">Flo</span>
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">riva</span>
                  </h3>
                  <div className="text-xs text-gray-500 font-medium tracking-wider">LUXURY INTERIORS</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                Crafting extraordinary living spaces with premium furnishings, innovative designs, and unmatched quality.
              </p>
              <div className="flex space-x-4">
                {[
                  { Icon: Facebook, color: "hover:bg-blue-600" },
                  { Icon: Instagram, color: "hover:bg-pink-600" },
                  { Icon: MessageCircle, color: "hover:bg-green-600" }
                ].map(({ Icon, color }, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center ${color} transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl`}
                  >
                    <Icon className="w-5 h-5 text-black" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-black text-gray-600 mb-8 text-xl">Quick Links</h4>
              <ul className="space-y-4">
                {[
                  "Shop Collections",
                  "Premium Fabrics", 
                  "Custom Designs",
                  "About Floriva",
                  "Book Demo",
                  "Contact Us"
                ].map((link, index) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-yellow-400 transition-all duration-300 flex items-center group text-lg"
                    >
                      <ArrowRight className="w-4 h-4 mr-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      <span className="group-hover:translate-x-2 transition-transform duration-300">{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-black text-gray-600 mb-8 text-xl">Premium Services</h4>
              <ul className="space-y-4">
                {[
                  "Luxury Sofas",
                  "Designer Curtains", 
                  "Home Consultation",
                  "Bespoke Design",
                  "Professional Installation",
                  "Lifetime Support"
                ].map((service, index) => (
                  <li key={service}>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-orange-400 transition-colors text-lg hover:translate-x-1 transform duration-300 block"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black text-gray-800 mb-8 text-xl">Get in Touch</h4>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="text-gray-800 font-semibold">Call Us</div>
                    <div className="text-yellow-400 font-bold">+91 738 217 8982</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-gray-800 font-semibold">Email Us</div>
                    <div className="text-purple-400 font-bold">hello@floriva.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-gray-800 font-semibold">Visit Us</div>
                    <div className="text-green-400 font-bold">New Delhi, India</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-12">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              <div className="text-center lg:text-left">
                <p className="text-gray-400 text-lg">
                  © 2024 Floriva. All rights reserved.
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Crafted with <Heart className="inline w-4 h-4 text-red-500 mx-1" /> for extraordinary homes
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center lg:justify-end space-x-8">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 font-medium"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer