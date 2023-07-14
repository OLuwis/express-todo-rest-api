import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { Response } from "express";
import { Users } from "../models/users.model.js";
import { appDataSource } from "../configs/orm.config.js";

const usersRepository = appDataSource.getRepository(Users);

export class AuthService {
    signUp( username: string, password: string, res: Response ) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return res.status(200).send(`Password Encryption Error: ${err}`);
            };
            bcrypt.hash(password, salt, (err, hashed) => {
                if (err) {
                    return res.status(200).send(`Password Hashing Error: ${err}`);
                };
                usersRepository.findOneBy({
                    username: username
                }).then(res => console.log(res)).catch(err => console.log(err));
            });
        });
    };

    async login( username: string, password: string, res: Response ) {
        const user = await usersRepository.findOneBy({ username: username });
        const dbPassword = <string>user?.password;
        const result = await bcrypt.compare( password, dbPassword );
        if ( result ) {
            const token = jsonwebtoken.sign({ yourUsername: username, yourPassword: password }, "secret" );
            res.send(token);
        };
    };
};