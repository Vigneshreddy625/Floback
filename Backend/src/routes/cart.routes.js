import { Router } from "express";
import {
  getUserCart,
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../controllers/cart.controller.js";
import { body } from "express-validator";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(verifyJWT, getUserCart);
router.route("/add").post(verifyJWT,addItemToCart);
router.route("/remove/:productId").delete(verifyJWT, removeItemFromCart);
router.route("/clear").delete(verifyJWT, clearCart);

export default router;
