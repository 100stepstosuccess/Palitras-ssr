const express = require("express");
const appRouter = express.Router();
const Picture = require("../models/Picture");

const {
  findUser,
  redirectLogin,
  redirectToConfirm
} = require("../middlewares/index");

const auth = require("./auth");
const picture = require("./picture");
const settings = require("./settings");

appRouter.use(["/", "/home", "/add-picture"], findUser.byId);

appRouter.get("/", (req, res) => {
  const { userId } = req.session;

  Picture.find({}, "name imagePath author", (err, data) => {
    if (err) {
      res.render("index", { userId, err: "can't find pictures" });
    } else {
      res.render("index", { userId, imageArray: data });
    }
  });
});

appRouter.get("/home", (req, res) => {
  const { userId } = req.session;
  res.render("home", { userId });
});

appRouter.use("/", auth);
appRouter.use("/account", picture, settings);

module.exports = appRouter;
