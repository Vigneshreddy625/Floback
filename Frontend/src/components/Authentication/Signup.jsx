import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useAuth } from "../../authContext/useAuth";
import login1 from "../../assets/Login/login-1.jpg";
import login2 from "../../assets/Login/login-2.jpg";
import login3 from "../../assets/Login/login-3.jpg";
import login4 from "../../assets/Login/login-4.jpg";

function Signup() {
  const images = [login1, login2, login3, login4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
              Create your account
            </h1>
            <p className="text-gray-800">
              Already have an account?{" "}
              <Link to="/login" className="text-black underline font-medium">
                Log in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className={inputStyle()}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className={inputStyle()}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

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
                placeholder="Enter your password"
                className={inputStyle("pr-12")}
              />
              <button
                type="button"
                onClick={handlePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={inputStyle("pr-12")}
              />
              <button
                type="button"
                onClick={handlePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaEye className="h-5 w-5" />
                ) : (
                  <FaEyeSlash className="h-5 w-5" />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

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
                  Creating account...
                </span>
              ) : (
                "Sign up"
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-900">
                  Or sign up with
                </span>
              </div>
            </div>

            <button
              type="button"
              className="cursor-pointer w-full flex items-center justify-center px-4 py-3 bg-white border border-gray-200 rounded-lg text-black hover:bg-gray-100 transition duration-200"
            >
              <img
                className="mr-4 h-5"
                src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
                alt=""
              />{" "}
              Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;