module.exports = (req, res, next) => {
  const { user } = res.locals;
  console.log(!user);
  if (!user) return next();
  if (!user.isVerified) {
    res.redirect("/confirmation");
  } else next();
};
