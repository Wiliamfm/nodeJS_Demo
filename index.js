import cors from "cors";
import express from "express";
import { initRoutes } from "./routes/routes.js";
import session from "express-session";

import "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
   resave: false, // don't save session if unmodified
   saveUninitialized: false, // don't create session until something stored
   secret: 'shhhh, very secret'
}));

initRoutes(app);

app.use("/", express.static("./client/build"));

const port = 3050;
app.listen(port, () => { });

export { app };
