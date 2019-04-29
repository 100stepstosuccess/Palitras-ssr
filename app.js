//Module dependencies.
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const session = require("express-session");
const boom = require("@hapi/boom");

require("dotenv").config();
require("./config/config");
const sessionConfig = require("./config/sessionConfig");
const index = require("./routes/index");
const app = express();

//sets
app.set("view engine", "pug");

// middleware
app.use(logger("dev"));
app.use(session(sessionConfig));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", index);

app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.isServer) {
    console.log(err.stack);
  }
  return res.status(err.output.statusCode).json(err.output.payload);
});

//DB
mongoose
  .connect(DB_URL, { useNewUrlParser: true, autoIndex: !IN_PROD })
  .then(() => console.log("Database is successfully connected"))
  .catch(() => next(boom.serverUnavailable()));

//server
app.listen(PORT, () => console.log(`server runs on ${HOST}`));

// TODO: нужно добавить отсылку сообщений для верефикации пользователя
