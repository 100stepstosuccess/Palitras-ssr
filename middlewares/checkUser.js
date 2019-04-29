const Joi = require("joi");
const userValidation = require("../models/validationSchemas/userValidation");
const boom = require("@hapi/boom");

const validateUser = (data, schema, res, next) => {
  Joi.validate(data, schema, err => {
    if (err) {
      // client message
      res.locals.isValid = false;
      next(boom.badData("email and password must correspond with the schema"));
    } else res.locals.isValid = true;
  });
};

module.exports = (req, res, next) => {
  validateUser(req.body, userValidation, res, next);
  if (!res.locals.isValid) return;
  next();
};
