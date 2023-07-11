import { Request, Response } from "express";

export class Test {
    test( req: Request, res: Response ) {
        res.send("Testing");
    };
};