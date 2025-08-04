import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, User, Mail, Phone, Calendar, Info } from "lucide-react";
import { useAuth } from "../../authContext/useAuth";

const ProfileModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const popupRef = useRef(null);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
    return `${formattedDate} · ${formattedTime}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <motion.div
        ref={popupRef}
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="w-full max-w-xl bg-white rounded-2xl shadow-lg overflow-hidden border flex flex-col"
      >
        {/* Header */}
        <div className="relative h-14 bg-gradient-to-r from-blue-500 to-indigo-500">
          <button
            onClick={onClose}
            className="absolute top-3 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="absolute -bottom-6 left-6">
            <div className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pt-10 pb-6 overflow-y-auto max-h-[80vh]">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Profile Details
          </h2>

          <div className="space-y-4">
            <ProfileField
              label="Full Name"
              icon={<User />}
              value={user.fullName}
              disabled
            />
            <ProfileField
              label="Email ID"
              icon={<Mail />}
              value={user.email}
              disabled
            />
            <ProfileField
              label="Mobile Number"
              icon={<Phone />}
              value="93XXXXXXXX"
            />
            <ProfileField
              label="Gender"
              icon={<Info />}
              value="- not added -"
            />
            <ProfileField
              label="Date of Birth"
              icon={<Calendar />}
              value="- not added -"
            />
            <ProfileField
              label="Member Since"
              icon={<Calendar />}
              value={formatDateTime(user.createdAt)}
              disabled
            />
            <ProfileField
              label="Alternate Mobile"
              icon={<Phone />}
              value="- not added -"
            />
            <ProfileField
              label="Hint Name"
              icon={<Info />}
              value="- not added -"
            />
          </div>
        </div>
        <div className="p-3 sm:p-4 bg-gray-50 flex justify-end">
          <div className="flex gap-3 sm:gap-4">
            <button className="px-4 border border-gray-400 sm:px-6 py-2 sm:py-2.5 text-sm font-medium bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-lg transform transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 order-1 xs:order-2">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg transform transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 order-1 xs:order-2"
            >
              Save Info
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

function ProfileField({ label, icon, value, disabled }) {
  const isPlaceholder = value?.includes("not added");

  return (
    <div className="flex items-start space-x-3">
      <div className="mt-1 flex-shrink-0 text-gray-400">{icon}</div>
      <div className="flex-1">
        <label className="text-xs text-gray-500">{label}</label>
        <input
          type="text"
          value={value}
          disabled={disabled}
          readOnly={disabled}
          className={`w-full bg-gray-50 mt-1 border rounded-lg px-3 py-2 text-sm ${
            disabled
              ? "border-gray-200 text-gray-600 cursor-not-allowed"
              : isPlaceholder
              ? "text-gray-400 italic"
              : "text-gray-900"
          }`}
        />
      </div>
    </div>
  );
}

export default ProfileModal;
