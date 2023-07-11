import { Router } from "express";
import { Test } from "../controllers/test.controller.js";

export const testRouter = Router();

const testController = new Test();

testRouter.get("/test", ( req, res ) => testController.test( req, res ));