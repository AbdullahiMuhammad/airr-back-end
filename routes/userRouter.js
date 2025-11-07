import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getAllUsers, getUser } from '../controllers/userController.js';

const userRouter = express.Router();



userRouter.get("/get-logged-user", authMiddleware, getUser);
userRouter.get('/get-all-users', authMiddleware, getAllUsers)

export default userRouter;