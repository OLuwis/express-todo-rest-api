import "dotenv/config";
import express from "express";
import { env } from "process";
import { router } from "./routes/index.js";
import { appDataSource } from "./configs/orm.config.js";

// Create express instance
const app = express();

// Start express connection
app.listen(parseInt(<string>env.APP_PORT), () => {
    console.log(`Server running on http://localhost:${env.APP_PORT}`);
});

// Add express middlewares
app.use(express.json());
app.use(router);

// Start db connection
appDataSource.initialize().then(() => {
    console.log("PostgreSQL database connected");
}).catch((err) => console.log(err));

// Export express instance
export default app