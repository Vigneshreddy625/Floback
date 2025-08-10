import { Router } from "express";
import { getAllOrders, getUserOrders, placeOrder, updateOrderStatus } from "../controllers/orders.controller.js";
import {  verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
import { catchAsync } from "../utils/catchAsync.js";

const router = Router();

router.route("/").get(verifyJWT, catchAsync(getUserOrders));
router.post("/place", verifyJWT, catchAsync(placeOrder));
router.post("/update-status/:orderId", verifyJWT, verifyAdmin, catchAsync(updateOrderStatus));
router.get("/all", verifyJWT, verifyAdmin, catchAsync(getAllOrders))

export default router;