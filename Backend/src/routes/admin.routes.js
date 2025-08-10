import { Router } from 'express';
import { loginAdmin, logoutAdmin, registerAdmin } from '../controllers/admin.controller.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.post("/register", catchAsync(registerAdmin));
router.post("/login", catchAsync(loginAdmin));
router.post("/logout",  catchAsync(logoutAdmin));

export default router;