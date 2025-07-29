import { Router } from 'express';
import {
  addWishlistItem,
  removeFromWishlist,
  getUserWishlist,
} from '../controllers/wishlist.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router
  .route('/')
  .post(verifyJWT, addWishlistItem)
  .get(verifyJWT, getUserWishlist)
  .delete(verifyJWT, removeFromWishlist);

export default router;
