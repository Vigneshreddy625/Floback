import { Router } from 'express';
import {
  getAllProducts,
  addProduct,
  updateProduct,
  getProductById,
  deleteProduct,
} from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/add').post(
  upload.fields([
    { name: 'mainImage', maxCount: 1 }, 
    { name: 'additionalImages', maxCount: 10 }, 
  ]),
  addProduct
);
router.route('/update/:productId').patch(updateProduct);
router.route('/delete/:productId').delete(deleteProduct);
router.route('/all').get(getAllProducts);
router.route('/:productId').get(getProductById); 

export default router;