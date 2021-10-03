import express from "express";
import { handleHome } from "../controllers/rootController";

const rootRouter = express.Router();

rootRouter.get("/", handleHome);

export default rootRouter;
