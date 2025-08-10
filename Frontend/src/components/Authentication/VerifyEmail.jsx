import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Verifying your email...");
  const [hasToken, setHasToken] = useState(true);
  const [status, setStatus] = useState("loading"); 
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const API_URL = import.meta.env.VITE_BACKEND_URL; 

  useEffect(() => {
    if (!token) {
      setHasToken(false);
      setStatus("error");
      setMessage("Verification token is missing. Please reverify your email.");
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `${API_URL}/users/verify-email?token=${token}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.ok) {
          setMessage(data.message || "Email verified successfully!");
          setStatus("success");
        } else {
          setMessage(data.message || "Failed to verify email.");
          setStatus("error");
        }

        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        setStatus("error");
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    verify();
  }, [token, navigate]);

  const StatusIcon = () => {
    if (status === "loading") {
      return (
        <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      );
    }
    if (status === "success") {
      return (
        <svg
          className="w-10 h-10 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    return (
      <svg
        className="w-10 h-10 text-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14"
        />
      </svg>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg text-center border border-gray-100">
        <div className="flex justify-center mb-4">
          <StatusIcon />
        </div>
        <p className="text-lg font-medium">{message}</p>

        {hasToken ? (
          <p className="mt-2 text-sm text-gray-500">Redirecting to login...</p>
        ) : (
          <button
            onClick={() => navigate("/resend-verification")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Resend Verification Email
          </button>
        )}
      </div>
    </div>
  );
}
