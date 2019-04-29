module.exports = (req, res, next) => {
  const { user } = res.locals;
  if (!user) next();
  if (!user.isVerified) {
    res.redirect("/confirmation");
  } else next();
};
