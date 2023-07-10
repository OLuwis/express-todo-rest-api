import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "./usersTable.js";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "postgres",
    entities: [ Users ],
    synchronize: true,
    logging: false
});