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
            'ChromeCanarySauceLabs',
            'FirefoxDeveloperSauceLabs'
        ];

        configuration.captureTimeout = 120000;

        configuration.customLaunchers = {
            ChromeCanarySauceLabs: {
                base: 'SauceLabs',
                browserName: 'chrome',
                platform: 'OS X 10.10',
                version: 'dev'
            },
            FirefoxDeveloperSauceLabs: {
                base: 'SauceLabs',
                browserName: 'firefox',
                platform: 'OS X 10.10',
                version: 'dev'
            }
        };

        configuration.tunnelIdentifier = process.env.TRAVIS_BUILD_NUMBER;
    } else {
        configuration.browsers = [
            'ChromeCanary',
            'FirefoxDeveloper'
        ];
    }

    config.set(configuration);

};
