import { Request, Response } from "express";
import { TodoService } from "../services/todo.service.js";

// Create an instance of todo service
const todoService = new TodoService();

// Create a class to map todo route methods
export class TodoController {
    get( req: Request, res: Response ) {
        return todoService.getTodo(<string>req.headers.authorization?.slice(7), res);
    };

    create( req: Request, res: Response ) {
        return todoService.createTodo(<string>req.headers.authorization?.slice(7), res, <string>req.body.newTodo);
    };

    delete( req: Request, res: Response ) {
        return todoService.deleteTodo(<string>req.headers.authorization?.slice(7), res, parseInt(req.params.id));
    };

    update( req: Request, res: Response ) {
        return todoService.updateTodo(<string>req.headers.authorization?.slice(7), res, parseInt(req.params.id), <string>req.body.newTodo, <boolean>req.body.status);
    };

    complete( req: Request, res: Response ) {
        return todoService.completeTodo(<string>req.headers.authorization?.slice(7), res, parseInt(req.params.id));
    };
};