import { ArrowLeft, Check } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Details = () => {
  const [userInfo, setUserInfo] = useState({
    mobileNumber: "93XXXXXXXX",
    fullName: "Your Name",
    email: "youremail@gmail.com",
    alternateNumber: "",
    hintName: ""
  });

  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white dark:bg-black w-full">
      <div className="p-4 flex items-center">
        <button className="mr-2" onClick={() => window.history.back()}>
          <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>
        <h1 className="text-xl font-medium dark:text-white">Manage Your Account</h1>
      </div>

      <div className="flex-1 p-4 space-y-3">
        <div className="border rounded p-4 relative">
          <label className="absolute -top-2 left-3 bg-white dark:bg-black px-1 text-xs text-pink-600">
            Mobile Number<span className="text-pink-600">*</span>
          </label>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              <span className="text-lg dark:text-white">{userInfo.mobileNumber}</span>
              <div className="ml-2 bg-teal-500 rounded-full p-1">
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>
            <button className="text-pink-600 font-bold">CHANGE</button>
          </div>
        </div>

        <div className="border rounded relative">
          <label className="absolute -top-2 left-3 bg-white dark:bg-black px-1 text-xs text-gray-500">
            Full Name
          </label>
          <input 
            type="text" 
            value={userInfo.fullName}
            onChange={(e) => setUserInfo({...userInfo, fullName: e.target.value})}
            className="w-full p-4 bg-transparent dark:text-white outline-none"
          />
        </div>

        <div className="border rounded relative">
          <label className="absolute -top-2 left-3 bg-white dark:bg-black px-1 text-xs text-gray-500">
            Email
          </label>
          <input 
            type="email" 
            value={userInfo.email}
            onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
            className="w-full p-4 bg-transparent dark:text-white outline-none"
          />
        </div>

        <div className="">
          <h2 className="text-gray-600 dark:text-gray-400 mb-1.5">Alternate mobile number details</h2>
          
          <div className="border rounded flex items-center">
            <div className="px-4 py-2 border-r">+91</div>
            <input 
              type="text" 
              placeholder="Mobile Number"
              value={userInfo.alternateNumber}
              onChange={(e) => setUserInfo({...userInfo, alternateNumber: e.target.value})}
              className="flex-1 p-4 bg-transparent dark:text-white outline-none"
            />
          </div>
          
          <p className="text-gray-500 text-sm my-1">This will help recover your account if needed</p>
          
          <div className="border rounded mt-4">
            <input 
              type="text" 
              placeholder="Hint name"
              value={userInfo.hintName}
              onChange={(e) => setUserInfo({...userInfo, hintName: e.target.value})}
              className="w-full p-4 bg-transparent dark:text-white outline-none"
            />
          </div>
          
          <p className="text-gray-500 text-sm my-2">Add a name that helps you identify alternate number</p>
        </div>

        <button className="w-full bg-pink-600 text-white py-2 rounded font-bold mt-4">
          SAVE DETAILS
        </button>

        <hr />

        <div className="flex justify-center">
          <button className="text-gray-600 dark:text-gray-400 font-bold" onClick={() => navigate("/account/delete")}>
            DELETE ACCOUNT
          </button>
        </div>
      </div>

    </div>
  );
};

export default Details;