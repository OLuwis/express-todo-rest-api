import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

export const userRouter = Router();

const userController = new UserController();

userRouter.post("/user/signup", ( req, res ) => userController.signUp( req, res ));
userRouter.post("/user/login", ( req, res ) => userController.login( req, res ));