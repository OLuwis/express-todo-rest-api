import "dotenv/config";
import { env } from "process";
import { Response } from "express";
import { Todos } from "../models/todos.model.js";
import jsonwebtoken, { Secret } from "jsonwebtoken";
import { appDataSource } from "../configs/orm.config.js";

// Create an instance of todo model
const todosRepository = appDataSource.getRepository(Todos);

// Create a class to map todo route methods
export class TodoService {
    // Retrive todos from db
    getTodo(token: string, res: Response) {
        // Checks JWT Token
        const userInfo = <{ userId: number, username: string }>jsonwebtoken.verify(token, <Secret>env.JWT_SECRET)
        // Search for todos in db by jwt user id
        todosRepository.findBy({
            todoUserId: userInfo.userId
        }).then(todos => {
            res.status(200).send(todos);
        }).catch(err => res.status(200).send(err));
    };

    // Create todo in db
    createTodo(token: string, res: Response, myTodo: string) {
        // Checks JWT Token
        const userInfo = <{ userId: number, username: string }>jsonwebtoken.verify(token, <Secret>env.JWT_SECRET);
        // Insert todos into db
        todosRepository.insert(todosRepository.create({
            todo: myTodo,
            todoUserId: userInfo.userId
        }));
        res.status(201).send("Todo Created");
    };

    // Delete todo from db
    deleteTodo(token: string, res: Response, todoId: number) {
        // Checks JWT Token
        const userInfo = <{ userId: number, username: string }>jsonwebtoken.verify(token, <Secret>env.JWT_SECRET);
        // Search for todo by todo id
        todosRepository.findOneBy({
            id: todoId
        }).then(todo => {
            // Checks if todo is from the same user id comparing with jwt user id
            todo ? todo.todoUserId === userInfo.userId ? todosRepository.delete(todo).then(() => res.status(200).send("Todo deleted!")) : res.status(200).send("Action not allowed!") : res.status(200).send("Todo not found!");
        }).catch(err => res.status(200).send(err));
    };

    // Update todo in db
    updateTodo(token: string, res: Response, todoId: number, newTodo: string, status: boolean) {
        // Checks JWT Token
        const userInfo = <{ userId: number, username: string }>jsonwebtoken.verify(token, <Secret>env.JWT_SECRET);
        // Search for todo by todo id
        todosRepository.findOneBy({
            id: todoId
        }).then(todo => {
            // Checks if todo is from the same user id comparing with jwt user id
            todo ? todo.todoUserId === userInfo.userId ? todosRepository.update(todo, {
                todo: newTodo,
                todoCompleted: status
            }).then(() => res.status(200).send("Todo updated")).catch(err => res.status(200).send(err)) : res.status(200).send("Action not allowed!") : res.status(200).send("Todo not found!");
        }).catch(err => res.status(200).send(err));
    };

    // Update todo status in db
    completeTodo(token: string, res: Response, todoId: number) {
        // Checks JWT Token
        const userInfo = <{ userId: number, username: string }>jsonwebtoken.verify(token, <Secret>env.JWT_SECRET);
        // Search for todo by todo id
        todosRepository.findOneBy({
            id: todoId
        }).then(todo => {
            // Checks if todo is from the same user id comparing with jwt user id
            return todo ? todo.todoUserId === userInfo.userId ? todosRepository.update(todo, {
                todoCompleted: true
            }).then(() => res.status(200).send("Todo completed!")).catch(err => res.status(200).send(err)) : res.status(200).send("Action not allowed!") : res.status(200).send("Todo not found!");
        }).catch(err => res.status(200).send(err))
    };
};