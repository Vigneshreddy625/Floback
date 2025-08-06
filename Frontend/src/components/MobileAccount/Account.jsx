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
    <div className="w-full mx-auto font-sans bg-gradient-to-br from-white via-blue-50 to-purple-100 min-h-screen">
      <div className="flex items-center space-x-3 py-4 px-4 bg-white shadow-md border-b border-blue-100 sticky top-0 z-10">
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded-full hover:bg-blue-100 transition"
        >
          <ArrowLeft className="w-5 h-5 text-blue-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Account</h1>
      </div>

      <div className="px-4 py-6">
        <div className="bg-white rounded-2xl border border-blue-200 shadow-lg p-4 mb-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full border-2 border-blue-300 overflow-hidden shadow-sm">
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
                  className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-semibold text-base"
                  style={{ display: "none" }}
                >
                  {user.fullName?.[0] || "U"}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-base font-semibold text-gray-900">
                {user.fullName}
              </h2>
              <p className="text-sm text-gray-600">{userProfile.phone}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {quickActions.map((action, index) => (
            <div
              key={index}
              onClick={() => action.path && navigate(action.path)}
              className="bg-gradient-to-br from-blue-50 via-white to-purple-100 border border-blue-200 p-4 rounded-xl shadow-md hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
            >
              <action.icon className="w-5 h-5 text-blue-700" />
              <span className="text-sm font-medium text-gray-800">
                {action.title}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
          <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Account Settings
            </h3>
          </div>

          <div className="divide-y divide-gray-100">
            {menuItems.map((item, index) => (
              <div key={index}>
                <div
                  className="flex justify-between items-center p-4 hover:bg-blue-50 transition cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex space-x-3 items-start">
                    <item.icon className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-800">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500 text-white shadow">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {!item.dropdown || !openDropdowns[item.title] ? (
                        <span className="text-sm text-gray-500">
                          {item.description}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {item.dropdown ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown(item.title);
                      }}
                      className="ml-2 p-1 rounded-full hover:bg-gray-100 transition"
                    >
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                          openDropdowns[item.title] ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>

                {item.dropdown && openDropdowns[item.title] && (
                  <div className="w-full px-4 pb-4 pt-2 flex  gap-3 justify-around">
                    {item.dropdown.map((subItem, subIdx) => (
                      <div
                        key={subIdx}
                        className="flex flex-col items-center w-40 p-3 rounded-lg border border-blue-100 bg-white shadow hover:bg-blue-50 hover:shadow-md transition-all cursor-pointer"
                        onClick={() => navigate(subItem.path)}
                      >
                        <subItem.icon className="w-4 h-4 text-blue-500 mb-1" />
                        <span className="text-sm font-medium text-gray-800 text-center">
                          {subItem.title}
                        </span>
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
