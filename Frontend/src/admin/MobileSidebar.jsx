// src/components/MobileSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
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
} from "lucide-react";

const mobileNavItems = [
  { icon: BarChart3, name: "Dashboard", path: "dashboard" },
  { icon: Package, name: "Orders", path: "orders" },
  { icon: ShoppingCart, name: "Products", path: "products" },
//   { icon: Users, name: "Customers", path: "customers" },
//   { icon: FileText, name: "Reports", path: "reports" },
//   { icon: TrendingUp, name: "Statistic", path: "statistic" },
//   { icon: Bell, name: "Notification", path: "notification" },
//   { icon: HelpCircle, name: "Help", path: "help" },
//   { icon: Settings, name: "Settings", path: "settings" },
];

const MobileSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${
          isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <BarChart3 size={20} className="text-slate-800" />
            </div>
            <span className="font-semibold text-lg">ProfitPulse</span>
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
          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700 transition-colors text-sm rounded">
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;