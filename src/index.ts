import "dotenv/config";
import express from "express";
import { env } from "process";
import { router } from "./routes/index.js";
import { appDataSource } from "./configs/orm.config.js";

const app = express();

app.listen(<number><unknown>env.APP_PORT, () => {
    console.log(`Server running on http://localhost:${env.APP_PORT}`);
});

app.use(express.json());
app.use(router);

appDataSource.initialize().then(() => {
    console.log("PostgreSQL database connected");
}).catch((err) => console.log(err));

export default app