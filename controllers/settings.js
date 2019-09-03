const wrapAsync = require("../middlewares/wrapAsync");
const createError = require("../utils/createError");
const userService = require("../services/userService");

exports.update = wrapAsync(async (req, res) => {
  const { user } = res.locals;
  console.log(req.body);
  const newUser = await userService.updateUser(req.body, user);
  res.json(newUser);
});

exports.getSettings = (req, res) => {
  res.render("settings");
};
