import { Router } from 'express';
import {
  getAllProducts,
  addProduct,
  updateProduct,
  getProductById,
} from '../controllers/product.controller.js';
import { verifyJWT, isAdmin } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/add').post(
  upload.fields([
    { name: 'mainImage', maxCount: 1 }, 
    { name: 'images', maxCount: 10 }, 
  ]),
  addProduct
);
router.route('/update/:productId').patch(updateProduct);
router.route('/all').get(getAllProducts);
router.route('/:productId').get(getProductById); 

export default router;