import React, { useState } from "react";
import {
  Heart,
  ShoppingBag,
  Search,
  LogOut,
  Menu,
  X,
  Sofa,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext/useAuth";

const navItems = [
  { name: "Home", href: "/home" },
  { name: "Shop", href: "/shop" },
  { name: "Collections", href: "/collections" },
  { name: "Contact", href: "/contact" },
  { name: "Book Demo", href: "/book-demo" },
];

const ShopHeader = ({ searchTerm, setSearchTerm, cartCount }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/home");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/home")}>            
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/25 transition-all duration-300">
                <Sofa className="w-6 h-6 text-black" />
              </div>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                <span className="text-black">Flo</span>
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">riva</span>
              </h1>
              <p className="text-xs text-gray-500 font-medium tracking-wider">LUXURY INTERIORS</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-yellow-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Cart always visible */}
            <Link to="/cart" className="relative">
              <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-yellow-600 cursor-pointer transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg border border-yellow-400 hover:bg-yellow-400/10 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-yellow-500" />
              ) : (
                <Menu className="w-6 h-6 text-yellow-500" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 bg-white border-t border-yellow-400/30 shadow-lg rounded-xl overflow-hidden">
            <div className="px-6 py-4 space-y-3">
              {/* Search */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent w-full"
                />
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-gray-700 hover:text-yellow-600 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}

              {/* Wishlist + Logout */}
              <div className="flex justify-between pt-3 border-t border-gray-200">
                <Link to="/wishlist">
                  <Heart className="w-6 h-6 text-gray-700 hover:text-yellow-600" />
                </Link>
                <button onClick={handleLogout}>
                  <LogOut className="w-6 h-6 text-gray-700 hover:text-red-500" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default ShopHeader;