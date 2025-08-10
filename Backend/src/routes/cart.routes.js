import { Router } from "express";
import {
  getUserCart,
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../controllers/cart.controller.js";
import { body } from "express-validator";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { catchAsync } from "../utils/catchAsync.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(verifyJWT, catchAsync(getUserCart));
router.route("/add").post(verifyJWT,catchAsync(addItemToCart));
router.route("/remove/:itemId/:itemType").delete(verifyJWT, catchAsync(removeItemFromCart));
router.route("/clear").delete(verifyJWT, catchAsync(clearCart));

export default router;
