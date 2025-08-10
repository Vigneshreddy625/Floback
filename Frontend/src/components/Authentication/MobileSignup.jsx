import React, { useEffect } from "react";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../../authContext/useAuth";
import img from "../../assets/Login/loginm-1.jpeg";
import { Link, useNavigate } from "react-router-dom";

function MobileSignup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { register, error: authError, loading: authLoading } = useAuth();

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

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      await register({
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      });
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message || "Signup failed");
      setErrors((prev) => ({
        ...prev,
        general: error.message || "Signup failed",
      }));
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
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full px-6 py-4 bg-white/20 bg-opacity-80 backdrop-blur-sm rounded-full text-white placeholder-white placeholder-opacity-80 border-none focus:outline-none focus:ring-2 focus:ring-gray-50 focus:ring-opacity-50 text-center"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full px-6 py-4 bg-white/20 bg-opacity-80 backdrop-blur-sm rounded-full text-white placeholder-white placeholder-opacity-80 border-none focus:outline-none focus:ring-2 focus:ring-gray-50 focus:ring-opacity-50 text-center"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
              <div className="relative">
                <input
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-6 py-4 bg-white/20 bg-opacity-80 backdrop-blur-sm rounded-full text-white placeholder-white placeholder-opacity-80 border-none focus:outline-none focus:ring-2 focus:ring-gray-50 focus:ring-opacity-50 text-center"
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
                  placeholder="Enter your password"
                  className="w-full px-6 py-4 pr-12 bg-white/20 bg-opacity-80 backdrop-blur-sm rounded-full text-white placeholder-white placeholder-opacity-80 border-none focus:outline-none focus:ring-2 focus:ring-gray-50 focus:ring-opacity-50 text-center"
                />
                <button
                  type="button"
                  onClick={handlePasswordVisibility}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 cursor-pointer"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full px-6 py-4 pr-12 bg-white/20 bg-opacity-80 backdrop-blur-sm rounded-full text-white placeholder-white placeholder-opacity-80 border-none focus:outline-none focus:ring-2 focus:ring-gray-50 focus:ring-opacity-50 text-center"
                />
                <button
                  type="button"
                  onClick={handlePasswordVisibility}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 cursor-pointer"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {errors.general && (
                <div className="p-3 text-sm text-red-500 bg-red-900 bg-opacity-50 rounded-lg border border-red-500">
                  {errors.general}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading || authLoading}
                  className="w-full py-3 bg-blue-500 bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 rounded-full text-white font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {isLoading || authLoading ? (
                    <span className="flex items-center justify-center">
                      <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Creating account...
                    </span>
                  ) : (
                    "Sign up"
                  )}
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
