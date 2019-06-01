require("./base");
const path = require("path");
const root_config = require("../root_config");

module.exports = function viewEngineSetup(app) {
  app.set("views", root_config.viewPath);
  app.set("view engine", "pug");

  if (!IN_PROD) {
    console.log("now running development");

    const webpack = require("webpack");
    const config = require(path.join(
      root_config.configPath,
      "/webpack/webpack-dev.js"
    ));
    const compiler = webpack(config);

    const webpackDevMiddleware = require("webpack-dev-middleware")(
      compiler,
      config.devServer
    );
    app.use(webpackDevMiddleware);
  } else {
    console.log("now running production");
  }
};
