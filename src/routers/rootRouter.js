import express from "express";
import { handleHome } from "../controllers/rootController";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
} from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", handleHome);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);

export default rootRouter;
