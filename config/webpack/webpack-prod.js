const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const autoprefixer = require("autoprefixer");
const mqPacker = require("css-mqpacker");
const rootConfig = require("../../root_config");
const path = require("path");

const img = {
  test: /\.(gif|png|jpe?g|svg)$/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: `images/[name].[ext]`
      }
    },
    {
      loader: "image-webpack-loader",
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false
        },
        pngquant: {
          quality: "65-90",
          speed: 4
        },
        gifsicle: {
          interlaced: false
        },
        // the webp option will enable WEBP
        webp: {
          quality: 75
        }
      }
    }
  ]
};

const js = {
  test: /\.js$/,
  loader: "babel-loader",
  exclude: "/node_modules/"
};

const scss = {
  test: /\.scss$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: { sourceMap: false }
    },
    {
      loader: "postcss-loader",
      options: {
        plugins: [
          autoprefixer({
            browsers: ["ie >= 9", "last 4 version"]
          }),
          mqPacker()
        ],
        sourceMap: false
      }
    },
    {
      loader: "sass-loader",
      options: { sourceMap: false }
    }
  ]
};

module.exports = {
  // BUILD config
  entry: path.join(rootConfig.clientPath, "app.js"),
  mode: "production",
  output: {
    filename: "[name]-bundle.js",
    path: rootConfig.distPath,
    publicPath: "/"
  },
  module: {
    rules: [img, scss, js]
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new CleanWebpackPlugin()
  ]
};
