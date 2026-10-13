import express from "express";
import { ValidateUser } from "../utils/jwt.utils.js";
import { addEmailAccount } from "../controllers/emailAccount.controller.js";
import { updateEmailAccount } from "../controllers/emailAccount.controller.js";

const emailAccountRouter = express.Router();

emailAccountRouter.post("/create",ValidateUser,addEmailAccount)
emailAccountRouter.patch("/:id",ValidateUser,updateEmailAccount)

export default emailAccountRouter