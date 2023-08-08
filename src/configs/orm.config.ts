import "dotenv/config";
import "reflect-metadata";
import { env } from "process";
import { DataSource } from "typeorm";
import { Users } from "../models/users.model.js";
import { Todos } from "../models/todos.model.js";

// Db config
export const appDataSource = new DataSource ({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: env.DB_PASSWORD,
    database: "postgres",
    entities: [ Users, Todos ],
    synchronize: true,
    logging: false
});