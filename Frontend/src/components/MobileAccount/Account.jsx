import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext/useAuth";
import {
  ChevronRight,
  ShoppingBag,
  Headset,
  Tag,
  Star,
  User,
  MapPin,
  Edit,
  ChevronDown,
  Heart,
  Trash,
  FileQuestion,
  ArrowLeft,
} from "lucide-react";
import avatar from "../../assets/react.svg";

const Account = () => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const navigate = useNavigate();
  const { user } = useAuth();
  const basePath = "/account";

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...Object.fromEntries(Object.keys(prev).map((k) => [k, false])),
      [key]: !prev[key],
    }));
  };

  const userProfile = {
    name: "Vignesh Reddy",
    phone: "+123 456 7890",
    avatarSrc: avatar,
  };

  const quickActions = [
    {
      icon: ShoppingBag,
      title: "Orders",
      description: "Track and manage your recent purchases",
      path: "/orders",
      color: "from-blue-100 to-blue-200 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      icon: Heart,
      title: "Wishlist",
      description: "View and edit your saved items",
      path: "/wishlist",
      color: "from-pink-100 to-pink-200 border-pink-200",
      iconColor: "text-pink-600",
    },
    {
      icon: Headset,
      title: "Help Center",
      description: "Get support and assistance",
      path: "/help",
      color: "from-green-100 to-green-200 border-green-200",
      iconColor: "text-green-600",
    },
    {
      icon: Tag,
      title: "Coupons",
      description: "Explore available discounts",
      path: "/coupons",
      color: "from-orange-100 to-orange-200 border-orange-200",
      iconColor: "text-orange-600",
    },
  ];

  const menuItems = [
    {
      icon: Edit,
      title: "Manage Account",
      description: "Update and manage your account settings",
      dropdown: [
        {
          icon: User,
          title: "Account Details",
          description: "Edit personal information",
          path: "/account/details",
        },
        {
          icon: MapPin,
          title: "Addresses",
          description: "Manage shipping and billing addresses",
          path: "/account/addresses",
        },
      ],
    },
    {
      icon: Trash,
      title: "Delete Account",
      description: "Delete your account here",
      path: "/account/delete",
    },
    {
      icon: FileQuestion,
      title: "FAQs",
      description: "Find answers to common questions",
      path: "/faqs",
    },
  ];

  const handleItemClick = (item) => {
    if (item.dropdown) {
      toggleDropdown(item.title);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div className="w-full mx-auto font-sans bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6 pt-6 px-6 pb-4 bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
        >
          <ArrowLeft className="w-6 h-6 text-blue-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Account</h1>
      </div>

      <div className="px-6 pb-6">
        {/* Profile Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-blue-100/50 p-6 mb-6">
          <div className="flex space-x-4 items-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg overflow-hidden">
                <img
                  src={userProfile.avatarSrc}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg"
                  style={{ display: "none" }}
                >
                  {user.fullName?.[0] || "U"}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-3 border-white"></div>
            </div>
            <div className="flex flex-col space-y-1">
              <h2 className="text-lg font-bold text-gray-800">
                {user.fullName}
              </h2>
              <p className="text-blue-600 text-sm font-medium">
                {userProfile.phone}
              </p>
              <div className="flex items-center space-x-1 mt-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-xs text-gray-600">Premium Member</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${action.color} p-4 rounded-2xl cursor-pointer transform hover:scale-105 transition-all duration-200 shadow-sm border`}
              onClick={() => action.path && navigate(action.path)}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-3 bg-white/70 rounded-full">
                  <action.icon className={`${action.iconColor} w-6 h-6`} />
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {action.title}
                </span>
              </div>
              <ChevronRight className="text-gray-500 w-4 h-4 ml-auto mt-2" />
            </div>
          ))}
        </div>

        {/* Menu Items */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-blue-100/50 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100/50">
            <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">
              Account Settings
            </h3>
          </div>

          <div className="divide-y divide-blue-50">
            {menuItems.map((item, index) => (
              <div key={index}>
                <div
                  className="flex justify-between items-center p-4 hover:bg-blue-25 transition-colors duration-200 cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex space-x-4">
                    <div className="p-2 rounded-full">
                      <item.icon className="text-gray-700 w-5 h-5" />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-800">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-xs px-2 py-1 rounded-full text-white bg-gradient-to-r from-pink-400 to-pink-500">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {!(item.dropdown && openDropdowns[item.title]) && (
                        <span className="text-sm text-gray-600">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </div>
                  {item.dropdown ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(item.title);
                      }}
                      className="ml-2 p-1 rounded-full hover:bg-blue-50 transition-colors"
                    >
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                          openDropdowns[item.title] ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                {item.dropdown && openDropdowns[item.title] && (
                  <div className="pl-12 pr-4 pb-2 pt-1 space-y-2">
                    {item.dropdown.map((subItem, subIdx) => (
                      <div
                        key={subIdx}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                        onClick={() => navigate(subItem.path)}
                      >
                        <subItem.icon className="w-4 h-4 text-blue-500" />
                        <div>
                          <span className="font-medium text-gray-700">
                            {subItem.title}
                          </span>
                          <span className="block text-xs text-gray-500">
                            {subItem.description}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;