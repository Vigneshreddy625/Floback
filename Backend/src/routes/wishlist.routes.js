import { Router } from 'express';
import {
  addWishlistItem,
  removeFromWishlist,
  getUserWishlist,
} from '../controllers/wishlist.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router
  .route('/')
  .post(verifyJWT, catchAsync(addWishlistItem))
  .get(verifyJWT, catchAsync(getUserWishlist))
  .delete(verifyJWT, catchAsync(removeFromWishlist));

export default router;
