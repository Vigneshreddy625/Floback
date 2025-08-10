import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  refreshAccessToken,
  deleteUser,
  userDetails,
  verifyEmail,
  resetPassword,
  validateResetToken,
  forgotPassword,
  resendVerificationEmail,
  resendRateLimit
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { authRateLimit } from '../middlewares/rateLimiting.middleware.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.route("/register").post(authRateLimit, catchAsync(registerUser));
router.route("/login").post(authRateLimit, catchAsync(loginUser));
router.route("/refresh-token").post(catchAsync(refreshAccessToken));
router.route("/verify-email").get(catchAsync(verifyEmail));
router.route("resend-verification").post(resendRateLimit, catchAsync(resendVerificationEmail));
router.route("/update-details").patch(verifyJWT, catchAsync(userDetails));
router.route("/forgot-password").post(catchAsync(forgotPassword));
router.route("/validate-reset-token").get(catchAsync(validateResetToken));
router.route("/reset-password").post(catchAsync(resetPassword));
router.route("/current-user").get(verifyJWT, catchAsync(getCurrentUser));
router.route("/logout").post(verifyJWT, catchAsync(logoutUser));
router.route("/delete-account").delete(verifyJWT, catchAsync(deleteUser));

export default router;