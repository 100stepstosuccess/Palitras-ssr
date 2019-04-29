const boom = require("@hapi/boom");

module.exports = fn => (req, res, next) => {
  fn(req, res, next).catch(err => {
    if (!err.isBoom) {
      return next(boom.badImplementation(err));
    }
    next(err);
  });
};
