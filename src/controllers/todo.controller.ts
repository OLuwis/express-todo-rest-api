import { Request, Response } from "express";
import { Todos } from "../models/todos.model.js";
import { appDataSource } from "../configs/orm.config.js";

const todosRepository = appDataSource.getRepository(Todos);

export class TodoController {
    async viewTodo( req: Request, res: Response ) {
        const todos = await todosRepository.findBy({ todoUserId: parseInt(req.params.id) });
        console.log(todos);
        res.send("All todos!");
    };

    async createTodo( req: Request, res: Response ) {
        const todos = new Todos();
        const todo = <string>req.query.todo;
        todos.todo = todo;
        todos.todoUserId = 1;
        await todosRepository.save(todos);
        res.send("Todo created!");
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