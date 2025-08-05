import React, { useState } from "react";
import { useAuth } from "../../authContext/useAuth";
import ProfileModal from "../Modals/ProfileEditModal";
import { ArrowLeft, User, Edit3 } from "lucide-react";

export default function MobileProfile() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useAuth();

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    const formattedTime = date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${formattedDate}`;
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-white/70 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="flex items-center space-x-4 px-6 py-4">
          <button 
            onClick={() => window.history.back()}
            className="p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-blue-600" />
          </button>
          <h2 className="text-xl font-bold text-gray-800 flex-1">
            My Profile
          </h2>
        </div>
      </div>

      <div className="px-6 py-8 text-center">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-400 rounded-full border-4 border-white shadow-md"></div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mt-4">{user.fullName}</h3>
        <p className="text-blue-600 font-medium mt-1">Active Member</p>
      </div>

      <div className="px-6 space-y-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-blue-100/50 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100/50">
            <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Contact Information</h4>
          </div>
          <div className="p-1">
            <MobileProfileItem label="Email ID" value={user.email} />
            <MobileProfileItem label="Mobile Number" value={user.mobile} />
            <MobileProfileItem label="Alternate Mobile" value={user.alternateMobile} />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-blue-100/50 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-blue-100/50">
            <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Personal Details</h4>
          </div>
          <div className="p-1">
            <MobileProfileItem label="Full Name" value={user.fullName} />
            <MobileProfileItem label="Gender" value={user.gender} />
            <MobileProfileItem label="Date of Birth" value={formatDateTime(user.dob)} />
            <MobileProfileItem label="Hint Name" value={user.hintName} />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-blue-100/50 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-blue-100/50">
            <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Account Information</h4>
          </div>
          <div className="p-1">
            <MobileProfileItem
              label="Member Since"
              value={formatDateTime(user.createdAt)}
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        <button
          onClick={() => setIsProfileOpen(true)}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Edit3 className="w-5 h-5" />
          <span>Edit Profile</span>
        </button>
      </div>

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
}

function MobileProfileItem({ label, value }) {
  const isPlaceholder = value?.includes("not added");

  return (
    <div className="flex justify-between items-center py-4 px-4 border-b border-blue-50/50 last:border-b-0 hover:bg-blue-25 transition-colors duration-150">
      <span className="text-gray-600 font-medium text-sm">{label}</span>
      <span
        className={`text-sm text-right max-w-[60%] ${
          isPlaceholder
            ? "text-gray-400 italic"
            : "text-gray-800 font-semibold"
        }`}
      >
        {value}
      </span>
    </div>
  );
}