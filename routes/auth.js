const express = require("express");
const authRouter = express.Router();

const authController = require("../controllers/auth");

const {
  findUser,
  redirectLogin,
  redirectHome
} = require("../middlewares/index");

authRouter.use(["/sign-up", "/login", "/forgot-password"], redirectHome);
authRouter.use(["/logout"], redirectLogin);

authRouter
  .route("/sign-up")
  .get((req, res) => {
    res.render("sign-up");
  })
  .post(authController.createUser);

authRouter
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(findUser.byEmail, authController.auth);

authRouter.route("/login/:some").get((req, res) => {
  console.log(req.params.some);
  res.render("login");
});

authRouter.get("/forgot-password", (req, res) => {
  res.render("forgotPassword");
});

authRouter.post("/logout", authController.logout);

authRouter.get("/confirmation", redirectLogin, findUser.byId, (req, res) => {
  const { userId } = req.session;

  if (res.locals.user.isVerified) {
    res.redirect("/home");
  } else {
    res.render("confirmation", { userId, email: res.locals.user.email });
  }
});

authRouter
  .route("/confirmation/:token")
  .get((req, res) => {
    res.render("verification");
  })
  .post(authController.verify);

module.exports = authRouter;
