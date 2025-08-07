import { Router } from 'express';
import {
  getAllFabrics,
  addFabric,
  updateFabric,
  getFabricById,
} from '../controllers/fabric.controller.js';
import { verifyJWT, verifyAdmin } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/add').post(
  upload.fields([
    { name: 'mainImage', maxCount: 1 }, 
    { name: 'additionalImages', maxCount: 10 }, 
  ]),
  verifyJWT, verifyAdmin, addFabric
);
router.route('/update/:fabricId').patch(verifyJWT, verifyAdmin, updateFabric);
router.route('/all').get(verifyJWT,getAllFabrics);
router.route('/:fabricId').get(verifyJWT,getFabricById); 

export default router;