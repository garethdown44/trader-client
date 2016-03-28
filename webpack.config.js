var path = require('path');
var webpack = require('webpack');

module.exports = function(env) {

  var devtool = env == 'development' ? 'eval' : 'cheap-module-source-map';

  return {
    devtool: devtool,
    entry: getEntries(env),
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    plugins: getPlugins(env),
    module: {
      loaders: [{
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /(\.css|\.scss|\.styl)$/,
        include: path.join(__dirname),
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap', 'stylus']
      },
      {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader : 'file-loader'
      }
      ]
    }
  };  
}

function getEntries(env) {
  var entries = [];

  if (env == 'development') {
    entries.push('webpack-dev-server/client?http://localhost:8080');
    entries.push('webpack/hot/only-dev-server');
  }

  entries.push('./src/script/main');

  return entries;
}

var ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin");

function getPlugins(env) {
  var plugins = [];
  if (env == 'development') {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  var GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify(env),
    __DEV__: env == 'development'
  };

  if (env == 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
    plugins.push(new webpack.optimize.DedupePlugin());

    plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/));
  }

  plugins.push(new webpack.DefinePlugin(GLOBALS));

  return plugins;
}