const {
  redirectHome,
  redirectLogin,
  redirectToConfirm
} = require("./redirect");
const findUser = require("./findUser");
const wrapAsync = require("./wrapAsync");

module.exports = {
  redirectHome,
  redirectLogin,
  findUser,
  redirectToConfirm,
  wrapAsync
};
