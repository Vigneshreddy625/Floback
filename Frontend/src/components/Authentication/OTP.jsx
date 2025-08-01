import React, { useState, useRef, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import video from "../../assets/Landing.mp4";


const OTP = () => {
  const [step, setStep] = useState("email"); // 'email' or 'otp'
  const [formValues, setFormValues] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: "" });
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
    // Clear error when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleVerifyEmail = () => {
    if (!formValues.email) {
      setErrors({ ...errors, email: "Email is required" });
      return;
    }
    
    if (!validateEmail(formValues.email)) {
      setErrors({ ...errors, email: "Please enter a valid email" });
      return;
    }
    
    // If email is valid, move to OTP step
    setStep("otp");
  };

  const handleOTPChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtpValues = [...otpValues];

    pastedData.forEach((value, index) => {
      if (index < 6 && /^\d$/.test(value)) {
        newOtpValues[index] = value;
      }
    });

    setOtpValues(newOtpValues);
  };

  const handleVerifyOTP = () => {
    startTransition(() => {
    navigate("/login");
    })
  };

  const isOTPComplete = () => {
    return otpValues.every(value => value !== "");
  };

  return (
    <div className="flex flex-wrap bg-white min-h-screen">
      <div className="pointer-events-none relative hidden h-screen select-none md:block md:w-1/2">
        <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
          <a
            href="#"
            className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900"
          >
            Vcommerce
          </a>
        </div>
        <video
          className="absolute top-0 lg:left-14 h-full w-full object-fit"
          src={video}
          alt="Background"
          autoPlay
          loop
          muted
        />
      </div>
      <div className="flex w-full flex-col md:w-1/2">
        <div className="min-h-screen md:w-full flex items-center justify-center">
          <div className="rounded-2xl p-8 w-full max-w-sm shadow-sm border border-gray-300 text-gray-900">
            {step === "email" ? (
              <>
                <h1 className="text-xl font-semibold text-center mb-6">
                  Verify your email
                </h1>
                <div className="flex flex-col pt-4">
                  <div
                    className={`focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  >
                    <input
                      type="email"
                      id="login-email"
                      name="email"
                      value={formValues.email}
                      onChange={handleEmailChange}
                      className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                      placeholder="Email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="mt-8">
                  <button
                    className="w-full bg-black text-white rounded-md py-3 font-medium text-sm hover:bg-gray-900 transition-colors"
                    onClick={handleVerifyEmail}
                  >
                    VERIFY
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-xl font-semibold text-center mb-2">
                  Verify your email
                </h1>
                <p className="text-center text-sm mb-4">
                  A code has been sent to your email
                </p>
                
                {/* Disabled email field showing the provided email */}
                <div className="flex flex-col mb-6">
                  <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                    <input
                      type="email"
                      id="display-email"
                      name="email"
                      value={formValues.email}
                      disabled
                      className="w-full flex-1 appearance-none border-gray-300 bg-gray-100 px-4 py-2 text-base text-gray-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mb-6 flex flex-col justify-center items-center">
                  <div className="flex gap-2">
                    {otpValues.map((value, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        className="w-10 h-10 border border-gray-500 rounded-md text-center text-lg focus:border-gray-400 focus:ring-0 focus:outline-none bg-transparent"
                      />
                    ))}
                  </div>
                </div>

                <button
                  className={`w-full rounded-md py-3 font-medium text-sm transition-colors ${
                    isOTPComplete() 
                      ? "bg-black text-white hover:bg-gray-900" 
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={handleVerifyOTP}
                  disabled={!isOTPComplete()}
                >
                  VERIFY
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTP;