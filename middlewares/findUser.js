const User = require("../models/User");
const createError = require("../utils/createError");

exports.byEmail = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      res.locals.user = false;
      const error = createError(422, "wrong email or password");
      next(error);
    } else {
      res.locals.user = user;
      next();
    }
  });
};

exports.byId = (req, res, next) => {
  const { userId } = req.session;

  console.log(req.session);

  User.findOne({ _id: userId }, (err, user) => {
    if (err) {
      const error = createError(422, "wrong email or password");
      next(error);
    } else {
      res.locals.user = user;
      next();
    }
  });
};
