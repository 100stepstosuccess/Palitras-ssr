const path = require("path");

module.exports = {
  rootPath: path.join(__dirname),
  configPath: path.join(__dirname, "config"),
  clientPath: path.join(__dirname, "public"),
  viewPath: path.join(__dirname, "views"),
  distPath: path.join(__dirname, "dist")
};
