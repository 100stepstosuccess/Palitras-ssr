const mongoose = require("mongoose");
const crypto = require("crypto");
const Token = require("./Token");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true
    },
    hash: {
      type: String,
      required: true
    },
    username: {
      type: String
    },
    avatar: {
      type: String
    },
    gender: {
      type: String
    },
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    dateOfTheBirth: {
      type: Date
    },
    city: {
      type: String
    },
    country: {
      type: String
    },
    about: {
      type: String
    },
    isOnline: {
      type: Boolean
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

class UserClass {
  generateConfirmationUrl(token) {
    return `${HOST}/confirmation/${token}`;
  }

  generateToken() {
    return new Token({
      _userId: this._id,
      value: crypto.randomBytes(16).toString("hex")
    });
  }
}

userSchema.loadClass(UserClass);

module.exports = mongoose.model("User", userSchema);
