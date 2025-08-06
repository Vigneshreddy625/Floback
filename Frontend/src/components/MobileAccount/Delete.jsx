import React, { useState } from "react";
import DeleteAccountModal from "../Modals/DeleteModal";
import { useAuth } from "../../authContext/useAuth";
import { ArrowLeft, AlertTriangle, Shield, X, Trash2 } from "lucide-react"; // Added Trash2 for a more direct delete icon

export default function MobileDeleteAccount() {
  const [openDelete, setOpenDelete] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const {
    deleteUser,
    user,
    error: authError,
    loading: authLoading,
    isAuthenticated,
  } = useAuth();

  const handleOpenDeleteModal = () => {
    if (agreeTerms && user) {
      setOpenDelete(true);
    }
  };

  const onConfirmDelete = async () => {
    try {
      if (!user || !user._id) {
        console.error("User ID is missing");
        return;
      }

      await deleteUser(user._id);
      // Optionally redirect or show success message after deletion
    } catch (error) {
      console.error("Error during account deletion:", error);
    } finally {
      setOpenDelete(false);
    }
  };

  const handleKeepAccount = () => {
    window.history.back();
  };

  const handleBack = () => {
    window.history.back();
  };

  if (authLoading) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center font-sans">
        <div className="bg-white rounded-xl p-8 shadow-md text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center font-sans">
        <div className="bg-white rounded-xl p-8 shadow-md text-center max-w-sm mx-4">
          <Shield size={48} className="text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Authentication Required</h3>
          <p className="text-gray-600">Please login to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 font-sans text-gray-800">
  <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-100">
    <div className="flex items-center p-4">
      <button
        onClick={handleBack}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>
      <h1 className="text-lg font-bold flex-1 text-center">Delete Account</h1>
      <div className="w-10" />
    </div>
  </header>

  <main className="p-4 space-y-4">
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center space-y-4">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
        <Trash2 size={36} className="text-red-500" />
      </div>
      <h2 className="text-xl font-bold">Is this goodbye?</h2>
      <p className="text-gray-600">Are you sure you don't want to reconsider?</p>

      <div className="flex items-center gap-3 mt-4">
        <div className="p-2 bg-red-50 rounded-lg">
          <X size={18} className="text-red-600" />
        </div>
        <h3 className="text-md font-semibold text-gray-800">What you'll lose</h3>
      </div>

      <ul className="space-y-3 text-gray-700 text-left">
        {[
          "Your complete order history and tracking information.",
          "Saved payment methods and shipping addresses.",
          "All account-related benefits (permanently forfeited)."
        ].map((text, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-sm leading-relaxed">{text}</p>
          </li>
        ))}
      </ul>
    </div>

    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <label className="flex items-start gap-4 cursor-pointer">
        <div className="relative flex-shrink-0 mt-1">
          <input
            type="checkbox"
            className="sr-only"
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
          />
          <div
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
              agreeTerms ? "bg-red-500 border-red-500" : "border-gray-300 bg-white"
            }`}
          >
            {agreeTerms && (
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>
        <span className="text-sm text-gray-700 leading-relaxed">
          I understand the consequences and agree to all terms and conditions for permanent account deletion*.
        </span>
      </label>
    </div>

    {authError && (
      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
        <div className="flex items-center gap-3">
          <AlertTriangle size={18} className="text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm">{authError}</p>
        </div>
      </div>
    )}

    <div className="space-y-4">
      <button
        onClick={handleOpenDeleteModal}
        disabled={!agreeTerms || authLoading}
        className={`w-full py-3 rounded-lg text-base font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
          agreeTerms && !authLoading
            ? "bg-red-600 text-white shadow-md hover:bg-red-700 active:scale-95"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
      >
        {authLoading ? (
          <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full"></div>
        ) : (
          <Trash2 size={18} />
        )}
        <span>{authLoading ? "Processing..." : "Delete Account Permanently"}</span>
      </button>

      <button
        onClick={handleKeepAccount}
        className="w-full py-3 rounded-lg text-base font-semibold bg-gray-200 text-gray-700 shadow-md hover:bg-gray-300 active:scale-95 transition-colors"
      >
        Keep My Account Safe
      </button>
    </div>

    <div className="mt-4 text-center">
      <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
        This action cannot be undone. Please consider all options before proceeding with account deletion.
      </p>
    </div>
  </main>
</div>


      <DeleteAccountModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={onConfirmDelete}
        loading={authLoading}
      />
    </>
  );
}