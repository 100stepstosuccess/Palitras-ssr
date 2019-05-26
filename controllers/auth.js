const bcrypt = require("bcrypt");
const boom = require("@hapi/boom");
const User = require("../models/User");
const Token = require("../models/Token");
const wrapAsync = require("../middlewares/wrapAsync");
const mailer = require("../helpers/mailer");

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
        mailer.sendConfirmationEmail(user, token);
      }
    });

    res.redirect("/confirmation");
  } catch (err) {
    throw boom.badData("such email has already used");
    // client message
    // res.redirect("/sign-up");
  }
});

exports.auth = wrapAsync(async (req, res) => {
  const { password } = req.body;
  const { user } = res.locals;

  if (!user) {
    throw boom.badData("such user doesnt exist");
    // res.redirect("/login");
  } else {
    const result = await bcrypt.compare(password, user.hash);

    if (result) {
      req.session.userId = user._id;
      res.json("/home");
    } else {
      // client message
      // res.redirect("/login");
      throw boom.badData("wrong email or password");
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

    if (!foundToken)
      throw boom.badRequest(
        "We were unable to find a valid token. Your token my have expired."
      );
  } catch (err) {
    throw err;
  }

  // If we found a token, find a matching user
  try {
    const foundUser = await User.findOne({ _id: foundToken._userId }).exec();
    if (!foundUser)
      throw boom.badRequest("We were unable to find a user for this token.");
    if (foundUser.isVerified)
      throw boom.badRequest("This user has already been verified.");

    // Verify and save the user
    foundUser.isVerified = true;
    foundUser.save(err => {
      if (err) throw err;
      res.status(200).send("user successfully verified"); // client message
    });
  } catch (err) {
    throw err;
  }
});
