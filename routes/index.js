const express = require("express");
const appRouter = express.Router();
const redirectLogin = require("../middlewares/redirectLogin");
const findUser = require("../middlewares/findUser");
const redirectToConfirm = require("../middlewares/redirectToConfirm");
const auth = require("./auth");

appRouter.get("/", findUser.byId, redirectToConfirm, (req, res) => {
  const { userId } = req.session;
  res.render("index", { userId });
});

appRouter.get(
  "/home",
  redirectLogin,
  findUser.byId,
  redirectToConfirm,
  (req, res) => {
    res.render("home", { email: res.locals.user.email, path: req.path });
  }
);

appRouter.use("/", auth);

module.exports = appRouter;
