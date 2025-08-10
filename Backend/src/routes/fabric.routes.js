import { Router } from 'express';
import {
  getAllFabrics,
  addFabric,
  updateFabric,
  getFabricById,
} from '../controllers/fabric.controller.js';
import { verifyJWT, verifyAdmin } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.route('/add').post(
  upload.fields([
    { name: 'mainImage', maxCount: 1 }, 
    { name: 'additionalImages', maxCount: 10 }, 
  ]),
  verifyJWT, verifyAdmin, catchAsync(addFabric)
);
router.route('/update/:fabricId').patch(verifyJWT, verifyAdmin, catchAsync(updateFabric));
router.route('/all').get(verifyJWT, catchAsync(getAllFabrics));
router.route('/:fabricId').get(verifyJWT, catchAsync(getFabricById)); 

export default router;