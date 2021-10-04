import User from "../models/User";
import bcrypt from "bcryptjs";

const BAD_REQUEST = 400;
const UN_AUTHENTICATE = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

// create user
export const postJoin = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    await User.create({
      name,
      username,
      email,
      password,
    });
    return res.redirect("/login");
  } catch (error) {
    res
      .status(BAD_REQUEST)
      .render("join", { pageTitle: "Join", errorMessage: error._message });
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const errorMessage = "이메일 혹은 비밀번호가 틀렸습니다.";
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(UN_AUTHENTICATE)
      .render("login", { pageTitle: "Login", errorMessage });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res
      .status(UN_AUTHENTICATE)
      .render("login", { pageTItle: "Login", errorMessage });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect(`/users/${user.id}/studies`);
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const see = (req, res) => {};

export const getStudies = (req, res) => {
  res.render("user/user-studies", { pageTitle: "studies" });
};
