const express = require("express");
const settingsRouter = express.Router();

const settingsController = require("../controllers/settings");

const { findUser } = require("../middlewares/index");

settingsRouter.use("/settings", findUser.byId);

settingsRouter
  .route("/settings")
  .get(settingsController.getSettings)
  .put(settingsController.update);

module.exports = settingsRouter;
