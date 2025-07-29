import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sofa,
  Palette,
  Calendar,
  ArrowRight,
  Eye,
  Star,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FlolivaHomepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const slides = [
    `/lovable-uploads/0de282a3-5f04-450f-aec3-62e7359bb7ef.png`,
    "/lovable-uploads/a297de86-b21b-4fc9-be74-c732fe68c836.png",
    "/lovable-uploads/9f0542bd-abb5-4d33-a82d-0354e4abb45d.png",
  ];

  const fabricCollections = [
    {
      id: "atlas",
      name: "ATLAS Collection",
      image: "/lovable-uploads/322bda1a-8777-4c8c-b030-024554171d3f.png",
      description: "Premium atlas fabric collection with elegant patterns",
      category: "Premium",
      itemCount: 25,
    },
    {
      id: "cambridge",
      name: "CAMBRIDGE Collection",
      image: "/lovable-uploads/577a6125-dda3-40e1-877e-d2cf5a4899cd.png",
      description: "Sophisticated cambridge fabric designs",
      category: "Premium",
      itemCount: 30,
    },
    {
      id: "heritage",
      name: "HERITAGE Collection",
      image: "/lovable-uploads/96c1f624-a448-4416-8dc3-e58ab478b66a.png",
      description: "Traditional heritage and rich fabric patterns",
      category: "Classic",
      itemCount: 20,
    },
    {
      id: "cosmo",
      name: "COSMO Collection",
      image: "/lovable-uploads/942e2b2f-2538-47e8-b492-802a8e84e2f4.png",
      description: "Modern cosmo fabric and wide collection",
      category: "Contemporary",
      itemCount: 35,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "" },
    { name: "Shop", href: "shop" },
    { name: "Collections", href: "collections" },
    { name: "Fabrics", href: "fabric-collections" },
    { name: "Contact", href: "contact" },
    { name: "Book Demo", href: "book-demo" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-xl"
            : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <Sofa className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold">
                <span className="text-gray-900">Flo</span>
                <span className="text-yellow-600">riva</span>
              </h1>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-200 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t shadow-xl">
              <nav className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block py-3 px-4 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg font-medium transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center justify-center px-4 lg:px-16">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transform <span className="text-yellow-400">Your Space</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl mb-8 text-gray-200 leading-relaxed">
              Premium sofas, curtains, and home furnishings crafted with
              excellence and style
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="cursor-pointer group bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-full font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-xl" onClick={() => navigate("/shop")}>
                Shop Now
                <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="cursor-pointer bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105" onClick={() => navigate("/book-demo")}>
                Book Free Demo
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-yellow-400 scale-125"
                  : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fabricCollections.map((collection, index) => (
              <div
                key={collection.id}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={() =>
                        navigate(`/fabric-collection/${collection.id}`)
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
                        {collection.itemCount}+ Items
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-yellow-600 font-bold uppercase tracking-wider bg-yellow-50 px-2 py-1 rounded">
                        {collection.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      {collection.description}
                    </p>
                    <div className="flex items-center text-yellow-600 font-semibold group-hover:text-yellow-700" onClick={() =>
                        navigate(`/fabric-collection/${collection.id}`)
                      }>
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
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-yellow-600">Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience luxury and comfort with our premium offerings and
              exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sofa,
                title: "Premium Sofas",
                description:
                  "Handcrafted sofas with premium fabrics and customizable designs tailored to your space and style",
                color: "from-blue-500 to-blue-600",
                link: "/sofa-collections",
              },
              {
                icon: Palette,
                title: "Designer Curtains",
                description:
                  "Custom curtains and blinds to complement your interior design and enhance natural lighting",
                color: "from-purple-500 to-purple-600",
                link: "/shop",
              },
              {
                icon: Calendar,
                title: "Free Home Demo",
                description:
                  "Book a free consultation and see our products in your space before making a decision",
                color: "from-green-500 to-green-600",
                link: "/book-demo",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`bg-gradient-to-r ${service.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-center text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-center text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <button
                  className="cursor-pointer mx-auto text-yellow-600 hover:text-yellow-700 font-semibold flex items-center group"
                  onClick={() => navigate(service.link)}
                >
                  Explore Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white leading-tight">
            Ready to Transform{" "}
            <span className="text-yellow-400">Your Home?</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Get expert advice and premium quality products delivered to your
            doorstep with our exceptional service
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              className="cursor-pointer group bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-4 rounded-full font-bold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
              onClick={() => navigate("/book-demo")}
            >
              <Calendar className="inline-block mr-3 w-5 h-5" />
              Book Free Consultation
              <ArrowRight className="inline-block ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              className="cursor-pointer group bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
              onClick={() =>
                window.open("https://wa.me/917382178982", "_blank")
              }
            >
              <MessageCircle className="inline-block mr-3 w-5 h-5" />
              WhatsApp Us
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Sofa className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">
                  <span className="text-white">Flo</span>
                  <span className="text-yellow-400">riva</span>
                </h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Premium home furnishings crafted with excellence and delivered
                with care. Transform your space with our luxury collections.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Instagram, MessageCircle].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-600 transition-colors duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  "Shop",
                  "Collections",
                  "Fabrics",
                  "About Us",
                  "Book Demo",
                  "Contact",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Services</h4>
              <ul className="space-y-3">
                {[
                  "Premium Sofas",
                  "Designer Curtains",
                  "Home Consultation",
                  "Custom Design",
                  "Installation",
                  "After Sales",
                ].map((service) => (
                  <li key={service}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-lg">
                Contact Info
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-400">+91 738 217 8982</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-400">info@floriva.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-400">New Delhi, India</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 Floriva. All rights reserved. Crafted with ❤️ in India
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
                >
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FlolivaHomepage;
