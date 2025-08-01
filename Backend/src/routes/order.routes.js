import { Router } from "express";
import { getAllOrders, getUserOrders, placeOrder, updateOrderStatus } from "../controllers/orders.controller.js";
import {  verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getUserOrders);
router.post("/place", verifyJWT, placeOrder);
router.post("/update-status/:orderId", updateOrderStatus);
router.get("/all", getAllOrders)

export default router;