import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

// Export an instance of express router
export const userRouter = Router();

// Create an instance of user route controller
const userController = new UserController();

// Create user routes and maps
userRouter.post("/user/signup", ( req, res ) => userController.signUp( req, res ));
userRouter.post("/user/login", ( req, res ) => userController.login( req, res ));