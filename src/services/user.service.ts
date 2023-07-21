import "dotenv/config";
import bcrypt from "bcrypt";
import { env } from "process";
import { Response } from "express";
import { Users } from "../models/users.model";
import jsonwebtoken, { Secret } from "jsonwebtoken";
import { appDataSource } from "../configs/orm.config";

const usersRepository = appDataSource.getRepository(Users);

export class UserService {
    signUp( reqUsername: string, reqPassword: string, res: Response ) {
        usersRepository.findOneBy({ username: reqUsername }).then(user => {
            return !user ? bcrypt.genSalt(10, (err, mySalt) => {
                return !err ? bcrypt.hash(reqPassword, mySalt).then(hash => {
                    usersRepository.insert(usersRepository.create({
                        username: reqUsername,
                        salt: mySalt,
                        password: hash
                    }));
                    res.status(201).send("User created!");
                }).catch(err => res.status(200).send(`Error: ${err}`))
                : res.status(200).send(`Error: ${err}`);
            }) : res.status(409).send("Username already taken!")
        }).catch(err => res.status(200).send(`Error: ${err}`));
    };

    login( reqUsername: string, reqPassword: string, res: Response ) {
        usersRepository.findOneBy({
            username: reqUsername
        }).then(user => {
            return user ? bcrypt.compare(reqPassword, user.password).then(isEqual => {
                return isEqual ? res.status(200).send(jsonwebtoken.sign({ userId: user.user_id, username: user.username}, <Secret>env.JWT_SECRET))
                : res.status(409).send("Wrong Password!");
            }).catch(err => res.status(200).send(`Error: ${err}`))
            : res.status(404).send("User not found!");
        }).catch(err => res.status(200).send(`Error: ${err}`));
    };
};