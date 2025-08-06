import React from "react";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import img from "../../assets/Login/loginm-1.jpeg";
import { Link } from "react-router-dom";

function MobileSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("id@email.com");
  const [password, setPassword] = useState("*********");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={img} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-8">
        <div className="w-full max-w-sm">
          <div className="bg-black/20 bg-opacity-40 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white border-opacity-20">
            <div className="text-center mb-6">
              <h1 className="text-white text-2xl font-bold tracking-wide">
                Floriva
              </h1>
            </div>

            <div className="text-center mb-8">
              <p className="text-white text-opacity-80 text-sm">
                Enter Your Details
              </p>
            </div>

            <div className="space-y-4">
                <div className="relative">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-6 py-4 bg-white/20 bg-opacity-80 backdrop-blur-sm rounded-full text-white placeholder-white placeholder-opacity-80 border-none focus:outline-none focus:ring-2 focus:ring-gray-50 focus:ring-opacity-50 text-center"
                  placeholder="First Name"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-6 py-4 bg-white/20 bg-opacity-80 backdrop-blur-sm rounded-full text-white placeholder-white placeholder-opacity-80 border-none focus:outline-none focus:ring-2 focus:ring-gray-50 focus:ring-opacity-50 text-center"
                  placeholder="Last Name"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-white/20 bg-opacity-80 backdrop-blur-sm rounded-full text-white placeholder-white placeholder-opacity-80 border-none focus:outline-none focus:ring-2 focus:ring-gray-50 focus:ring-opacity-50 text-center"
                  placeholder="id@email.com"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 pr-12 bg-white/20 bg-opacity-80 backdrop-blur-sm rounded-full text-white placeholder-white placeholder-opacity-80 border-none focus:outline-none focus:ring-2 focus:ring-gray-50 focus:ring-opacity-50 text-center"
                  placeholder="*********"
                />
                <div
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </div>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-6 py-4 pr-12 bg-white/20 bg-opacity-80 backdrop-blur-sm rounded-full text-white placeholder-white placeholder-opacity-80 border-none focus:outline-none focus:ring-2 focus:ring-gray-50 focus:ring-opacity-50 text-center"
                  placeholder="*********"
                />
                <div
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </div>
              </div>

              <div className="pt-2">
                <button className="w-full py-3 bg-blue-500 bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 rounded-full text-white font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
                  Signup
                </button>
              </div>

              <div className="pt-4 text-center">
                <p className="text-white text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-300 underline cursor-pointer hover:text-blue-400"
                  >
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileSignup;
