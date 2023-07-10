import "dotenv/config"
import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.SERVER_PORT, () => {
    console.log("Server running on http://localhost:3000");
});