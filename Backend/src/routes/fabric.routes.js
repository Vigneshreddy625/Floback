import { Router } from 'express';
import {
  getAllFabrics,
  addFabric,
  updateFabric,
  getFabricById,
} from '../controllers/fabric.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/add').post(
  upload.fields([
    { name: 'mainImage', maxCount: 1 }, 
    { name: 'additionalImages', maxCount: 10 }, 
  ]),
  addFabric
);
router.route('/update/:fabricId').patch(updateFabric);
router.route('/all').get(getAllFabrics);
router.route('/:productId').get(getFabricById); 

export default router;