import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout/AuthLayout";
import ForgotPasswordForm from "./ForgotPassword/ForgotPasswordForm";
import ResetPasswordForm from "./ForgotPassword/ResetPasswordForm";
import PopupAlert from "./ForgotPassword/PopupAlert";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("forgot");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");
    if (urlToken) {
      setToken(urlToken);
      setCurrentView("reset");
      validateToken(urlToken);
    }
  }, []);

  const validateToken = async (tokenToValidate) => {
    try {
      setLoading(true);
      setTokenChecked(false);
      const response = await fetch(
        `${API_URL}/users/validate-reset-token?token=${tokenToValidate}`
      );
      const data = await response.json();

      if (data.valid) {
        setTokenValid(true);
        setMessage("Token is valid. Please enter your new password.");
        setMessageType("success");
      } else {
        setTokenValid(false);
        setMessage("This reset link is invalid or has expired.");
        setMessageType("error");
      }
    } catch (error) {
      setTokenValid(false);
      setMessage("Error validating reset token.");
      setMessageType("error");
    } finally {
      setLoading(false);
      setTokenChecked(true);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    setMessage("");
    setErrors({});

    if (!email) {
      setErrors({ email: "Email is required." });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setMessage(
        "If this email exists, a reset link has been sent to your inbox."
      );
      setMessageType("success");
      setEmail("");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setMessage("");
    setErrors({});

    const newErrors = {};
    if (!newPassword) newErrors.newPassword = "Password is required";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    if (newPassword && newPassword.length < 6)
      newErrors.newPassword = "Password must be at least 6 characters long";
    if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (response.ok) {
        setMessage(
          "Password reset successfully! You can now log in with your new password."
        );
        setMessageType("success");
        setNewPassword("");
        setConfirmPassword("");
        setShouldNavigate(true);
      } else {
        setMessage(data.message || "Failed to reset password");
        setMessageType("error");
        setShouldNavigate(false);
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const pageTitle =
    currentView === "forgot" ? "Forgot Password?" : "Reset Password";
  const pageSubtitle =
    currentView === "forgot"
      ? "No worries! Enter your email and we'll send you a reset link."
      : "Enter your new password below.";

  return (
    <AuthLayout title={pageTitle} subtitle={pageSubtitle}>
      {message && (
        <PopupAlert
          message={message}
          type={messageType}
          onClose={() => {
            setMessage("");
            if (shouldNavigate) {
              navigate("/login");
            }
          }}
        />
      )}

      {currentView === "forgot" ? (
        <ForgotPasswordForm
          email={email}
          setEmail={setEmail}
          handleForgotPassword={handleForgotPassword}
          loading={loading}
          error={errors.email}
        />
      ) : (
        <ResetPasswordForm
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          handleResetPassword={handleResetPassword}
          loading={loading}
          showNewPassword={showNewPassword}
          setShowNewPassword={setShowNewPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          tokenChecked={tokenChecked}
          tokenValid={tokenValid}
          setCurrentView={setCurrentView}
          setMessage={setMessage}
          setToken={setToken}
          errors={errors}
        />
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
