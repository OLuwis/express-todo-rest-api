import express from "express";
import { envs } from "./configs/env.config.js";
import { appDataSource } from "./configs/orm.config.js";

export const app = express();

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on http://localhost:${envs.APP_PORT}`);
});

appDataSource.initialize().then(() => {
    console.log("PostgreSQL database connected");
}).catch((err) => console.log(err));