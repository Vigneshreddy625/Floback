import {
  Menu,
  Sofa,
  X,
  ShoppingBag,
  Heart,
  Search,
  User,
  LogOut,
  UserIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../authContext/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCart } from "../../redux/Cart/cartSlice";

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
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, user, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchUserCart());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const showSearch = location.pathname === "/shop";

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="relative">
                <img src="./florivalogo.png" alt="Floriva Logo" className="w-14 h-14"/>
            </div>

            <div onClick={() => navigate("/home")}>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                <span className="text-black">Flo</span>
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  riva
                </span>
              </h1>
              <div className="text-[10px] sm:text-xs text-gray-500 font-medium tracking-wider">
                LUXURY INTERIORS
              </div>
            </div>
          </div>
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
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

          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* {showSearch && (
              <input
                type="text"
                placeholder="Search..."
                className="hidden sm:block px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 w-40 sm:w-64 text-sm"
              />
            )} */}

            <button
              onClick={() => navigate("/wishlist")}
              className="p-2 rounded-lg hover:bg-yellow-500/10 transition"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 hover:text-yellow-500" />
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 rounded-lg hover:bg-yellow-500/10 transition"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 hover:text-yellow-500" />
              {Array.isArray(cart?.items) && cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] flex items-center justify-center font-bold bg-yellow-500 text-white rounded-full">
                  {cart.items.length}
                </span>
              )}
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 hover:text-yellow-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm font-medium">
                  {user.fullName || user.username}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate("/account")}
                >
                  <User className="h-4 w-4 mr-2" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-500 hover:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              className="lg:hidden p-2 rounded-xl hover:bg-yellow-500/10 transition-all duration-300 border border-yellow-500/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-yellow-400" />
              ) : (
                <Menu className="w-6 h-6 text-yellow-400" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-yellow-500/20 z-30">
            <nav className="px-4 py-6 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-3 px-4 text-gray-700 hover:text-yellow-500 hover:bg-yellow-500/10 rounded-lg font-medium text-sm transition-all duration-300 transform hover:translate-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              {showSearch && (
                <div className="pt-4">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                  />
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
