const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  entry: {
    main: './client/app.js',
  },

  resolve: {
    extensions: ['', '.js', '.css'],
    root: path.resolve('../client'),
    modulesDirectories: ['node_modules'],
  },

  module: {

    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],

    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss'),
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      inject: 'head',
    }),
    new ExtractTextPlugin('[name].css'),
  ],

};
