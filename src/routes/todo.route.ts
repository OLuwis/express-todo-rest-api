import { Router } from "express";
import { TodoController } from "../controllers/todo.controller.js";

export const todoRouter = Router();

const todoController = new TodoController();