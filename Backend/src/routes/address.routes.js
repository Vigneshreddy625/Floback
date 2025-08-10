import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from '../controllers/address.controller.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.route('/')
  .post(verifyJWT, catchAsync(createAddress))
  .get(verifyJWT, catchAsync(getAddresses));

router.route('/:id')
  .put(verifyJWT, catchAsync(updateAddress))
  .delete(verifyJWT, catchAsync(deleteAddress));

export default router;
