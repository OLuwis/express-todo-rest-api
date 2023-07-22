import { Router } from "express";
import { userRouter } from "./user.route.js";
import { todoRouter } from "./todo.route.js";

export const router = Router();

router.use(userRouter);
router.use(todoRouter);