import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, FaSpinner } from "react-icons/fa";
import { useAuth } from "../../authContext/useAuth";
import login1 from "../../assets/Login/login-1.jpg";
import login2 from "../../assets/Login/login-2.jpg";
import login3 from "../../assets/Login/login-3.jpg";
import login4 from "../../assets/Login/login-4.jpg";

function AdminLogin() {
  const images = [login1, login2, login3, login4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const { login, error: authError, loading: authLoading } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (authError) {
      setErrorMessage(authError);
      setErrors((prev) => ({ ...prev, general: authError }));
    }
  }, [authError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorMessage) {
      setErrorMessage("");
    }
    setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
      await login(
        {
          email: formData.email,
          password: formData.password,
        },
        navigate
      );
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during login");
      setErrors((prev) => ({
        ...prev,
        general: error.message || "An error occurred during login",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = (extra = "") =>
    `w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${extra}`;

  return (
    <div className="flex min-h-screen lg:p-4 bg-gradient-to-r from-amber-50 to-gray-100">
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

      <div className="flex w-full lg:w-1/2 items-center justify-center p-2 md:p-8">
        <div className="w-full p-2 sm:p-0 rounded-lg max-w-md border border-gray-300 sm:border-none">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">
              Log in as Admin
            </h1>
            {/* <p className="text-gray-800">
              Don't have an account?{" "}
              <Link to="/signup" className="text-black underline font-medium">
                Sign up
              </Link>
            </p> */}
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={inputStyle("pr-2")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                ref={passwordRef}
                placeholder="Enter your password"
                className={inputStyle("pr-12")}
              />
              <button
                type="button"
                onClick={handlePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaEye className="h-5 w-5" />
                ) : (
                  <FaEyeSlash className="h-5 w-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-800 hover:text-black underline"
              >
                Forgot password?
              </Link>
            </div> */}

            {errors.general && (
              <div className="p-3 text-sm text-red-500 bg-red-900 bg-opacity-50 rounded-lg border border-red-500">
                {errors.general}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || authLoading}
              className="cursor-pointer w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg transition duration-200 disabled:opacity-50"
            >
              {isLoading || authLoading ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Logging in...
                </span>
              ) : (
                "Log in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
