/* globals require, __dirname, module, webpack */

const
  path = require('path');
  webpack = require('webpack');

const config = {
  entry: './build.js',
//  mode: 'development',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'docs/build'),
    filename: 'rmr-util.bundle.js'
  },
  plugins: [
  ],
  watch: true,
  module: {
    rules: [
    ]
  }
};

module.exports = config;
