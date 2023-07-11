import { app } from "../../index.js";
import { homeController } from "../../controllers/home.controller.js";

app.get("/", homeController);