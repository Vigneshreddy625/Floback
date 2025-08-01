import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingScreen = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen px-4">
      <Skeleton circle height={50} width={50} />
      <div className="mt-6 w-48">
        <Skeleton height={20} />
      </div>
    </div>
  );
};

export default LoadingScreen;
