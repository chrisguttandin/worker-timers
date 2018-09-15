const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    default: {
        entry: {
            worker: './node_modules/worker-timers-worker/build/es2015/module.js'
        },
        mode: 'production',
        module: {
            rules: [ {
                exclude: /node_modules\/(?!worker-timers-worker)/,
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            '@babel/plugin-external-helpers',
                            '@babel/plugin-transform-runtime'
                        ],
                        presets: [
                            [ '@babel/preset-env', {
                                include: [
                                    'transform-template-literals'
                                ],
                                targets: {
                                    browsers: [
                                        'last 2 Chrome versions',
                                        'last 2 ChromeAndroid versions',
                                        'last 2 Edge versions',
                                        'last 2 Firefox versions',
                                        'last 2 FirefoxAndroid versions',
                                        'last 2 iOS versions',
                                        'last 2 Opera versions',
                                        'last 2 Safari versions'
                                    ]
                                }
                            } ]
                        ]
                    }
                }
            } ]
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    test: /\.ts$/
                })
            ]
        },
        output: {
            filename: '[name].ts',
            path: resolve('src/worker/')
        },
        target: 'webworker'
    }
};
