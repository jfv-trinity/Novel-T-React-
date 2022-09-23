const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  target: "node",
  plugins: [new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })],
  mode: "development",
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: { "fs": false, "net": false, "async_hooks": false, "react-native-sqlite-storage": false}
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};