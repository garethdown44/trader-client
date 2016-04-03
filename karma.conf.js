var webpackConfig = require('./webpack.config')('development');
webpackConfig.entry = {};

var RewirePlugin = require("rewire-webpack");
webpackConfig.plugins.push( new RewirePlugin() );

module.exports = function(config) {
  config.set({

    files: [
      'src/script/**/__tests__/*.js'
    ],

    browsers: ['PhantomJS'],

    frameworks: ['jasmine'],

    colors: true,

    preprocessors: {
      'src/script/**/__tests__/*.js': [ 'webpack' ]
    },

    reporters: ['spec'],

    logLevel: config.LOG_INFO,

    webpack: webpackConfig,

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true
    }
  });
};