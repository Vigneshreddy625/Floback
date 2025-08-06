import React, { useState, useRef, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext/useAuth";
import img from "../../assets/Login/loginm-1.jpeg";

export default function MobileAdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { login, error: authError, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authError) {
      setErrorMessage(authError);
      setErrors((prev) => ({ ...prev, general: authError }));
    }
  }, [authError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
    setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage("");
    try {
      await login({ email: formData.email, password: formData.password }, navigate);
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during login");
      setErrors((prev) => ({ ...prev, general: error.message || "An error occurred during login" }));
    } finally {
      setIsLoading(false);
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
            onSubmit={handleLogin}
            className="bg-black/20 bg-opacity-40 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white border-opacity-20"
          >
            <div className="text-center mb-6">
              <h1
                className="text-white text-2xl font-bold tracking-wide cursor-pointer"
              >
                Floriva
              </h1>
            </div>

            <div className="text-center mb-8">
              <p className="text-white text-opacity-80 text-sm">
                Enter Admin Details
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/20 bg-opacity-80 backdrop-blur-sm rounded-full text-white placeholder-white placeholder-opacity-80 border-none focus:outline-none focus:ring-2 focus:ring-gray-50 focus:ring-opacity-50 text-center"
                  placeholder="id@email.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 text-center">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  ref={passwordRef}
                  className="w-full px-6 py-4 pr-12 bg-white/20 bg-opacity-80 backdrop-blur-sm rounded-full text-white placeholder-white placeholder-opacity-80 border-none focus:outline-none focus:ring-2 focus:ring-gray-50 focus:ring-opacity-50 text-center"
                  placeholder="*********"
                />
                <div
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1 text-center">
                    {errors.password}
                  </p>
                )}
              </div>

              {errors.general && (
                <div className="p-2 text-xs text-center text-red-500 bg-red-800 bg-opacity-40 rounded-md border border-red-500">
                  {errors.general}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading || authLoading}
                  className="w-full py-3 bg-blue-500 bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 rounded-full text-white font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
                >
                  {isLoading || authLoading ? "Logging in..." : "Login"}
                </button>
              </div>

              <div className="pt-4 text-center">
                <p className="text-white text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-300 underline cursor-pointer hover:text-blue-400"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}