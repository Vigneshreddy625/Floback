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

const router = Router();

router.get('/all', getAllCollections);

router.post(
  '/add',
  collectionUploadMiddleware, 
  verifyJWT,
  verifyAdmin,
  addCollection
);

router.get('/:collectionId', verifyJWT, getCollectionById);

router.get('/:collectionId/fabrics', verifyJWT, getCollectionWithFabrics);

router.patch(
  '/update/:collectionId',
  verifyJWT,
  verifyAdmin,
  updateCollection
);

router.delete(
  '/delete/:collectionId',
  verifyJWT,
  verifyAdmin,
  deleteCollection
);

export default router;
