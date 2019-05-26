const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const session = require("express-session");
const sassMiddleware = require("node-sass-middleware");
const viewEngineSetup = require("./config/view_engine-setup");
const sessionConfig = require("./config/sessionConfig");
const index = require("./routes/index");
const app = express();

viewEngineSetup(app);

app.use(
  sassMiddleware({
    src: path.join(__dirname, "dev"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: false,
    sourceMap: false
  })
);

app.use(logger("dev"));
app.use(session(sessionConfig));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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

module.exports = app;
