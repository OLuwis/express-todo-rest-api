import "dotenv/config";
import "reflect-metadata";
import { env } from "process";
import { DataSource } from "typeorm";
import { Users } from "../models/users.model.js";
import { Todos } from "../models/todos.model.js";

export const appDataSource = new DataSource ({
    type: "postgres",
    host: process.env.DB_HOST,
    port: <number><unknown>process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [ Users, Todos ],
    synchronize: true,
    logging: false
});