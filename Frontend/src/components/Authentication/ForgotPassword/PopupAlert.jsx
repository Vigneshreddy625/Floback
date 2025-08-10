import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react"; 

export default function PopupAlert({ message, type, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300); 
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 transition-all duration-300 pointer-events-none">
      <div
        className={`transform transition-all duration-500 ease-out pointer-events-auto cursor-pointer ${
          visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2"
        } max-w-sm w-full rounded-2xl shadow-2xl p-6 flex items-center space-x-4 border border-white/20
          ${type === "success" 
            ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700" 
            : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"}
        `}
        onClick={handleClose}
      >
        <div className="flex-shrink-0">
          {type === "success" ? (
            <CheckCircle className="w-8 h-8 text-white drop-shadow-sm" />
          ) : (
            <XCircle className="w-8 h-8 text-white drop-shadow-sm" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold text-white leading-tight drop-shadow-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}