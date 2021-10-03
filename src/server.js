import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";

const PORT = process.env.PORT || 4000;

const app = express();
const logger = morgan("dev"); // HTTP request logger middleware for node.js

app.set("view engine", "pug"); // Set view engine as pug
app.set("views", process.cwd() + "/src/views"); // Set view files path

app.use(logger);
app.use("/", rootRouter);

app.listen(PORT, () => {
  console.log(`✔ Server is listening http://localhost:${PORT} 🚀`);
});
