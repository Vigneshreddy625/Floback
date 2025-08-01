import { Menu, Sofa, X } from 'lucide-react';
import React from 'react';

function Header({ isScrolled, navItems, setIsMenuOpen, isMenuOpen }) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-yellow-400/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Sofa className="w-7 h-7 text-black" />
              </div>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                <span className={`${isScrolled ? "text-black" : "text-white"}`}>Flo</span>
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">riva</span>
              </h1>
              <div className={`text-[0.65rem] font-semibold tracking-wider ${isScrolled ? "text-gray-800" : "text-yellow-300"}`}>
                LUXURY INTERIORS
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 ${isScrolled ? "text-gray-700 hover:text-yellow-800" : "text-gray-200 hover:text-yellow-400"} font-medium transition-all duration-300 rounded-lg hover:bg-yellow-400/10 group`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.name}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/0 to-orange-500/0 group-hover:from-yellow-400/10 group-hover:to-orange-500/10 transition-all duration-300"></div>
              </a>
            ))}
          </nav>

          <button
            className="lg:hidden p-3 rounded-xl hover:bg-yellow-500/10 border border-yellow-400/30 transition duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-yellow-400" />
            ) : (
              <Menu className="w-6 h-6 text-yellow-400" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-transparent border-b backdrop-blur-xl border-t border-yellow-500/10">
            <nav className="px-6 py-8 space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-4 px-6 text-gray-200 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-xl font-medium transition duration-300 transform hover:translate-x-2"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;