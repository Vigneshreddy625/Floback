import { Router } from "express";
import { getAllOrders, getUserOrders, placeOrder, updateOrderStatus } from "../controllers/orders.controller.js";
import {  verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getUserOrders);
router.post("/place", verifyJWT, placeOrder);
router.post("/update-status/:orderId", verifyJWT, verifyAdmin, updateOrderStatus);
router.get("/all", verifyJWT, verifyAdmin, getAllOrders)

export default router;