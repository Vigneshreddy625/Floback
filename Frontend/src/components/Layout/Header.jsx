import { Menu, Sofa, X } from 'lucide-react';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const navItems = [
    { name: "Home", href: "/home" },
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "Fabrics", href: "/fabric-collections" },
    { name: "Contact", href: "/contact" },
    { name: "Book Demo", href: "/book-demo" },
  ];

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/25 group-hover:shadow-yellow-500/50 transition-all duration-300 group-hover:scale-110">
                <Sofa className="w-7 h-7 text-black" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
            </div>
            <div onClick={() => navigate("/home")}>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tight">
                <span className="text-black">Flo</span>
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">riva</span>
              </h1>
              <div className="text-xs text-gray-500 font-medium tracking-wider">LUXURY INTERIORS</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-gray-700 hover:text-yellow-500 font-medium transition-all duration-300 rounded-lg hover:bg-yellow-500/10 group"
              >
                {item.name}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/0 to-orange-500/0 group-hover:from-yellow-400/10 group-hover:to-orange-500/10 transition-all duration-300" />
              </a>
            ))}
          </nav>

          <button
            className="lg:hidden p-3 rounded-xl hover:bg-yellow-500/10 transition-all duration-300 border border-yellow-500/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-yellow-400" />
            ) : (
              <Menu className="w-6 h-6 text-yellow-400" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-yellow-500/20">
            <nav className="px-6 py-8 space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-4 px-6 text-gray-700 hover:text-yellow-500 hover:bg-yellow-500/10 rounded-xl font-medium transition-all duration-300 transform hover:translate-x-2"
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
  );
}

export default Header;