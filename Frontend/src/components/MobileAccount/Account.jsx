import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "../../authContext/useAuth";
import {
  ChevronRight,
  ShoppingBag,
  Headset,
  Tag,
  Star,
  Banknote,
  CreditCard,
  User,
  MapPin,
  Edit,
  ChevronDown,
  Heart,
  Settings,
  FileQuestion,
  ArrowLeft,
  Bell,
} from "lucide-react";
import avatar from "../../assets/MVR.jpg"

const Account = () => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const navigate = useNavigate();
  const {user} = useAuth();
  const basePath = "/account";

  // const handleNavigation = (path) => {
  //   navigate(`${basePath}${path}`);
  // };

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
    },
    {
      icon: Heart,
      title: "Wishlist",
      description: "View and edit your saved items",
      path: "/wishlist",
    },
    {
      icon: Headset,
      title: "Help Center",
      description: "Get support and assistance",
      path: "/help",
    },
    {
      icon: Tag,
      title: "Coupons",
      description: "Explore available discounts",
      path: "/coupons",
    },
  ];

  const menuItems = [
    {
      icon: Star,
      title: "Ultimate Glam Clan",
      badge: "NEW",
      description: "Join our exclusive loyalty program for special rewards",
      path: "/glam-clan",
    },
    {
      icon: Banknote,
      title: "Personal Loan",
      badge: "New",
      description: "Quick and easy personal loan options",
      path: "/personal-loan",
    },
    {
      icon: CreditCard,
      title: "Payments & Currencies",
      description: "Manage payment methods and currency preferences",
      path: "/payments",
    },
    {
      icon: Tag,
      title: "Earn & Redeem",
      description: "View your rewards and redemption options",
      path: "/rewards",
    },
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
      icon: Bell,
      title: "Notification Settings",
      description: "Customize your notification preferences",
      path: "/notifications",
    },
    {
      icon: Settings,
      title: "Privacy Settings",
      description: "Control your data and privacy preferences",
      path: "/privacy",
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
    <div className="w-full max-w-md mx-auto font-sans">
      <div className='flex items-center space-x-3 mb-2 pt-4 px-6 pb-2 border-b'>
            <ArrowLeft className='w-6 h-6' onClick={() => window.history.back()} />
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Account</h1>
          </div>
      <div className="px-4 pb-2">
        <div className="flex space-x-4 items-center mb-6">
          <Avatar className="w-16 h-16 rounded-full border">
            <AvatarImage src={userProfile.avatarSrc} alt="User Avatar" />
            <AvatarFallback>{userProfile.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <h2 className="text-lg font-semibold">{user.fullName}</h2>
            <p className="text-gray-500 text-sm">{userProfile.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 border rounded-md cursor-pointer"
              onClick={() => action.path && navigate(action.path)}
            >
              <div className="flex items-center space-x-3">
                <action.icon className="text-gray-600 w-5 h-5" />
                <span className="text-sm">{action.title}</span>
              </div>
              <ChevronRight className="text-gray-400 w-5 h-5" />
            </div>
          ))}
        </div>

        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <div key={index} className="border-b dark:border-gray-700 last:border-b-0">
              <div
                className="flex justify-between items-center py-2 transition-all duration-200 cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex space-x-3">
                  <item.icon className="text-gray-600 w-5 h-5" />
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{item.title}</span>
                      {item.badge && (
                        <span className="text-xs px-2 py-0.5 rounded-full text-white bg-pink-500">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {!(item.dropdown && openDropdowns[item.title]) && (
                      <span className="text-sm text-gray-500">
                        {item.description}
                      </span>
                    )}
                  </div>
                </div>
                {item.dropdown ? (
                  openDropdowns[item.title] ? (
                    <ChevronDown className="text-gray-400 w-5 h-5" />
                  ) : (
                    <ChevronRight className="text-gray-400 w-5 h-5" />
                  )
                ) : (
                  <ChevronRight className="text-gray-400 w-5 h-5" />
                )}
              </div>

              {item.dropdown && openDropdowns[item.title] && (
                <div className="grid grid-cols-2 gap-3 p-2 rounded-b-md">
                  {item.dropdown.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex flex-col items-center py-2 border rounded cursor-pointer"
                      onClick={() => subItem.path && navigate(subItem.path)}
                    >
                      <subItem.icon className="text-gray-600 mb-2 w-5 h-5" />
                      <span className="text-sm">{subItem.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;