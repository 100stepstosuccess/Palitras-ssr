const mongoose = require("mongoose");
const Database = require("../models/Database");

exports.mongoDB = new Database({
  name: "mongoDB",
  url: DB_URL,
  connection: mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    autoIndex: !IN_PROD
  })
});
