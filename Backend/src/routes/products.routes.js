import { Router } from 'express';
import {
  getAllProducts,
  addProduct,
  updateProduct,
  getProductById,
  deleteProduct,
} from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJWT, verifyAdmin } from '../middlewares/auth.middleware.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.route('/add').post(
  upload.fields([
    { name: 'mainImage', maxCount: 1 }, 
    { name: 'additionalImages', maxCount: 10 }, 
  ]),
  verifyJWT, verifyAdmin, catchAsync(addProduct)
);
router.route('/update/:productId').patch(verifyJWT, verifyAdmin, catchAsync(updateProduct));
router.route('/delete/:productId').delete(verifyJWT, verifyAdmin, catchAsync(deleteProduct));
router.route('/all').get(verifyJWT, catchAsync(getAllProducts));
router.route('/:productId').get(verifyJWT, catchAsync(getProductById)); 

export default router;