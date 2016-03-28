// Karma configuration
// Generated on Mon Mar 28 2016 11:35:49 GMT+0530 (India Standard Time)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'chromeExtensionCleaner/vendor/angular.min.js',
            'chromeExtensionCleaner/vendor/angular-route.min.js',
            'chromeExtensionCleaner/vendor/angular-sanitize.min.js',
            'chromeExtensionCleaner/app/**/*Module.js',
            'chromeExtensionCleaner/app/**/*.js',
            'test/vendor/*.js',
            'test/**/*.spec.js'
        ],

        // list of files to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        preprocessors: {
            'chromeExtensionCleaner/app/**/*.js': 'coverage'
        },


        // test results reporter to use
        // possible values: 'dots', 'progress' 'coverage'<karma-js-coverage>
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
}
