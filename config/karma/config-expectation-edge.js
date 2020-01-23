const { env } = require('process');

module.exports = (config) => {

    config.set({

        browsers: [
            'EdgeSauceLabs'
        ],

        captureTimeout: 120000,

        customLaunchers: {
            EdgeSauceLabs: {
                base: 'SauceLabs',
                browserName: 'MicrosoftEdge',
                platform: 'Windows 10',
                version: '18.17763'
            }
        },

        files: [
            '../../test/expectation/any/**/*.js',
            '../../test/expectation/edge/**/*.js'
        ],

        frameworks: [
            'mocha',
            'sinon-chai'
        ],

        preprocessors: {
            '../../test/expectation/any/**/*.js': 'webpack',
            '../../test/expectation/edge/**/*.js': 'webpack'
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

            tunnelIdentifier: env.TRAVIS_JOB_NUMBER

        });

    } else {

        const environment = require('../environment/local.json');

        config.set({

            sauceLabs: environment.sauceLabs

        });

    }

};
