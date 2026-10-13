
import express from "express";
import { getMe,deleteUser,logOut } from "../controllers/user.controllers.js";
import { ValidateUser } from "../utils/jwt.utils.js";

const userRouter = express.Router();

userRouter.get("/me",ValidateUser,getMe);
userRouter.get("/me",ValidateUser,logOut);
userRouter.delete("/delete",ValidateUser, deleteUser);

export default userRouter;
