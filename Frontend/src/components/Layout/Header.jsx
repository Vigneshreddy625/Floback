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
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  riva
                </span>
              </h1>
              <div className="text-xs text-gray-500 font-medium tracking-wider">
                LUXURY INTERIORS
              </div>
            </div>
          </div>

          {/* Navigation for Desktop */}
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

          {/* Right Icons */}
          <div className="flex items-center space-x-2">
            {/* Search Input (only in /search) */}
            {showSearch && (
              <input
                type="text"
                placeholder="Search products..."
                className="hidden sm:block px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 w-64 transition-all duration-300"
              />
            )}
            <button
              onClick={() => navigate("/wishlist")}
              className="relative p-2 rounded-lg hover:bg-yellow-500/10 transition"
            >
              <Heart className="w-6 h-6 text-gray-700 hover:text-yellow-500" />
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 rounded-lg hover:bg-yellow-500/10 transition"
            >
              <ShoppingBag className="w-6 h-6 text-gray-700 hover:text-yellow-500" />
              {Array.isArray(cart?.items) && cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] flex items-center justify-center font-bold bg-yellow-500 text-white rounded-full">
                  {cart.items.length}
                </span>
              )}
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  {/* <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={getUserAvatar()}
                              alt="User avatar"
                              onError={() => setAvatarError(true)}
                            />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar> */}
                  <UserIcon className="w-6 h-6 text-gray-700 hover:text-yellow-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm font-medium">
                  {user.fullName || user.username}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate("/account/profile")}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-yellow-500/20">
            <nav className="px-6 py-8 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-4 px-6 text-gray-700 hover:text-yellow-500 hover:bg-yellow-500/10 rounded-xl font-medium transition-all duration-300 transform hover:translate-x-2"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
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
