import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext/useAuth";
import { Button } from "../ui/button";
import video from "../../assets/Landing.mp4";

const Login = () => {
  const { login, error: authError, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  useEffect(() => {
    if (authError) {
      setErrors((prev) => ({
        ...prev,
        general: authError,
      }));
    }
  }, [authError]);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if (passwordRef.current) {
      passwordRef.current.type = showPassword ? "password" : "text";
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (errors[name] || errors.general) {
      setErrors({
        ...errors,
        [name]: "",
        general: "",
      });
    }
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    let newErrors = {};
    let isValid = true;

    if (!formValues.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formValues.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formValues.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (!isValid) {
      setErrors({ ...errors, ...newErrors });
      return;
    }

    setIsLoading(true);

    try {
      await login({
        email: formValues.email,
        password: formValues.password,
      });
      navigate("/home");
    } catch (error) {
      setErrors({
        ...errors,
        general:
          error.message ||
          "Login failed. Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap bg-white min-h-screen">
      <div className="pointer-events-none relative hidden h-screen select-none md:block md:w-1/2">
      <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
          <a
            href="#"
            className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900"
          >
            Floriva
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
        <div className="lg:w-[28rem] w-96 mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start px-6 md:pt-0 border lg:border-none rounded-lg">
          <p className="text-left text-3xl font-bold text-black mt-4">Welcome back</p>
          <p className="mt-2 text-left text-gray-500">
            Welcome back, please enter your details.
          </p>
          <button class="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent text-black">
            <img
              class="mr-2 h-5"
              src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
              alt
            />{" "}
            Log in with Google
          </button>
          <div class="relative mt-8 flex h-px place-items-center bg-gray-400">
            <div class="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">
              or
            </div>
          </div>

          <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleLogin}>
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
                  onChange={handleChange}
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col pt-4">
              <div
                className={`focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition ${
                  errors.password ? "border-red-500" : ""
                }`}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  ref={passwordRef}
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={handlePasswordVisibility}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between my-4">
              <div className="flex items-center">
                <input
                  id="showpass"
                  name="showpass"
                  type="checkbox"
                  className="h-4 w-4 rounded border border-gray-300 text-gray-900 focus:ring-gray-500"
                  checked={showPassword}
                  onChange={handlePasswordVisibility}
                />
                <label
                  htmlFor="showpass"
                  className="ml-2 text-sm text-gray-600"
                >
                  Show password
                </label>
              </div>
              <Link
                to="/otp"
                className="text-sm text-gray-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {errors.general && (
              <div className="p-2 mb-4 text-sm text-red-500 bg-red-100 rounded-md">
                {errors.general}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || authLoading}
              className="w-full rounded-lg bg-gray-900 hover:bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2 disabled:opacity-75"
            >
              {isLoading || authLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Log in"
              )}
            </Button>
          </form>

          <div className="py-6 text-center">
            <p className="text-gray-600">
              Don't have an account?
              <Link
                to="/signup"
                className="underline-offset-4 font-semibold text-gray-900 underline ml-1"
              >
                Sign up for free.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
