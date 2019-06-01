const redirectHome = (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/home");
  } else {
    next();
  }
};

const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.status(401).redirect("/login");
  } else {
    next();
  }
};

const redirectToConfirm = (req, res, next) => {
  const { user } = res.locals;
  console.log(!user);
  if (!user) return next();
  if (!user.isVerified) {
    res.redirect("/confirmation");
  } else next();
};

module.exports = {
  redirectHome,
  redirectLogin,
  redirectToConfirm
};
