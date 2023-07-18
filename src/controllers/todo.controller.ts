import { Request, Response } from "express";
import { Todos } from "../models/todos.model.js";
import { appDataSource } from "../configs/orm.config.js";
import { TodoService } from "../services/todo.service.js";

const todosRepository = appDataSource.getRepository(Todos);
const todoService = new TodoService();

export class TodoController {
    viewTodo( req: Request, res: Response ) {
        return todoService.viewTodo(<string>req.headers.authorization?.slice(7), res);
    };

    createTodo( req: Request, res: Response ) {
        return todoService.createTodo(<string>req.headers.authorization?.slice(7), res, <string>req.query.todo);
    };

    async deleteTodo( req: Request, res: Response ) {
        await todosRepository.delete(req.params.id);
        res.send("Todo deleted!");
    };

    async updateTodo( req: Request, res: Response ) {
        await todosRepository.update(req.params.id, { todo: <string>req.query.todo });
        res.send("Todo updated!");
    };

    async completeTodo( req: Request, res: Response ) {
        await todosRepository.update(req.params.id, { todoCompleted: true });
        res.send("Todo completed!");
    };
};