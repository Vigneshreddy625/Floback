import React, { useState, useEffect, useCallback } from "react";
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
  Sparkles,
  Award,
  Users,
  Zap,
  Shield,
  Heart,
  Play,
  ChevronDown,
  Book,
} from "lucide-react";
import Footer from "./Index/Footer";
import Services from "./Index/Services";
import IndexContact from "./Index/IndexContact";
import CollectionCard from "./Index/CollectionCard";
import Header from "./Index/Header";
import { useNavigate } from "react-router-dom";
import { getFirstWordLower } from "../../hooks/getFirstWordLetter";
import useCollections from "../../hooks/useCollection";
import { useAuth } from "../../authContext/useAuth";

const FlolivaHomepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { user } = useAuth();

  console.log(user);

  const navigate = useNavigate();

  const { collections } = useCollections();

  const slides = [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1920&h=1080&fit=crop",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const navItems = [
    { name: "Home", href: "home" },
    { name: "Shop", href: "shop" },
    { name: "Collections", href: "collections" },
    { name: "Fabrics", href: "fabric-collections" },
    { name: "Contact", href: "contact" },
    { name: "Book Demo", href: "book-demo" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div
        className="fixed w-6 h-6 pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          background:
            "radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(8px)",
        }}
      />

      <Header
        navItems={navItems}
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-110"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/80"></div>
            <img
              src={slide}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto mt-6 sm:mt-0">
          <div className="space-y-4 md:space-y-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
              <span className="block text-white mb-2">Transform</span>
              <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
                Your Space
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
              Where luxury meets functionality. Discover our curated collection
              of
              <span className="text-yellow-400 font-semibold">
                {" "}
                premium sofas
              </span>
              ,
              <span className="text-orange-400 font-semibold">
                {" "}
                designer curtains
              </span>
              , and
              <span className="text-pink-400 font-semibold">
                {" "}
                bespoke furnishings
              </span>
              .
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 pt-6 sm:pt-8">
              <button
                className="group relative px-5 py-3 sm:px-10 sm:py-5 text-sm sm:text-base bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-yellow-500/25 hover:shadow-yellow-500/50"
                onClick={() => navigate("/shop")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <span className="relative flex items-center justify-center space-x-2 sm:space-x-3">
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>

              <button
                className="group px-5 py-3 sm:px-10 sm:py-5 text-sm sm:text-base bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate("/book-demo")}
              >
                <span className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <Book className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Book Free Demo</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative w-12 h-1 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            >
              {index === currentSlide && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="py-4 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-3 lg:gap-8">
            {[
              {
                icon: Award,
                number: "500+",
                label: "Premium Designs",
                color: "from-yellow-400 to-orange-500",
              },
              {
                icon: Shield,
                number: "1 Year",
                label: "Warranty",
                color: "from-green-400 to-green-600",
              },
              {
                icon: Zap,
                number: "24/7",
                label: "Support",
                color: "from-purple-400 to-purple-600",
              },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`w-10 h-10 md:w-16 md:h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}
                >
                  <stat.icon className="w-4 h-4 md:w-8 md:h-8 text-white" />
                </div>
                <div
                  className={`text-lg md:text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                >
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium text-sm md:text-kg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CollectionCard
        collections={collections}
        getFirstWordLower={getFirstWordLower}
      />

      <Services />

      <IndexContact />

      <Footer />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FlolivaHomepage;
