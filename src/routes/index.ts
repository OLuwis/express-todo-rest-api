import { Router } from "express";
import { userRouter } from "./user.route.js";
import { todoRouter } from "./todo.route.js";

// Export an instance of express router
export const router = Router();

// Add routers middlewares
router.use(userRouter);
router.use(todoRouter);