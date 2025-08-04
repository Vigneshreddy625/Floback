import React from 'react';
import oops from "../../assets/oops1.png"

const PageNotFound = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <img 
          src={oops} 
          alt="Oops!"
          className="mb-6 w-full max-w-md mx-auto"
        />
        
        <h1 className="text-2xl font-bold mb-4">
          404 - PAGE NOT FOUND
        </h1>
        
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed,
          had its name changed or is temporarily unavailable.
        </p>
        
        <a 
          href="/home"
          className="inline-block px-8 py-3 rounded-md bg-black blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          GO TO HOMEPAGE
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;