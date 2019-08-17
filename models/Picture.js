const mongoose = require("mongoose");

const pictureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: true
    },
    author: {
      type: Object,
      required: true
    },
    imagePath: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Picture", pictureSchema);
