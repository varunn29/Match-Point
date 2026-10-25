import express from "express";
import {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser
} from "../controllers/usersController.js";
import requireAuth from "../middleware/requireAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", requireAuth, getCurrentUser);
userRouter.post("/logout", logoutUser);

export default userRouter;