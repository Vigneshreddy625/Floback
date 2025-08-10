import React from "react";
import { Loader2 } from "lucide-react";

const LoadingScreen = ({ text = "Loading..." }) => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
        <p className="text-lg text-gray-600 font-medium">{text}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;