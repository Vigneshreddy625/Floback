import React from "react";
import ReactLoading from "react-loading";

const LoadingScreen = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen">
      <ReactLoading type="spin" color="#007FFF" height={50} width={50} />
      <div className="mt-6">
        <p className="text-lg font-medium">Loading please wait...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
