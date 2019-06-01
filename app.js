const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const logger = require("morgan");
const session = require("express-session");
const sassMiddleware = require("node-sass-middleware");

const viewEngineSetup = require("./config/viewEngineSetup");
const sessionConfig = require("./config/sessionConfig");
const { mongoDB } = require("./config/dbConfig");
require("./config/base");

const index = require("./routes/index");
const app = express();
const server = require("./models/Server");
viewEngineSetup(app);

if (IN_PROD) {
  const fs = require("fs");
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
  );
  app.use(express.static("dist"));
  app.use(logger("combined", { stream: accessLogStream }));
} else {
  app.use(
    sassMiddleware({
      src: path.join(__dirname, "dev"),
      dest: path.join(__dirname, "public"),
      indentedSyntax: false,
      sourceMap: false
    })
  );

  app.use(express.static("public"));
  app.use(logger("dev"));
}

app.use(session(sessionConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", index);

app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
  // pug errors
});

app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;

  if (err.shouldRedirect) {
    res.render("myErrorPage");
  } else {
    res.status(err.statusCode).json(err.message);
  }
});

server.addDatabase(mongoDB);
server.start(app);

//загрузка без webpack?
