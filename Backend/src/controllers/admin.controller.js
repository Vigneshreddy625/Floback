import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const validateInput = (data, requiredFields) => {
  const errors = [];
  for (const field of requiredFields) {
    if (!data[field] || typeof data[field] === "string" && !data[field].trim()) {
      errors.push(`${field} is required`);
    }
  }
  return errors;
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePasswordStrength = (password) => {
  if (!password || password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
    return "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
  }
  return null;
};

const generateAccessAndRefreshToken = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid user ID");
  }

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  await User.findByIdAndUpdate(userId, { refreshToken }, { new: true });
  return { accessToken, refreshToken };
};

// 🚀 ADMIN SIGNUP
const registerAdmin = async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;

    const validationErrors = validateInput(req.body, ["fullName", "email", "password"]);
    if (validationErrors.length > 0) {
      return next(new ApiError(400, validationErrors.join(", ")));
    }

    if (!isValidEmail(email.trim())) {
      return next(new ApiError(400, "Please provide a valid email address"));
    }

    const passwordError = validatePasswordStrength(password);
    if (passwordError) {
      return next(new ApiError(400, passwordError));
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) return next(new ApiError(409, "Admin already exists with this email"));

    const admin = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: "admin", // force role
    });

    const createdAdmin = await User.findById(admin._id).select("-password -refreshToken -__v");

    return res
      .status(201)
      .json(new ApiResponse(201, createdAdmin, "Admin registered successfully"));
  } catch (err) {
    return next(new ApiError(500, "Admin registration failed", err));
  }
};

// 🔑 ADMIN LOGIN
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validationErrors = validateInput(req.body, ["email", "password"]);
    if (validationErrors.length > 0) {
      return next(new ApiError(400, validationErrors.join(", ")));
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user || user.role !== "admin") {
      return next(new ApiError(401, "Admin credentials are invalid"));
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(new ApiError(401, "Admin credentials are invalid"));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInAdmin = await User.findById(user._id).select("-password -refreshToken -__v");

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    const accessTokenOptions = { ...cookieOptions, maxAge: 15 * 60 * 1000 };

    return res
      .status(200)
      .cookie("accessToken", accessToken, accessTokenOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(new ApiResponse(200, { user: loggedInAdmin, accessToken, refreshToken }, "Admin logged in"));
  } catch (err) {
    return next(new ApiError(500, "Admin login failed", err));
  }
};

// 🚪 ADMIN LOGOUT
const logoutAdmin = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return next(new ApiError(401, "Only admin can logout via this route"));
    }

    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    };

    return res
      .status(200)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json(new ApiResponse(200, {}, "Admin logged out successfully"));
  } catch (err) {
    return next(new ApiError(500, "Logout failed", err));
  }
};

export { registerAdmin, loginAdmin, logoutAdmin };
