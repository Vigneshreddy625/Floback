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

const router = Router();

router.route('/add').post(
  upload.fields([
    { name: 'mainImage', maxCount: 1 }, 
    { name: 'additionalImages', maxCount: 10 }, 
  ]),
  verifyJWT, verifyAdmin, addProduct
);
router.route('/update/:productId').patch(verifyJWT, verifyAdmin, updateProduct);
router.route('/delete/:productId').delete(verifyJWT, verifyAdmin, deleteProduct);
router.route('/all').get(verifyJWT, getAllProducts);
router.route('/:productId').get(verifyJWT, getProductById); 

export default router;