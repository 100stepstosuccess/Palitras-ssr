const express = require("express");
const appRouter = express.Router();

const {
  findUser,
  redirectLogin,
  redirectToConfirm
} = require("../middlewares/index");

const auth = require("./auth");

appRouter.use(["/", "/home"], findUser.byId);

appRouter.get("/", (req, res) => {
  const { userId } = req.session;
  res.render("index", { userId });
});

appRouter.get("/home", redirectLogin, redirectToConfirm, (req, res) => {
  const { userId } = req.session;
  res.render("home", {
    userId,
    email: res.locals.user.email
  });
});

appRouter.use("/", auth);

module.exports = appRouter;
