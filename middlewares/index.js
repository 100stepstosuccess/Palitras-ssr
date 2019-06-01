const {
  redirectHome,
  redirectLogin,
  redirectToConfirm
} = require("./redirect");
const checkUser = require("./checkUser");
const findUser = require("./findUser");
const wrapAsync = require("./wrapAsync");

module.exports = {
  redirectHome,
  redirectLogin,
  checkUser,
  findUser,
  redirectToConfirm,
  wrapAsync
};
