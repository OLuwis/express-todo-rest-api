import "dotenv/config";
import express from "express";
import { AppDataSource } from "./dataSource.js";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on http://localhost:${process.env.SERVER_PORT}`);
});

AppDataSource.initialize().then(() => {
    console.log("Done");
}).catch((err) => console.log(err));