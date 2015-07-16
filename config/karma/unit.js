'use strict';

var browserify = require('../../package.json').browserify;

module.exports = function (config) {

    config.set({

        browserify: {
            transform: browserify.transform
        },

        browsers: [
            'ChromeCanary',
            'FirefoxDeveloper'
        ],

        files: [
            {
                included: false,
                pattern: '../../src/**/*.js',
                served: false,
                watched: true,
            },
            '../../test/unit/**/*.js'
        ],

        frameworks: [
            'browserify',
            'mocha',
            'sinon-chai' // implicitly uses chai too
        ],

        preprocessors: {
            '../../test/**/*.js': 'browserify'
        }

    });

};
