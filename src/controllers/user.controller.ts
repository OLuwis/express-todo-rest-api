import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";

const authService = new AuthService();

export class UserController {
    signUp(req: Request, res: Response) {
        if (req.body.username && req.body.password) {
            return authService.signUp(req.body.username, req.body.password, res);
        };
    };

    login(req: Request, res: Response) {
        const username = <string|undefined>req.body.username;
        const password = <string|undefined>req.body.password;
        if (username && password) {
            return authService.login(username, password, res);
        };
    };
};