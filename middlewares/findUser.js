const User = require("../models/User");

exports.byEmail = (req, res, next) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      res.locals.user = false;
      // client message
      const error = new Error("such user doesnt exist");
      error.statusCode = 422;
      next(error);
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
      const error = new Error("such user doesnt exist");
      error.statusCode = 422;
      next(error);
      // client message
    } else {
      res.locals.user = user;
      next();
    }
  });
};
