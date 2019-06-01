const Joi = require("joi");
const userValidation = require("../models/validationSchemas/userValidation");

const validateUser = (data, schema, res, next) => {
  Joi.validate(data, schema, err => {
    if (err) {
      // client message
      res.locals.isValid = false;
      const err = new Error(
        "email and password must correspond with the schema"
      );
      err.statusCode = 422;
      next(err);
    } else res.locals.isValid = true;
  });
};

module.exports = (req, res, next) => {
  validateUser(req.body, userValidation, res, next);
  if (!res.locals.isValid) return;
  next();
};
