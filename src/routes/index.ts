import { Router } from "express";
import { userRouter } from "./user.route";
import { todoRouter } from "./todo.route";

export const router = Router();

router.use(userRouter);
router.use(todoRouter);