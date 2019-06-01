const bcrypt = require("bcrypt");
const User = require("../models/User");
const Token = require("../models/Token");
const wrapAsync = require("../middlewares/wrapAsync");
const mailer = require("../models/Mailer");

exports.createUser = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  const saltRounds = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, saltRounds);

  const user = new User({ email, hash });

  try {
    let savedUser = await user.save();
    req.session.userId = savedUser._id;
    const token = user.generateToken();

    token.save(err => {
      if (err) {
        throw err;
      } else {
        mailer
          .sendConfirmation(user, token)
          .catch(() =>
            res.json("it can not send email rigth now, please try later")
          );
      }
    });

    res.redirect("/confirmation");
  } catch (err) {
    const error = new Error("such email has already used");
    error.statusCode = 422;
    throw error;
    // client message
    // res.redirect("/sign-up");
  }
});

exports.auth = wrapAsync(async (req, res) => {
  const { password } = req.body;
  const { user } = res.locals;

  if (!user) {
    const err = new Error("such user doesnt exist");
    err.statusCode = 422;
    throw err;
    // res.redirect("/login");
  } else {
    const result = await bcrypt.compare(password, user.hash);

    if (result) {
      req.session.userId = user._id;
      // res.json("/home");
      res.redirect("/home");
    } else {
      // client message
      // res.redirect("/login");
      const err = new Error("wrong email or password");
      err.statusCode = 422;
      throw err;
    }
  }
});

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      next(err);
    }
    res.clearCookie(SESS_NAME);
    res.redirect("/login");
  });
};

exports.verify = wrapAsync(async (req, res, next) => {
  const { token } = req.params;

  let foundToken;
  try {
    foundToken = await Token.findOne({ token }).exec();

    if (!foundToken) {
      const err = new Error(
        "We were unable to find a valid token. Your token my have expired."
      );
      err.statusCode = 400;
      throw err;
    }
  } catch (err) {
    throw err;
  }

  // If we found a token, find a matching user
  try {
    const foundUser = await User.findOne({ _id: foundToken._userId }).exec();
    if (!foundUser) {
      const err = new Error("We were unable to find a user for this token.");
      err.statusCode = 400;
      throw err;
    }
    if (foundUser.isVerified) {
      const err = new Error("This user has already been verified.");
      err.statusCode = 400;
      throw err;
    }
    // Verify and save the user
    foundUser.isVerified = true;
    foundUser.save(err => {
      if (err) throw err;
      res.redirect("/home");
      // res.status(200).send("user successfully verified"); // client message
    });
  } catch (err) {
    throw err;
  }
});
