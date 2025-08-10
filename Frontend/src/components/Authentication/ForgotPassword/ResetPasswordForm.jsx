import { AlertCircle } from "lucide-react";
import React from "react";
import { FaSpinner } from "react-icons/fa";
import FormInput from "../AuthLayout/FormInput";

const ResetPasswordForm = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  handleResetPassword,
  loading,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  tokenChecked,
  tokenValid,
  setCurrentView,
  setMessage,
  setToken,
  errors,
}) => {
  if (!tokenChecked) {
    return (
      <div className="text-center py-8">
        <FaSpinner className="animate-spin h-8 w-8 text-purple-500 mx-auto mb-4" />
        <p className="text-gray-600">Validating reset token...</p>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">
          This reset link is invalid or has expired.
        </p>
        <button
          onClick={() => {
            setCurrentView("forgot");
            setMessage("");
            setToken("");
          }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-lg font-semibold text-sm hover:from-purple-700 hover:to-purple-800 transition-all duration-200"
        >
          Request New Link
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-black mb-">Reset Paasword</h1>
      </div>
      <FormInput
        label="New Password"
        name="newPassword"
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        error={errors.newPassword}
        showPasswordToggle
        isPasswordVisible={showNewPassword}
        onPasswordToggle={() => setShowNewPassword((prev) => !prev)}
      />
      <FormInput
        label="Confirm New Password"
        name="confirmPassword"
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
        showPasswordToggle
        isPasswordVisible={showConfirmPassword}
        onPasswordToggle={() => setShowConfirmPassword((prev) => !prev)}
      />
      {errors.general && (
        <div className="p-3 text-sm text-red-500 bg-red-900 bg-opacity-50 rounded-lg border border-red-500">
          {errors.general}
        </div>
      )}
      <button
        type="button"
        onClick={handleResetPassword}
        disabled={loading}
        className="cursor-pointer w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg transition duration-200 disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4" />
            Resetting password...
          </span>
        ) : (
          "Reset Password"
        )}
      </button>
    </div>
  );
};

export default ResetPasswordForm;
