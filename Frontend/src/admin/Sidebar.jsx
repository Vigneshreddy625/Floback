import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
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
} from "lucide-react";

const Sidebar = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const location = useLocation(); // To get current path for active item

  const sidebarItems = [
    { icon: BarChart3, name: "Dashboard", path: "dashboard" },
    { icon: Package, name: "Orders", path: "orders" },
    { icon: ShoppingCart, name: "Products", path: "products" },
    // { icon: Users, name: "Customers", path: "customers" },
    // { icon: FileText, name: "Reports", path: "reports" },
    // { icon: TrendingUp, name: "Statistic", path: "statistic" },
    // { icon: Bell, name: "Notification", path: "notification" },
    // { icon: HelpCircle, name: "Help", path: "help" },
    // { icon: Settings, name: "Settings", path: "settings" },
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
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <BarChart3 size={20} className="text-slate-800" />
            </div>
            {!sidebarCollapsed && (
              <span className="font-semibold text-lg">ProfitPulse</span>
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
                    isActive
                      ? "bg-slate-700 border-r-2 border-blue-400"
                      : ""
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
          <button className={`w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-slate-700 transition-colors rounded ${sidebarCollapsed ? "justify-center" : ""}`}>
            <LogOut size={20} className='text-gray-200'/>
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