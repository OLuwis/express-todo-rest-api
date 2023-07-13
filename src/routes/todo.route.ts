import { Router } from "express";
import { TodoController } from "../controllers/todo.controller.js";

export const todoRouter = Router();

const todoController = new TodoController();

todoRouter.get("/todo/:id", ( req, res ) => todoController.viewTodo( req, res ));
todoRouter.post("/todo/create", ( req, res ) => todoController.createTodo( req, res ));
todoRouter.delete("/todo/delete/:id", ( req, res ) => todoController.deleteTodo( req, res ));
todoRouter.patch("/todo/complete/:id", ( req, res ) => todoController.completeTodo( req, res ));
todoRouter.patch("/todo/update/:id", ( req, res ) => todoController.updateTodo( req, res ));