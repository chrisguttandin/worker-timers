const { env } = require('process');
const { DefinePlugin } = require('webpack');

module.exports = (config) => {
    config.set({
        basePath: '../../',

        browserDisconnectTimeout: 100000,

        browserNoActivityTimeout: 100000,

        browsers: ['EdgeLegacySauceLabs'],

        concurrency: 1,

        customLaunchers: {
            EdgeLegacySauceLabs: {
                base: 'SauceLabs',
                browserName: 'MicrosoftEdge',
                captureTimeout: 300,
                platform: 'Windows 10',
                version: '18.17763'
            }
        },

        files: ['test/expectation/edge/legacy/**/*.js'],

        frameworks: ['mocha'],

        preprocessors: {
            'test/expectation/edge/legacy/**/*.js': 'webpack'
        },

        reporters: ['dots'],

        webpack: {
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.ts?$/,
                        use: {
                            loader: 'ts-loader',
                            options: {
                                compilerOptions: {
                                    declaration: false,
                                    declarationMap: false
                                }
                            }
                        }
                    }
                ]
            },
            plugins: [
                new DefinePlugin({
                    'process.env': {
                        CI: JSON.stringify(env.CI)
                    }
                })
            ],
            resolve: {
                extensions: ['.js', '.ts'],
                fallback: { util: false }
            }
        },

        webpackMiddleware: {
            noInfo: true
        }
    });

    if (env.CI) {
        config.set({
            captureTimeout: 300000,

            sauceLabs: {
                recordVideo: false
            }
        });
    } else {
        const environment = require('../environment/local.json');

        config.set({
            sauceLabs: environment.sauceLabs
        });
    }
};
