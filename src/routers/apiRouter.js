import express from "express";
import {
  deleteStudy,
  finishStudy,
  postStudy,
} from "../controllers/studyController";

const apiRouter = express.Router();

apiRouter.post("/:userId([0-9a-f]{24})/studies", postStudy);
apiRouter
  .route("/:userId([0-9a-f]{24})/studies/:studyId([0-9a-f]{24})")
  .delete(deleteStudy)
  .patch(finishStudy);

export default apiRouter;
