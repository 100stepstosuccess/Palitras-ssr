const bcrypt = require("bcrypt");
const User = require("../models/User");
const Token = require("../models/Token");
const wrapAsync = require("../middlewares/wrapAsync");
const mailer = require("../models/Mailer");
const createError = require("../utils/createError");

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
        mailer.sendConfirmation(user, token).catch(() => {
          throw createError(
            503,
            "it can not send email rigth now, please try later"
          );
        });
      }
    });

    res.json("confirmation");
  } catch (err) {
    throw createError(422, "wrong email or password");
  }
});

exports.auth = wrapAsync(async (req, res) => {
  const { password } = req.body;
  const { user } = res.locals;

  if (!user) {
    throw createError(422, "wrong email or password");
  } else {
    const result = await bcrypt.compare(password, user.hash);

    if (result) {
      req.session.userId = user._id;
      res.json("home");
    } else {
      throw createError(422, "wrong email or password");
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
      throw createError(
        422,
        "We were unable to find a valid token. Your token my have expired."
      );
    }
  } catch (err) {
    throw err;
  }

  try {
    const foundUser = await User.findOne({ _id: foundToken._userId }).exec();
    if (!foundUser) {
      throw createError(422, "We were unable to find a user for this token");
    }
    if (foundUser.isVerified) {
      throw createError(422, "This user has already been verified.");
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
