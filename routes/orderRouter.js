import express from "express";
import { auth, authAdmin } from '../middleware/auth.js';
import orderController from "../controllers/orderController.js";

const orderRouter = express.Router();


// CREATE ORDER
orderRouter.post("/", auth, orderController.createOrder);

// ADMIN GET ALL ORDERS
orderRouter.get(
    "/all", 
    auth,
    authAdmin, 
    orderController.getAllOrdersAdmin
);

// USER LOGIN ORDERS
orderRouter.get("/", auth, orderController.userLoginOrders);

// GET ORDER BY ID
orderRouter.get("/:id", auth, orderController.getOrderById);

// ORDER IS PAID
orderRouter.put("/:id/pay", auth, orderController.orderIsPaid);

// ORDER IS DELIVERED
orderRouter.put("/:id/delivered", auth, orderController.orderIsDelivered);


export default orderRouter;