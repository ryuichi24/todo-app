const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, "..", "src/index.js")
  },
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "[name][contenthash].js",
    publicPath: "/",
    clean: true,
    assetModuleFilename: "[name][ext]"
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@": path.resolve(__dirname, "..", "./src")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Todo App",
      filename: "index.html",
      template: path.resolve(__dirname, "..", "./src/index.html")
    })
  ]
};
