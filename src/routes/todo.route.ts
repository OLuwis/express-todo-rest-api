import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";

export const todoRouter = Router();

const todoController = new TodoController();

todoRouter.get("/todo/get", ( req, res ) => todoController.get( req, res ));
todoRouter.post("/todo/create", ( req, res ) => todoController.create( req, res ));
todoRouter.delete("/todo/delete/:id", ( req, res ) => todoController.delete( req, res ));
todoRouter.put("/todo/update/:id", ( req, res ) => todoController.update( req, res ));
todoRouter.patch("/todo/complete/:id", ( req, res ) => todoController.complete( req, res ));