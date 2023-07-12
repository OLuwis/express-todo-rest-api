import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "../models/users.model.js";
import { Todos } from "../models/todos.model.js";
import { envs } from "./env.config.js";

export const appDataSource = new DataSource ({
    type: "postgres",
    host: envs.DB_HOST,
    port: envs.DB_PORT,
    username: envs.DB_USERNAME,
    password: envs.DB_PASSWORD,
    database: envs.DB_NAME,
    entities: [ Users, Todos ],
    synchronize: true,
    logging: false
});