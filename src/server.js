import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev"); // HTTP request logger middleware for node.js

app.set("view engine", "pug"); // Set view engine as pug
app.set("views", process.cwd() + "/src/views"); // Set view files path

app.use(logger);
app.use(express.urlencoded({ extended: true })); //
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false, // Session will be saved when session is changed
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }), // use mongoStore as session store
  })
);
app.use(localsMiddleware);

app.use("/", rootRouter);
app.use("/users", userRouter);

export default app;
