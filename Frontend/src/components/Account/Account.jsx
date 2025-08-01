import React from "react";
import { Link, Outlet } from "react-router-dom";

function Account() {
  return (
    <div className="w-full  flex flex-col my-8">
      <div className="p-4 w-full flex flex-col border-b border-gray-200 dark:border-gray-700 py-8">
        <h1>Account</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">Username</p>
      </div>
      <div className="flex space-x-6">
        <div className="flex flex-col space-y-4 ">
          <div className="p-4 border-b">
            <Link
              to="/account/overview"
              className="text-md font-medium text-gray-800 dark:text-gray-200"
            >
              Overview
            </Link>
          </div>
          <div className="p-4 flex flex-col space-y-2 border-b">
            <span className="text-md text-gray-600 dark:text-gray-300">
              Orders
            </span>
            <Link
              to="/account/orders"
              className="text-md font-medium text-gray-800 dark:text-gray-200"
            >
              Orders
            </Link>
          </div>
          <div className="p-4 flex flex-col space-y-4">
            <div className="">
              <span className="text-md text-gray-600 dark:text-gray-300">
                Account
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <Link
                to="/account/profile"
                className="text-md font-medium text-gray-800 dark:text-gray-200"
              >
                Profile
              </Link>
              <Link
                to="/account/addresses"
                className="text-md font-medium text-gray-800 dark:text-gray-200"
              >
                Addresses
              </Link>
              <Link
                to="/account/delete"
                className="text-md font-medium text-gray-800 dark:text-gray-200"
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
  );
}

export default Account;
