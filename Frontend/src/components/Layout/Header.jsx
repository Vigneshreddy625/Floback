import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-40 border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Flo<span className="text-yellow-600">riva</span>
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">Home</Link>
            <Link to="/shop" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">Shop</Link>
            <Link to="/collections" className="text-yellow-600 font-medium">Collections</Link>
            <Link to="/book-demo" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">Book a Demo</Link>
            <Link to="/contact" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors">Contact</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Slide-in Mobile Menu */}
      <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileMenuOpen(false)}>
        <div
          className={`absolute top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()} // prevent close on click inside menu
        >
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-2xl font-bold text-gray-900">Menu</h2>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <nav className="flex flex-col p-4 space-y-4">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium">Home</Link>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium">Shop</Link>
            <Link to="/collections" onClick={() => setMobileMenuOpen(false)} className="text-yellow-600 font-medium">Collections</Link>
            <Link to="/book-demo" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium">Book a Demo</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 font-medium">Contact</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
