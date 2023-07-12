import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { Response } from "express";
import { Users } from "../models/users.model.js";
import { appDataSource } from "../configs/orm.config.js";

const user = new Users();

export class AuthService {
    async signUp( username: string, password: string, res: Response ) {
        await bcrypt.genSalt(10, ( err, salt ) => {
            bcrypt.hash(password, salt, ( err, hash ) => {
                user.username = username;
                user.salt = salt;
                user.password = hash;
                appDataSource.manager.save(user);
                res.send("Successfully registred!");
            });
        });
    };

    async login( username: string, password: string, res: Response ) {
        const user = await appDataSource.manager.findOneBy( Users, { username: username } );
        const dbPassword = <string>user?.password;
        const result = await bcrypt.compare( password, dbPassword );
        if ( result ) {
            const token = jsonwebtoken.sign({ yourUsername: username, yourPassword: password }, "secret" );
            res.send(token);
        };
    };
};