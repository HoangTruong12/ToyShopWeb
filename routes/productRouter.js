import express from 'express';
import { auth, authAdmin } from '../middleware/auth.js';
import productController from '../controllers/productController.js';

const productRouter = express.Router();

// Get all products
productRouter.get("/", productController.getAllProducts);

// Get all products admin
productRouter.get(
    "/all", 
    auth, 
    authAdmin,  
    productController.getAllProductsAdmin
);

// Get single product
productRouter.get("/:id", productController.getSingleProduct);

// Product review 
productRouter.post("/:id/review", auth, productController.reviewProduct);

// Delete product admin
productRouter.delete(
    "/:id",
    auth,
    authAdmin, 
    productController.deleteProductAdmin
);

// Create product admin
productRouter.post(
    "/",
    auth,
    authAdmin, 
    productController.createProductAdmin
);

// Update product admin
productRouter.put(
    "/:id",
    auth,
    authAdmin, 
    productController.updateProductAdmin
);


export default productRouter;