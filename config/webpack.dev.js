const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const DefinePlugin = require('webpack/lib/DefinePlugin');


const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const METADATA = webpackMerge(commonConfig.metadata, {
  host: 'localhost',
  port: 3000,
  ENV,
});

module.exports = webpackMerge(commonConfig, {

  metadata: METADATA,

  debug: true,

  devtool: 'cheap-module-eval-source-map',

  output: {
    path: './dist',
    filename: '[name].js',
    publicPath: '/',
  },

  plugins: [
    new DefinePlugin({
      ENV: JSON.stringify(METADATA.ENV),
      'process.env': {
        ENV: JSON.stringify(METADATA.ENV),
        NODE_ENV: JSON.stringify(METADATA.ENV),
      },
    }),
  ],

  devServer: {
    port: METADATA.port,
    host: METADATA.host,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    contentBase: './dist',
    proxy: {
      '/api/*': {
        target: 'http://localhost:9090',
        secure: false,
      },
    },
  },

});
