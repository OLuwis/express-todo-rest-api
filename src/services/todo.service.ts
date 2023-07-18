import { Todos } from "../models/todos.model.js";
import { appDataSource } from "../configs/orm.config.js";
import { envs } from "../configs/env.config.js";
import jsonwebtoken, { Secret } from "jsonwebtoken";
import { Response } from "express";

const todosRepository = appDataSource.getRepository(Todos);

export class TodoService {
    viewTodo(token: string, res: Response) {
        const userInfo = <{ userId: number, username: string }>jsonwebtoken.verify(token, <Secret>envs.JWT_SECRET)
        todosRepository.findBy({
            todoUserId: userInfo.userId
        }).then(todos => {
            console.log(todos);
        }).catch(err => res.status(200).send(`Error: ${err}`));
    };

    createTodo(token: string, res: Response, myTodo: string) {
        const userInfo = <{ userId: number, username: string }>jsonwebtoken.verify(token, <Secret>envs.JWT_SECRET)
        const newTodo = todosRepository.create({
            todo: myTodo,
            todoUserId: userInfo.userId
        })
        todosRepository.insert(newTodo);
        console.log("Todo created");
    };
};