import React from "react";
import FormInput from "../AuthLayout/FormInput";
import { FaSpinner } from "react-icons/fa";

const ForgotPasswordForm = ({
  email,
  setEmail,
  handleForgotPassword,
  loading,
  error,
}) => (
  <div className="space-y-6">
    <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-black mb-">Enter Your Email</h1>
      </div>

    <FormInput
      label="Email Address"
      name="email"
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      error={error}
    />
    <button
      type="button"
      onClick={handleForgotPassword}
      disabled={loading}
      className="cursor-pointer w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg transition duration-200 disabled:opacity-50"
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4" />
          Sending link...
        </span>
      ) : (
        "Send Reset Link"
      )}
    </button>
  </div>
);

export default ForgotPasswordForm;
