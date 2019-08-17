const express = require("express");
const pictureRouter = express.Router();
const multer = require("multer");
const path = require("path");
const Picture = require("../models/Picture");

const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({
  storage,
  limits: 2048 * 1024,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("picture");

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("can't upload, images only!");
  }
}

pictureRouter
  .route("/add-picture")
  .get((req, res) => {
    res.render("add-picture");
  })
  .post((req, res) => {
    upload(req, res, err => {
      if (err) {
        res.json(err);
      } else {
        const { user } = res.locals;
        console.log(user);

        const data = {
          name: req.body.name,
          author: user.email,
          imagePath: "/uploads/" + req.file.filename
        };
        //добавление автора и прочей информации
        const picture = new Picture(data).save();
        res.json({ message: "image successfuly uploaded!" });
      }
    });
  });

module.exports = pictureRouter;
