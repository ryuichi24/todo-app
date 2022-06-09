const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {},
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "..", "./dist"),
    port: 3333,
    hot: true,
    open: true,
    historyApiFallback: true,
    compress: true,
  },
};
