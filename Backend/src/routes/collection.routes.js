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
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/all', getAllCollections);

router.post(
  '/add',
  collectionUploadMiddleware, 
  addCollection
);

router.get('/:collectionId', getCollectionById);

router.get('/:collectionId/fabrics', getCollectionWithFabrics);

router.patch(
  '/update/:collectionId',
  updateCollection
);

router.delete(
  '/delete/:collectionId',
  deleteCollection
);

export default router;
