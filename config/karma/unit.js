'use strict';

var browserify = require('../../package.json').browserify;

module.exports = function (config) {

    var configuration = {

            browserify: {
                transform: browserify.transform
            },

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

        };

    if (process.env.TRAVIS) {
        configuration.browsers = [
            'Chrome',
            'Firefox'
        ];
    } else {
        configuration.browsers = [
            'ChromeCanary',
            'FirefoxDeveloper'
        ];
    }

    config.set(configuration);

};
