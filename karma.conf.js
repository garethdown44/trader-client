module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    browsers: ['PhantomJS'],

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      //exitOnResourceError: true
    },

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'browserify'],

    preprocessors: {
      'src/script/**/__tests__/*.js': [ 'browserify' ],
      //'src/**/*.js': ['babel']
    },

    browserify: {
      debug: true,
      transform: [ 'rewireify', 'babelify' ],
      configure: function(bundle) {
        bundle.on('prebundle', function() {
          bundle.external('foobar');
        });
      }
    },

    // list of files / patterns to load in the browser
    files: [
        // tests location
        'node_modules/babel-polyfill/dist/polyfill.js',
        'src/script/**/__tests__/*.js',
    ],


    // list of files to exclude
    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
