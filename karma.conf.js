// Karma configuration
// Generated on Sat Jun 14 2014 13:00:51 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
        //Test Configuration
        {
            'pattern': 'web/test/test.config.js',
            'included': true
        },

        //Libraries
        //{'pattern': 'bower_components/requirejs/require.js', 'included':true},
        {'pattern': 'bower_components/**/*.js',
            'included':false},
        {'pattern': 'node_modules', 'included': false},

        //Source Files
        {'pattern': 'web/src/javascript/**/*.js', 'included':false},

        //Test Files
        {'pattern': 'web/test/javascript/**/*.spec\.js', 'included': false}

    ],

    // list of files to exclude
    exclude: [

    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {

    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'html'],

    htmlReporter: {
      outputFile: 'log/test/units.html'
    },


    // web server port
    port: 3000,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
