import express from "express";
import {
  deleteStudy,
  finishStudy,
  getDataForModel,
  getDataForPredict,
  postStudy,
} from "../controllers/studyController";

const apiRouter = express.Router();

apiRouter.post("/:userId([0-9a-f]{24})/studies", postStudy);
apiRouter.get("/:userId([0-9a-f]{24})/studies/model", getDataForModel);
apiRouter.get("/:userId([0-9a-f]{24})/studies/predict", getDataForPredict);
apiRouter
  .route("/:userId([0-9a-f]{24})/studies/:studyId([0-9a-f]{24})")
  .delete(deleteStudy)
  .post(finishStudy);

export default apiRouter;
