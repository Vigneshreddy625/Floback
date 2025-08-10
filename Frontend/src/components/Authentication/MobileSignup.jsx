import React, { useEffect } from "react";
import { useState } from "react";
import { FiEye, FiEyeOff, FiMail, FiAlertTriangle } from "react-icons/fi";
import { FaGoogle, FaSpinner, FaTimes, FaCheckCircle } from "react-icons/fa";
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
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [emailSentStatus, setEmailSentStatus] = useState(null); 
  const [resendingEmail, setResendingEmail] = useState(false);

  const navigate = useNavigate();
  const { register, error: authError, loading: authLoading, resendVerification } = useAuth();

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

  const handleResendEmail = async () => {
    setResendingEmail(true);
    try {
      const result = await resendVerification(formData.email);
      if (result.success) {
        setEmailSentStatus('success');
      } else {
        setEmailSentStatus('failed');
      }
    } catch (error) {
      setEmailSentStatus('failed');
    } finally {
      setResendingEmail(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage("");
    setEmailSentStatus('pending');

    try {
      const result = await register({
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      });

      if (result && result.emailSent !== undefined) {
        setEmailSentStatus(result.emailSent ? 'success' : 'failed');
      } else {
        setEmailSentStatus('success');
      }
      
      setSignupSuccess(true);
      
      setTimeout(() => navigate("/login"), 2000);
      
    } catch (error) {
      setSignupSuccess(false);
      setEmailSentStatus(null);
      setErrorMessage(error.message || "Signup failed");
      setErrors((prev) => ({
        ...prev,
        general: error.message || "Signup failed",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  if (signupSuccess) {
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

              <div className="text-center space-y-6">
                <FaCheckCircle className="mx-auto text-green-400 text-5xl mb-4" />
                
                <h2 className="text-white text-xl font-semibold">
                  Account Created Successfully!
                </h2>

                {emailSentStatus === 'success' && (
                  <div className="bg-green-900 bg-opacity-50 border border-green-500 rounded-lg p-4">
                    <FiMail className="mx-auto text-green-400 text-2xl mb-2" />
                    <p className="text-green-200 text-sm">
                      A verification email has been sent to:
                    </p>
                    <p className="text-white font-semibold text-sm mt-1">
                      {formData.email}
                    </p>
                    <p className="text-green-200 text-xs mt-2">
                      Please check your inbox and click the verification link to activate your account.
                    </p>
                  </div>
                )}

                {emailSentStatus === 'failed' && (
                  <div className="bg-orange-900 bg-opacity-50 border border-orange-500 rounded-lg p-4">
                    <FiAlertTriangle className="mx-auto text-orange-400 text-2xl mb-2" />
                    <p className="text-orange-200 text-sm">
                      Your account was created, but we couldn't send the verification email.
                    </p>
                    <p className="text-orange-200 text-xs mt-2">
                      This might be due to a temporary mail server issue.
                    </p>
                    <button
                      onClick={handleResendEmail}
                      disabled={resendingEmail}
                      className="mt-3 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded-full transition-colors disabled:opacity-50"
                    >
                      {resendingEmail ? (
                        <span className="flex items-center">
                          <FaSpinner className="animate-spin mr-2 h-3 w-3" />
                          Sending...
                        </span>
                      ) : (
                        "Resend Verification Email"
                      )}
                    </button>
                  </div>
                )}

                {emailSentStatus === 'pending' && (
                  <div className="bg-blue-900 bg-opacity-50 border border-blue-500 rounded-lg p-4">
                    <FaSpinner className="animate-spin mx-auto text-blue-400 text-2xl mb-2" />
                    <p className="text-blue-200 text-sm">
                      Sending verification email...
                    </p>
                  </div>
                )}

                <div className="space-y-3 pt-4">
                  <p className="text-white text-opacity-80 text-xs">
                    Didn't receive the email? Check your spam folder or try resending.
                  </p>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate("/login")}
                      className="flex-1 py-2 bg-blue-500 bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 rounded-full text-white font-medium text-sm"
                    >
                      Go to Login
                    </button>
                    
                    {emailSentStatus === 'success' && (
                      <button
                        onClick={handleResendEmail}
                        disabled={resendingEmail}
                        className="flex-1 py-2 bg-gray-500 bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 rounded-full text-white font-medium text-sm disabled:opacity-50"
                      >
                        {resendingEmail ? "Sending..." : "Resend Email"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original signup form
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