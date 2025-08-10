import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useAuth } from "../../authContext/useAuth";
import FormInput from "./AuthLayout/FormInput";
import AuthLayout from "./AuthLayout/AuthLayout";
import { FiAlertTriangle, FiMail } from "react-icons/fi";

function Signup() {
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
  const passwordRef = useRef();

  const navigate = useNavigate();
  const {
    register,
    error: authError,
    loading: authLoading,
    resendVerification,
  } = useAuth();

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
        setEmailSentStatus("success");
      } else {
        setEmailSentStatus("failed");
      }
    } catch (error) {
      setEmailSentStatus("failed");
    } finally {
      setResendingEmail(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage("");
    setEmailSentStatus("pending");

    try {
      const result = await register({
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      });
      if (result && result.emailSent !== undefined) {
        setEmailSentStatus(result.emailSent ? "success" : "failed");
      } else {
        setEmailSentStatus("success");
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
      <div className="fixed inset-0 backdrop-blur-md overflow-hidden">
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

                {emailSentStatus === "success" && (
                  <div className="bg-green-900 bg-opacity-50 border border-green-500 rounded-lg p-4">
                    <FiMail className="mx-auto text-green-400 text-2xl mb-2" />
                    <p className="text-green-200 text-sm">
                      A verification email has been sent to:
                    </p>
                    <p className="text-white font-semibold text-sm mt-1">
                      {formData.email}
                    </p>
                    <p className="text-green-200 text-xs mt-2">
                      Please check your inbox and click the verification link to
                      activate your account.
                    </p>
                  </div>
                )}

                {emailSentStatus === "failed" && (
                  <div className="bg-orange-900 bg-opacity-50 border border-orange-500 rounded-lg p-4">
                    <FiAlertTriangle className="mx-auto text-orange-400 text-2xl mb-2" />
                    <p className="text-orange-200 text-sm">
                      Your account was created, but we couldn't send the
                      verification email.
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

                {emailSentStatus === "pending" && (
                  <div className="bg-blue-900 bg-opacity-50 border border-blue-500 rounded-lg p-4">
                    <FaSpinner className="animate-spin mx-auto text-blue-400 text-2xl mb-2" />
                    <p className="text-blue-200 text-sm">
                      Sending verification email...
                    </p>
                  </div>
                )}

                <div className="space-y-3 pt-4">
                  <p className="text-white text-opacity-80 text-xs">
                    Didn't receive the email? Check your spam folder or try
                    resending.
                  </p>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate("/login")}
                      className="flex-1 py-2 bg-blue-500 bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 rounded-full text-white font-medium text-sm"
                    >
                      Go to Login
                    </button>

                    {emailSentStatus === "success" && (
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

  return (
    <AuthLayout>
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
            <FormInput
              label="First Name"
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
          </div>
          <div className="flex-1">
            <FormInput
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </div>
        </div>

        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <FormInput
          label="Enter your password"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          inputRef={passwordRef}
          showPasswordToggle
          showPassword={showPassword}
          handlePasswordVisibility={handlePasswordVisibility}
        />

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          inputRef={passwordRef}
          showPasswordToggle
          showPassword={showPassword}
          handlePasswordVisibility={handlePasswordVisibility}
        />

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
            <span className="px-2 bg-white text-gray-900">Or sign up with</span>
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
    </AuthLayout>
  );
}

export default Signup;
