import { Router } from "express";
import { testRouter } from "./test.route.js";

export const router = Router();

router.use("/", testRouter);