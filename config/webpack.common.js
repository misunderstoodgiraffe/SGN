const path = require('path');

module.exports = {

  entry: {
    main: './client/app.js',
  },

  resolve: {
    extensions: ['', '.js'],
    root: path.resolve('../client'),
    modulesDirectories: ['node_modules'],
  },

  module: {


    preLoaders: [
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
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],

  },

  plugins: [

  ],

};
