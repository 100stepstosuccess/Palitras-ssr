module.exports = redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.status(401).redirect("/login");
  } else {
    next();
  }
};
