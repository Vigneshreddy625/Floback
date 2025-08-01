import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  refreshAccessToken,
  deleteUser,
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { authRateLimit } from '../middlewares/rateLimiting.middleware.js';

const router = Router();

router.route("/register").post(authRateLimit, registerUser);
router.route("/login").post(authRateLimit, loginUser);
router.route("/refresh-token").post(refreshAccessToken);

router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/delete-account").delete(verifyJWT, deleteUser);

export default router;