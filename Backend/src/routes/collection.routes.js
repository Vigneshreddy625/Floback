import { Router } from 'express';
import {
  getAllCollections,
  addCollection,
  getCollectionById,
  getCollectionWithFabrics,
  updateCollection,
  deleteCollection,
  collectionUploadMiddleware
} from '../controllers/collection.controller.js';
import { verifyAdmin, verifyJWT } from '../middlewares/auth.middleware.js';
import { catchAsync } from '../utils/catchAsync.js';

const router = Router();

router.get('/all', getAllCollections);

router.post(
  '/add',
  collectionUploadMiddleware, 
  verifyJWT,
  verifyAdmin,
  catchAsync(addCollection)
);

router.get('/:collectionId', verifyJWT, catchAsync(getCollectionById));

router.get('/:collectionId/fabrics', verifyJWT, catchAsync(getCollectionWithFabrics));

router.patch(
  '/update/:collectionId',
  verifyJWT,
  verifyAdmin,
  catchAsync(updateCollection)
);

router.delete(
  '/delete/:collectionId',
  verifyJWT,
  verifyAdmin,
  catchAsync(deleteCollection)
);

export default router;
