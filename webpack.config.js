const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const base = "./src/client/js";

module.exports = {
  entry: {
    main: `${base}/main.js`,
    studyList: `${base}/studyList.js`,
    predictTime: `${base}/predictTime.js`,
    timer: `${base}/timer.js`,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  mode: "development",
  watch: true,
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
