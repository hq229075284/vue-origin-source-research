const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

// console.log(path.resolve(__dirname,'./src/app.js'))
module.exports = {
  mode: "development",
  entry: {
    // main: path.join(__dirname, "./src/app-multi-child.js"),
    // main: path.join(__dirname, "./src/app-div.js"),
    // main: path.join(__dirname, "./src/app-watch.js"),
    main: path.join(__dirname, "./src/app-update.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      { test: /\.vue$/, use: "vue-loader" },
      { test: /\.css$/, use: ['style-loader', "css-loader"] },
      {
        test: /\.less$/, use: ['vue-style-loader', 'css-loader', {
          loader: "less-loader", options: {}
        }]
      },
      { test: /\.js$/, use: "babel-loader", include: path.resolve(__dirname, 'src') },
      { test: /\.(ttf|woff)$/, use: "file-loader" },
    ],
  },
  resolve: {
    extensions: [".vue", ".js", ".ts", ".jsx", ".tsx"],
    alias: {
      vue: path.resolve(__dirname, "node_modules/vue/dist/vue.esm.js"),
    },
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      filename: "index.html",
    }),
    new VueLoaderPlugin(),
  ],
  devServer: {
    port: "1000",
    host: "0.0.0.0",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        modules: {
          test: /[\\/]node_modules[\\/]/,
          priority: 2,
        },
        vue: {
          test: /node_modules[\\/]vue/,
          priority: 3,
        },
        other: {
          minChunks: 2,
          priority: 1,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: (entryPoint) => `runtime-${entryPoint.name}`,
    },
  },
};
