import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../Layout/Header";
import { useAuth } from "../../authContext/useAuth";

function Account() {
  const {user} = useAuth();
  return (
    <div className="w-full min-h-screen">
      <Header/>
      <div className="max-w-3xl mx-auto">
      <div className="p-4 w-full flex flex-col border-b border-gray-200 py-8">
        <h1>Account</h1>
        <p className="text-sm text-black">{user.fullName}</p>
      </div>
      <div className="flex space-x-6">
        <div className="flex flex-col space-y-4 ">
          <div className="p-4 flex flex-col space-y-2 border-b">
            <span className="text-md text-black">
              Orders
            </span>
            <Link
              to="/account/orders"
              className="text-md font-medium text-gray-800"
            >
              Orders
            </Link>
          </div>
          <div className="p-4 flex flex-col space-y-4">
            <div className="">
              <span className="text-md text-black">
                Account
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <Link
                to="/account/profile"
                className="text-md font-medium text-gray-800"
              >
                Profile
              </Link>
              <Link
                to="/account/addresses"
                className="text-md font-medium text-gray-800"
              >
                Addresses
              </Link>
              <Link
                to="/account/delete"
                className="text-md font-medium text-gray-800"
              >
                Delete
              </Link>
            </div>
          </div>
        </div>
        <div className="m-4 flex-1 w-[600px] max-h-[600px] overflow-auto">
          <Outlet />
        </div>
      </div>
      </div>
    </div>
  );
}

export default Account;
