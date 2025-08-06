import React, { useRef, useState, useEffect } from "react";
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
    confirmpass: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const passwordRef = useRef(null);
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
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmpass)
      newErrors.confirmpass = "Confirm Password is required";
    else if (formData.confirmpass !== formData.password)
      newErrors.confirmpass = "Password and Confirm Password are not same";

    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the Terms & Conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const userData = {
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      };

      await register(userData);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during signup");
      setErrors((prev) => ({
        ...prev,
        general: error.message || "An error occurred during signup",
      }));
    } finally {
      setIsLoading(false);
    }
  };
  const inputStyle = (extra = "") =>
    `w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${extra}`;

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-amber-50 to-blue-50 backdrop-brightness-95 p-4">
      <div className="relative hidden lg:flex lg:w-1/2 items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-10 z-10"></div>
        <img
          src={images[currentImageIndex]}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-20"
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

      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">
              Create an account
            </h1>
            <p className="text-gray-700">
              Already have an account?{" "}
              <Link to="/login" className="text-black underline font-medium">
                Log in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className={inputStyle("")}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className={inputStyle("")}
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
                className={inputStyle("")}
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

            <div>
              <input
                type="password"
                name="confirmpass"
                value={formData.confirmpass}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={inputStyle("")}
              />
              {errors.confirmpass && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmpass}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                required
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
              />
              <label
                htmlFor="agreeToTerms"
                className="ml-2 text-sm text-gray-700"
              >
                I agree to the{" "}
                <a href="#" className="text-black underline">
                  Terms & Conditions
                </a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>
            )}

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
                "Create account"
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 rounded-lg text-gray-700">
                  Or register with
                </span>
              </div>
            </div>

            <button
              type="button"
              className="cursor-pointer w-full flex items-center justify-center px-4 py-3 bg-white border border-gray-200 rounded-lg text-black hover:bg-gray-50 transition duration-200"
            >
              <img
                class="mr-4 h-5"
                src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
                alt
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
