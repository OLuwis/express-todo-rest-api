import "dotenv/config";
import { env } from "process";
import { Response } from "express";
import { Todos } from "../models/todos.model.js";
import jsonwebtoken, { Secret } from "jsonwebtoken";
import { appDataSource } from "../configs/orm.config.js";

const todosRepository = appDataSource.getRepository(Todos);

export class TodoService {
    getTodo(token: string, res: Response) {
        const userInfo = <{ userId: number, username: string }>jsonwebtoken.verify(token, <Secret>env.JWT_SECRET)
        todosRepository.findBy({
            todoUserId: userInfo.userId
        }).then(todos => {
            console.log(todos);
        }).catch(err => res.status(200).send(err));
    };

    createTodo(token: string, res: Response, myTodo: string) {
        const userInfo = <{ userId: number, username: string }>jsonwebtoken.verify(token, <Secret>env.JWT_SECRET);
        todosRepository.insert(todosRepository.create({
            todo: myTodo,
            todoUserId: userInfo.userId
        }));
        res.status(201).send("Todo Created");
    };

    deleteTodo(token: string, res: Response, todoId: number) {
        const userInfo = <{ userId: number, username: string }>jsonwebtoken.verify(token, <Secret>env.JWT_SECRET);
        todosRepository.findOneBy({
            id: todoId
        }).then(todo => {
            todo ? todo.todoUserId === userInfo.userId ? todosRepository.delete(todo).then(() => res.status(200).send("Todo deleted!")) : res.status(200).send("Action not allowed!") : res.status(200).send("Todo not found!");
        }).catch(err => res.status(200).send(err));
    };

    updateTodo(token: string, res: Response, todoId: number, newTodo: string, status: boolean) {
        const userInfo = <{ userId: number, username: string }>jsonwebtoken.verify(token, <Secret>env.JWT_SECRET);
        todosRepository.findOneBy({
            id: todoId
        }).then(todo => {
            todo ? todo.todoUserId === userInfo.userId ? todosRepository.update(todo, {
                todo: newTodo,
                todoCompleted: status
            }).then(() => res.status(200).send("Todo updated")).catch(err => res.status(200).send(err)) : res.status(200).send("Action not allowed!") : res.status(200).send("Todo not found!");
        }).catch(err => res.status(200).send(err));
    };

    completeTodo(token: string, res: Response, todoId: number) {
        const userInfo = <{ userId: number, username: string }>jsonwebtoken.verify(token, <Secret>env.JWT_SECRET);
        todosRepository.findOneBy({
            id: todoId
        }).then(todo => {
            return todo ? todo.todoUserId === userInfo.userId ? todosRepository.update(todo, {
                todoCompleted: true
            }).then(() => res.status(200).send("Todo completed!")).catch(err => res.status(200).send(err)) : res.status(200).send("Action not allowed!") : res.status(200).send("Todo not found!");
        }).catch(err => res.status(200).send(err))
    };
};