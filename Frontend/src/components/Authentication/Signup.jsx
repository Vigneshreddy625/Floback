import React, { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext/useAuth";
import img from "../../assets/Login/loginm-1.jpeg";

function MobileSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { register, loading, error: authError } = useAuth();

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await register({
        fullName: `${firstName} ${lastName}`,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={img} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-8">
        <div className="w-full max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="bg-black/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white border-opacity-20"
          >
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
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full px-6 py-4 bg-white/20 rounded-full text-white placeholder-white text-center focus:outline-none focus:ring-2"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full px-6 py-4 bg-white/20 rounded-full text-white placeholder-white text-center focus:outline-none focus:ring-2"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="id@email.com"
                className="w-full px-6 py-4 bg-white/20 rounded-full text-white placeholder-white text-center focus:outline-none focus:ring-2"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-6 py-4 pr-12 bg-white/20 rounded-full text-white placeholder-white text-center focus:outline-none focus:ring-2"
                />
                <div
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </div>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full px-6 py-4 pr-12 bg-white/20 rounded-full text-white placeholder-white text-center focus:outline-none focus:ring-2"
                />
                <div
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-medium text-lg transition-all duration-200"
              >
                {loading ? "Signing up..." : "Signup"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MobileSignup;