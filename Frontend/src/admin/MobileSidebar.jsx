// src/components/MobileSidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Package,
  CreditCard,
  Users,
  FileText,
  TrendingUp,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  X,
  ShoppingCart,
  Sofa,
  Calendar,
} from "lucide-react";
import { useAuth } from "../authContext/useAuth";

const mobileNavItems = [
  { icon: BarChart3, name: "Dashboard", path: "dashboard" },
  { icon: Package, name: "Orders", path: "orders" },
  { icon: ShoppingCart, name: "Products", path: "products" },
  { icon: Users, name: "Fabrics", path: "fabrics" },
  { icon: Users, name: "Collections", path: "collections" },
  { icon: Calendar, name: "Bookings", path: "bookings" },
];

const MobileSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const navigate = useNavigate();
  const { logout, user, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/adminlogin123");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-md bg-opacity-40 z-40 transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <img src="/floriva-logo.ico" alt="" srcset="" className="w-12 h-12"/>
            <span className="font-semibold text-lg">Floriva</span>
          </div>
          <button onClick={() => setIsMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {mobileNavItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-5 py-3 text-sm font-medium hover:bg-slate-700 transition-colors ${
                    isActive ? "bg-slate-700 border-l-4 border-blue-400" : ""
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-700 p-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors text-sm rounded" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;