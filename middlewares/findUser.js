const User = require("../models/User");
const boom = require("@hapi/boom");

exports.byEmail = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      res.locals.user = false;
      // client message
      next(boom.badData("such user doesnt exist"));
    } else {
      res.locals.user = user;
      next();
    }
  });
};

exports.byId = (req, res, next) => {
  const { userId } = req.session;

  User.findOne({ _id: userId }, (err, user) => {
    if (err) {
      next(boom.badData("such user doesnt exist"));
      // client message
    } else {
      res.locals.user = user;
      next();
    }
  });
};
