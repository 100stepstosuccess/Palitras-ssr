const redirectHome = (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/home");
  } else {
    next();
  }
};

const redirectLogin = (req, res, next) => {
  const { userId } = req.session;

  if (!userId) {
    res.status(401).redirect("/login");
  } else {
    next();
  }
};

const redirectToConfirm = (req, res, next) => {
  if (!res.locals.user.isVerified) {
    res.redirect("/confirmation");
  } else next();
};

module.exports = {
  redirectHome,
  redirectLogin,
  redirectToConfirm
};
