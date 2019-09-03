const bcrypt = require("bcrypt");
const mailer = require("../models/Mailer");
const User = require("../models/User");
const Token = require("../models/Token");
const Joi = require("joi");
const userValidation = require("../models/validationSchemas/userValidation");
const createError = require("../utils/createError");

class userService {
  validate(data) {
    return Joi.validate(data, userValidation, err => {
      if (err) {
        throw createError(422, {
          message: "email and password must correspond with the schema"
        });
      } else return data;
    });
  }

  async encrypt(password) {
    const saltRounds = await bcrypt.genSalt();
    return bcrypt.hash(password, saltRounds);
  }

  compare(password, hash) {
    return bcrypt.compare(password, hash);
  }

  saveUserWith(email, hash) {
    const username = email.substring(0, email.lastIndexOf("@"));
    console.log(username);
    return new User({ email, hash, username }).save();
  }

  createTokenFor(user) {
    const token = user.generateToken();

    token.save(err => {
      if (err) {
        throw err;
      } else {
        mailer.sendConfirmation(user, token).catch(() => {
          throw createError(503, {
            message: "it can not send email rigth now, please try later"
          });
        });
      }
    });
  }

  async findToken(token) {
    const foundToken = await Token.findOne({ value: token }).exec();

    if (!foundToken) {
      throw createError(
        422,
        "We were unable to find a valid token. Your token my have expired.",
        true
      );
    }
    return foundToken;
  }

  async verifyUser(id) {
    let foundUser = await this.findUserBy(id);

    if (!foundUser) {
      throw createError(
        422,
        "We were unable to find a user for this token",
        true
      );
    }
    if (foundUser.isVerified) {
      throw createError(422, "This user has already been verified.", true);
    }
    foundUser.isVerified = true;
    foundUser = await this.saveUser(foundUser);

    return foundUser;
  }

  async findUserBy(id) {
    return await User.findOne({ _id: id }).exec();
  }

  async saveUser(user) {
    return await user.save();
  }

  async updateUser(data, user) {
    for (let propName in data) {
      user[propName] = data[propName];
    }
    console.log(user);

    return await this.saveUser(user);
  }
}

module.exports = new userService();
