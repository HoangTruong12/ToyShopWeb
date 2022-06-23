import express from 'express';
import {auth, authAdmin} from '../middleware/auth.js';
import userController from '../controllers/userController.js';

const userRouter = express.Router();

// LOGIN
userRouter.post("/login", userController.login);

// REGISTER
userRouter.post("/", userController.register);

// PROFILE
userRouter.get("/profile", auth, userController.profile);

// UPDATE PROFILE
userRouter.put("/profile", auth, userController.updateProfile);

// GET ALL USER ADMIN
userRouter.get(
    "/", 
    auth,
    authAdmin, 
    userController.getAllUserAdmin
);



export default userRouter;