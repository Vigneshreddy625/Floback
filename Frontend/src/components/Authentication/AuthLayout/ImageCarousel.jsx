import React, { useState, useEffect } from 'react';
import login1 from "../../../assets/Login/login-1.jpg";
import login2 from "../../../assets/Login/login-2.jpg";
import login3 from "../../../assets/Login/login-3.jpg";
import login4 from "../../../assets/Login/login-4.jpg";

const images = [login1, login2, login3, login4];

function ImageCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center">
      <img
        src={images[currentImageIndex]}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute top-8 left-8 z-20">
        <h1 className="text-white text-2xl font-bold">Floriva</h1>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentImageIndex
                ? "bg-white"
                : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;