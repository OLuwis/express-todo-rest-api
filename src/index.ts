import express from "express";
import { envs } from "./configs/env.config.js";
import { router } from "./routes/index.js";
import { appDataSource } from "./configs/orm.config.js";

const app = express();

app.listen(envs.APP_PORT, () => {
    console.log(`Server running on http://localhost:${envs.APP_PORT}`);
});

app.use(express.json());
app.use(router);

appDataSource.initialize().then(() => {
    console.log("PostgreSQL database connected");
}).catch((err) => console.log(err));