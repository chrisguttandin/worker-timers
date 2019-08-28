const { env } = require('process');

module.exports = (config) => {

    config.set({

        files: [
            '../../test/integration/**/*.js'
        ],

        frameworks: [
            'mocha',
            'sinon-chai'
        ],

        preprocessors: {
            '../../test/integration/**/*.js': 'webpack'
        },

        webpack: {
            mode: 'development',
            module: {
                rules: [ {
                    test: /\.ts?$/,
                    use: {
                        loader: 'ts-loader'
                    }
                } ]
            },
            resolve: {
                extensions: [ '.js', '.ts' ]
            }
        },

        webpackMiddleware: {
            noInfo: true
        }

    });

    if (env.TRAVIS) {

        config.set({

            browsers: (env.TARGET === 'chrome')
                ? [
                    'ChromeSauceLabs'
                ]
                : (env.TARGET === 'edge')
                    ? [
                        'EdgeSauceLabs'
                    ]
                    : (env.TARGET === 'firefox')
                        ? [
                            'FirefoxSauceLabs'
                        ]
                        : (env.TARGET === 'safari')
                            ? [
                                'SafariSauceLabs'
                            ]
                            : [
                                'ChromeSauceLabs',
                                'FirefoxSauceLabs',
                                'EdgeSauceLabs',
                                'SafariSauceLabs'
                            ],

            captureTimeout: 120000,

            customLaunchers: {
                ChromeSauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'chrome',
                    platform: 'OS X 10.11'
                },
                EdgeSauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'MicrosoftEdge',
                    platform: 'Windows 10'
                },
                FirefoxSauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'firefox',
                    platform: 'OS X 10.11'
                },
                SafariSauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'safari',
                    platform: 'OS X 10.11'
                }
            },

            tunnelIdentifier: env.TRAVIS_JOB_NUMBER

        });

    } else {

        const environment = require('../environment/local.json');

        config.set({

            browsers: [
                'ChromeHeadless',
                'ChromeCanaryHeadless',
                'EdgeSauceLabs',
                'FirefoxHeadless',
                'FirefoxDeveloperHeadless',
                'Safari'
            ],

            captureTimeout: 120000,

            customLaunchers: {
                EdgeSauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'MicrosoftEdge',
                    platform: 'Windows 10'
                }
            },

            sauceLabs: environment.sauceLabs

        });

    }

};
