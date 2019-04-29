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
      token: crypto.randomBytes(16).toString("hex")
    });
  }
}

userSchema.loadClass(UserClass);

module.exports = mongoose.model("User", userSchema);
