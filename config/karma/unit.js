'use strict';

var browserify = require('../../package.json').browserify;

module.exports = function (config) {

    config.set({

        autoWatch: true,

        browserify: {
            debug: false,
            files: [
                '../../test/**/*.js',
                {
                    included: false,
                    pattern: '../../src/**/*.js'
                }
            ],
            transform: browserify.transform
        },

        browsers: [
            'ChromeCanary',
            'FirefoxAurora'
        ],

        frameworks: [
            'browserify',
            'mocha',
            'sinon-chai' // implicitly uses chai too
        ],

        preprocessors: {
            '/**/*.browserify': 'browserify'
        }

    });

};
