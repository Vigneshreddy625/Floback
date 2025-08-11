import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Sofa,
  Calendar
} from "lucide-react";
import { useAuth } from "../authContext/useAuth";

const Sidebar = ({ sidebarCollapsed, setSidebarCollapsed }) => {
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

  const sidebarItems = [
    { icon: BarChart3, name: "Dashboard", path: "dashboard" },
    { icon: Package, name: "Orders", path: "orders" },
    { icon: ShoppingCart, name: "Products", path: "products" },
    { icon: Users, name: "Fabrics", path: "fabrics" },
    { icon: Users, name: "Collections", path: "collections" },
    { icon: Calendar, name: "Bookings", path: "bookings" },
  ];

  return (
    <div className="relative">
      <div
        className={`${
          sidebarCollapsed ? "w-16" : "w-52"
        } bg-black text-white transition-all duration-300 ease-in-out flex flex-col h-full`}
      >
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
              <img src="/floriva-logo.ico" alt="" srcset="" className="w-12 h-12"/>
            {!sidebarCollapsed && (
              <span className="font-semibold text-lg">Floriva</span>
            )}
          </div>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-700 transition-colors ${
                    isActive ? "bg-slate-700 border-r-2 border-blue-400" : ""
                  } ${sidebarCollapsed ? "justify-center" : ""}`
                }
              >
                <Icon size={20} />
                {!sidebarCollapsed && (
                  <span className="text-sm">{item.name}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-700 p-2">
          <button
            className={`w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-slate-700 transition-colors rounded ${
              sidebarCollapsed ? "justify-center" : ""
            }`}
            onClick={handleLogout}
          >
            <LogOut size={20} className="text-gray-200" />
            {!sidebarCollapsed && <span className="text-sm">Log out</span>}
          </button>
        </div>
      </div>

      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="z-50 absolute top-12 -right-3 bg-white border border-gray-200 rounded-full p-1 shadow-lg hover:shadow-xl transition-shadow focus:outline-none"
      >
        {sidebarCollapsed ? (
          <ChevronRight size={16} className="text-gray-600" />
        ) : (
          <ChevronLeft size={16} className="text-gray-600" />
        )}
      </button>
    </div>
  );
};

export default Sidebar;
