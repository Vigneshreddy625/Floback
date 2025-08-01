import React from "react";
import { Heart, ShoppingBag, Search, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext/useAuth";

const ShopHeader = ({ searchTerm, setSearchTerm, cartCount }) => {
  const {logout} = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/home");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <header className="bg-white shadow-lg sticky top-0 z-40 border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Flo<span className="text-yellow-600">riva</span>
            </h1>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/home"
              className="text-gray-700 hover:text-yellow-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link to="/shop" className="text-yellow-600 font-medium">
              Shop
            </Link>
            <Link
              to="/collections"
              className="text-gray-700 hover:text-yellow-600 font-medium transition-colors"
            >
              Collections
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-yellow-600 font-medium transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/book-demo"
              className="text-gray-700 hover:text-yellow-600 font-medium transition-colors"
            >
              Book a Demo
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent w-64"
              />
            </div>
            <Link to={"/wishlist"}>
              <Heart className="w-6 h-6 text-gray-700 hover:text-yellow-600 cursor-pointer transition-colors" />
            </Link>
            <div className="relative">
              <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-yellow-600 cursor-pointer transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </div>
            <LogOut onClick={handleLogout}/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;
