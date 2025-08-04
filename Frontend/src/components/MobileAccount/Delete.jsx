import React, { useState } from "react";
import img from "../../assets/delete.jpg";
import DeleteAccountModal from "../Modals/DeleteModal"
import { useAuth } from "../../authContext/useAuth";
import { ArrowLeft, AlertTriangle, Shield, X } from "lucide-react";

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
      <div className="w-full min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex justify-center items-center">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
          <div className="animate-spin w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex justify-center items-center">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg text-center max-w-sm mx-4">
          <Shield size={48} className="text-pink-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Authentication Required</h3>
          <p className="text-gray-600">Please login to access this page</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-pink-100">
          <div className="px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="p-2 bg-pink-100 hover:bg-pink-200 rounded-2xl transition-all duration-200 active:scale-95"
              >
                <ArrowLeft size={20} className="text-pink-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Delete Account</h1>
                <p className="text-sm text-gray-500 mt-1">Permanent account removal</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-8">
          {/* Warning Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white/50 mb-6">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto">
                  <img src={img} alt="Delete account" className="w-16 h-16 rounded-2xl object-cover" />
                </div>
                <div className="absolute -top-2 -right-8 w-8 h-8 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center">
                  <AlertTriangle size={16} className="text-white" />
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Is this goodbye?
              </h2>
              <p className="text-gray-600 mb-4">
                Are you sure you don't want to reconsider?
              </p>
            </div>
          </div>

          {/* What You'll Lose */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white/50 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-100 rounded-xl">
                <X size={20} className="text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">What you'll lose</h3>
            </div>

            <div className="space-y-3 text-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm leading-relaxed">
                  Your complete order history and tracking information
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm leading-relaxed">
                  Saved payment methods and shipping addresses
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm leading-relaxed">
                  SuperCoins, coupons, and loyalty benefits
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm leading-relaxed">
                  All account-related benefits (permanently forfeited)
                </p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Note:</span> You can always create a new account later. 
                By deleting, you acknowledge our{" "}
                <span className="text-blue-600 underline font-medium cursor-pointer">Privacy Policy</span>.
              </p>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-white/50 mb-6">
            <label className="flex items-start gap-4 cursor-pointer">
              <div className="relative flex-shrink-0 mt-1">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                />
                <div className={`w-5 h-5 rounded-lg border-2 transition-all duration-200 ${
                  agreeTerms 
                    ? 'bg-pink-500 border-pink-500' 
                    : 'border-gray-300 bg-white'
                }`}>
                  {agreeTerms && (
                    <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-gray-700 leading-relaxed">
                I understand the consequences and agree to all terms and conditions for permanent account deletion*
              </span>
            </label>
          </div>

          {/* Error Message */}
          {authError && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <AlertTriangle size={20} className="text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm">{authError}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleOpenDeleteModal}
              disabled={!agreeTerms || authLoading}
              className={`w-full py-4 rounded-2xl text-base font-semibold transition-all duration-200 ${
                agreeTerms && !authLoading
                  ? "bg-red-500/10 hover:bg-red-500/20 text-red-600 border-2 border-red-200 hover:border-red-300 active:scale-95" 
                  : "bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed"
              }`}
            >
              {authLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full"></div>
                  Processing...
                </div>
              ) : (
                "Delete Account Permanently"
              )}
            </button>

            <button
              onClick={handleKeepAccount}
              className="w-full py-4 rounded-2xl text-base font-semibold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            >
              Keep My Account Safe
            </button>
          </div>

          {/* Additional Safety Note */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
              This action cannot be undone. Please consider all options before proceeding with account deletion.
            </p>
          </div>
        </div>
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