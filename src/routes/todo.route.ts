import { Router } from "express";
import { TodoController } from "../controllers/todo.controller.js";

// Export an instance of express router
export const todoRouter = Router();

// Create an instance of todo route controller
const todoController = new TodoController();

// Create todo routes and maps
todoRouter.get("/todo/get", ( req, res ) => todoController.get( req, res ));
todoRouter.post("/todo/create", ( req, res ) => todoController.create( req, res ));
todoRouter.delete("/todo/delete/:id", ( req, res ) => todoController.delete( req, res ));
todoRouter.put("/todo/update/:id", ( req, res ) => todoController.update( req, res ));
todoRouter.patch("/todo/complete/:id", ( req, res ) => todoController.complete( req, res ));