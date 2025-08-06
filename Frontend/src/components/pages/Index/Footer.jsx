import React from "react";
import {
  ArrowRight,
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sofa,
} from "lucide-react";
function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 text-sm sm:text-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-md">
                <Sofa className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black">
                  <span className="text-black">Flo</span>
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    riva
                  </span>
                </h3>
                <div className="text-xs sm:text-sm text-gray-500 font-medium tracking-wider">
                  LUXURY INTERIORS
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
              Crafting extraordinary living spaces with premium furnishings,
              innovative designs, and unmatched quality.
            </p>
            <div className="flex space-x-3">
              {[
                { Icon: Facebook, color: "hover:bg-blue-600" },
                { Icon: Instagram, color: "hover:bg-pink-600" },
                { Icon: MessageCircle, color: "hover:bg-green-600" },
              ].map(({ Icon, color }, i) => (
                <a
                  key={i}
                  href="#"
                  className={`w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-xl flex items-center justify-center ${color} transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-gray-700 mb-6 sm:mb-8 text-lg sm:text-xl">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                "Shop Collections",
                "Premium Fabrics",
                "Custom Designs",
                "About Floriva",
                "Book Demo",
                "Contact Us",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-yellow-400 transition-all duration-300 flex items-center group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-black text-gray-700 mb-6 sm:mb-8 text-lg sm:text-xl">
              Premium Services
            </h4>
            <ul className="space-y-3">
              {[
                "Luxury Sofas",
                "Designer Curtains",
                "Home Consultation",
                "Bespoke Design",
                "Professional Installation",
                "Lifetime Support",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-orange-400 transition-colors duration-300 block hover:translate-x-1"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black text-gray-800 mb-6 sm:mb-8 text-lg sm:text-xl">
              Get in Touch
            </h4>
            <div className="space-y-5">
              {[
                {
                  icon: Phone,
                  label: "Call Us",
                  value: "+91 738 217 8982",
                  color: "from-yellow-400 to-orange-500",
                  textColor: "text-yellow-400",
                },
                {
                  icon: Mail,
                  label: "Email Us",
                  value: "hello@floriva.com",
                  color: "from-purple-500 to-pink-500",
                  textColor: "text-purple-400",
                },
                {
                  icon: MapPin,
                  label: "Visit Us",
                  value: "New Delhi, India",
                  color: "from-green-500 to-teal-500",
                  textColor: "text-green-400",
                },
              ].map(({ icon: Icon, label, value, color, textColor }, i) => (
                <div key={i} className="flex items-center space-x-3 group">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-gray-800 font-semibold text-sm sm:text-base">
                      {label}
                    </div>
                    <div
                      className={`${textColor} font-bold text-sm sm:text-base`}
                    >
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 mt-10 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 text-center sm:text-left">
            <div>
              <p className="text-gray-400 text-sm">
                © 2024 Floriva. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Crafted with{" "}
                <Heart className="inline w-4 h-4 text-red-500 mx-1" /> for
                extraordinary homes
              </p>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 font-medium"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
