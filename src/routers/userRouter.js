import express from "express";
import { getStudies } from "../controllers/studyController";
import { logout } from "../controllers/userController";

const userRouter = express.Router();

// userRouter.get("/:id[0-9a-f]{24}", see);
userRouter.route("/:userId([0-9a-f]{24})/studies").get(getStudies);
userRouter.get("/logout", logout);

export default userRouter;
