import React, { useState } from 'react';
import img from "../../assets/delete.jpg";
import DeleteAccountModal from '../Modals/DeleteModal';
import { useAuth } from '../../authContext/useAuth';
import { ArrowLeft } from 'lucide-react';

const DeleteAccount = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const { deleteUser, user, error: authError, loading: authLoading, isAuthenticated } = useAuth();

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

  if (authLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="flex justify-center items-center h-64">Please login to access this page</div>;
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="p-4 border-b fixed top-0 left-0 right-0 bg-white dark:bg-black z-10">
        <div className="max-w-md mx-auto flex items-center space-x-2">
          <button 
            onClick={() => window.history.back()} 
            className="p-1 rounded-full dark:hover:bg-gray-600 hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-semibold">Delete Account</h1>
        </div>
      </div>

      <main className="flex-grow pt-16 pb-24 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <img 
              src={img}
              alt="Goodbye"
              className="w-64 h-64 object-contain"
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium">
              Is this goodbye? Are you sure you don't want to reconsider?
            </h2>

            <div className="space-y-6">
              <div>
                <p className="text-md font-medium mb-2">
                  You'll lose your order history, saved details, SuperCoins and all other coupons and benefits.
                </p>
                <p className="text-sm text-gray-600">
                  Any account related benefits will be forfeited once the account is deleted and will no longer be available to you. You cannot recover the same. However, you can always create a new account. By deleting your account, you acknowledge you have read our{' '}
                  <span className="text-pink-500 cursor-pointer">Privacy Policy</span>.
                </p>
              </div>
              <div>
                <p className="text-md font-medium mb-2">
                  Any pending orders, exchanges, returns or refunds will no longer be accessible via your account.
                </p>
                <p className="text-sm text-gray-600">
                  Vcommerce will try to complete the open transactions in the next 30 days on a best effort basis. However, we cannot ensure tracking & traceability of transactions once the account is deleted.
                </p>
              </div>
              <div>
                <p className="text-md font-medium mb-2">
                  Vcommerce may not extend New User coupon if an account created with same mobile number or email id.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="mt-1" 
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                />
                <span className="text-md">I agree to all the terms and conditions*</span>
              </label>
            </div>

            {authError && (
              <div className="text-red-500 text-sm py-1">
                {authError}
              </div>
            )}
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 border-t bg-white dark:bg-black">
        <div className="max-w-md mx-auto flex space-x-4">
          <button 
            className={`flex-1 py-3 text-sm border border-pink-500 text-pink-500 rounded-md ${agreeTerms ? 'hover:bg-pink-50' : 'opacity-50 cursor-not-allowed'}`}
            onClick={handleOpenDeleteModal}
            disabled={!agreeTerms || authLoading}
          >
            {authLoading ? 'PROCESSING...' : 'DELETE ANYWAY'}
          </button>
          <button 
            className="flex-1 py-3 text-sm bg-pink-500 text-white rounded-md hover:bg-pink-600"
            onClick={handleKeepAccount}
          >
            KEEP ACCOUNT
          </button>
        </div>
      </div>
      
      <DeleteAccountModal 
        isOpen={openDelete} 
        onClose={() => setOpenDelete(false)} 
        onConfirm={onConfirmDelete}
        loading={authLoading}
      />
    </div>
  );
};

export default DeleteAccount;