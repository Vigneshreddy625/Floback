import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../authContext/useAuth';
import video from "../../assets/Landing.mp4"

function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmpass: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordRef = useRef(null);
  const confirPasswordRef = useRef(null);
  const navigate = useNavigate();
  const { register, error: authError, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authError) {
      setErrorMessage(authError);
      setErrors(prev => ({ ...prev, general: authError }));
    }
  }, [authError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errorMessage) {
      setErrorMessage('');
    }
    setErrors(prev => ({ ...prev, [name]: '', general: '' }));
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  }

  const handleBothPasswordVisibilty = () => {
    setShowPassword((prev) => !prev);
    setShowConfirmPassword((prev) => !prev);
  }

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!formData.confirmpass) newErrors.confirmpass = 'Confirm Password is required';
    else if( formData.confirmpass != formData.password) newErrors.confirmpass = 'Password and Confirm Password are not same';
    
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    
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
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      };
      
      await register(userData);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during signup");
      setErrors(prev => ({ ...prev, general: error.message || "An error occurred during signup" }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap bg-white">
      <div className="pointer-events-none relative hidden h-screen select-none md:block md:w-1/2">
        <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
          <a
            href="#"
            className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900"
          >
            Floriva
          </a>
        </div>
        <video
          className="absolute top-0 h-full w-full object-fit"
          src={video}
          alt="Background"
          autoPlay
          loop
          muted 
        />
      </div>
      <div className="flex w-full flex-col min-h-screen bg-white md:w-1/2">
        <div className="lg:w-[28rem] w-[360px] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start px-6 lg:border-none border border-gray-600 rounded-lg md:pt-0">
          <p className="text-left text-3xl font-bold text-black">Create an account</p>
          <p className="mt-2 text-left text-gray-500">
            Please enter your details to sign up.
          </p>
          {/* <button className="mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent text-black">
            <img
              className="mr-2 h-5"
              src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
              alt="Google logo"
            />
            Signup with Google
          </button>
          <div className="relative mt-8 flex h-px place-items-center bg-gray-400">
            <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">
              or
            </div>
          </div> */}

          <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSignup}>

            <div className="flex flex-col pt-4">
              <div
                className={`focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition ${
                  errors.fullName ? "border-red-500" : ""
                }`}
              >
                <input
                  type="text"
                  id="signup-fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Full Name"
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div className="flex flex-col pt-4">
              <div
                className={`focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition ${
                  errors.email ? "border-red-500" : ""
                }`}
              >
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col pt-4">
              <div
                className={`focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition ${
                  errors.password ? "border-red-500" : ""
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  id="signup-password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  ref={passwordRef}
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={handlePasswordVisibility}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEye className="h-5 w-5" />
                  ) : (
                    <FaEyeSlash className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex flex-col pt-4">
              <div
                className={`focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition ${
                  errors.confirmpass ? "border-red-500" : ""
                }`}
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="signup-confirmpass"
                  name="confirmpass"
                  value={formData.confirmpass}
                  onChange={handleChange}
                  ref={confirPasswordRef}
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={handleConfirmPasswordVisibility}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <FaEye className="h-5 w-5" />
                  ) : (
                    <FaEyeSlash className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmpass && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmpass}</p>
              )}
            </div>

            <div className="flex items-center justify-start my-4">
              <div className="flex items-center">
                <input
                  id="showpass"
                  name="showpass"
                  type="checkbox"
                  className="h-4 w-4 rounded border border-gray-300 text-gray-900 focus:ring-gray-500"
                  checked={showPassword && showConfirmPassword}
                  onChange={handleBothPasswordVisibilty}
                />
                <label
                  htmlFor="showpass"
                  className="ml-2 text-sm text-gray-600"
                >
                  Show password
                </label>
              </div>
            </div>

            {errors.general && (
              <div className="p-2 mb-4 text-sm text-red-500 bg-red-100 rounded-md">
                {errors.general}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || authLoading}
              className="w-full rounded-lg bg-gray-900 hover:bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 disabled:opacity-75"
            >
              {isLoading || authLoading ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                  Signing Up...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="py-6 text-center">
            <p className="text-gray-600">
              Already have an account?
              <Link
                to="/login"
                className="underline-offset-4 font-semibold text-gray-900 underline ml-1"
              >
                Sign in.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;