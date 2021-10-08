import Study from "../models/Study";
import User from "../models/User";

const BAD_REQUEST = 400;
const UN_AUTHENTICATE = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const OK = 200;
const CREATED = 201;
const RESET_CONTENT = 205;

export const getStudies = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate({
    path: "incompletions",
  });
  res.render("user/user-studies", {
    pageTitle: "Studies",
    studies: user.incompletions,
  });
};

export const postStudy = async (req, res) => {
  const { title, level, volume, owner } = req.body;
  let newStudy;
  try {
    newStudy = await Study.create({
      title,
      level,
      volume,
      owner,
    });
    const user = await User.findById(owner);
    user.incompletions.push(newStudy.id);
    await user.save();
  } catch (error) {
    console.log(error);
    return res.sendStatus(BAD_REQUEST);
  }
  return res.status(CREATED).json({ studyId: newStudy._id });
};

export const deleteStudy = async (req, res) => {
  const { userId, studyId } = req.params;
  const deletedStudy = await Study.findByIdAndDelete(studyId);
  console.log(deletedStudy);
  const user = await User.findById(userId);
  const index = user.incompletions.indexOf(
    (study) => String(study._id) === studyId
  );
  user.incompletions.splice(index, 1);
  await user.save();
  return res.sendStatus(OK);
};

export const finishStudy = async (req, res) => {
  const { isFinished, finishTime } = req.body;
  const { userId, studyId } = req.params;
  const study = await Study.findById(studyId);
  study.finished = isFinished;
  await study.save();
  const user = await User.findById(userId);
  user.completions.push(studyId);
  const index = user.incompletions.indexOf(
    (studyItem) => String(studyItem._id) === studyId
  );
  user.incompletions.splice(index, 1);
  await user.save();
  return res.sendStatus(OK);
};
