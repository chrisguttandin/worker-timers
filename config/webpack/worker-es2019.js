const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { RawSource } = require('webpack-sources');

module.exports = {
    entry: {
        worker: './node_modules/worker-timers-worker/build/es2019/module.js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['@babel/plugin-external-helpers', '@babel/plugin-transform-runtime'],
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    include: ['transform-template-literals'],
                                    targets: {
                                        browsers: [
                                            'last 2 Chrome major versions',
                                            'last 2 ChromeAndroid major versions',
                                            'last 2 Edge major versions',
                                            'last 2 Firefox major versions',
                                            'last 2 FirefoxAndroid major versions',
                                            'last 2 iOS major versions',
                                            'last 2 Opera major versions',
                                            'last 2 Safari major versions'
                                        ]
                                    }
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: {
                    banner: false,
                    condition: /^\**!|@preserve|@license|@cc_on/,
                    filename: '3rdpartylicenses.txt'
                },
                test: /\.ts$/
            })
        ]
    },
    output: {
        filename: '[name].ts',
        path: resolve('src/worker/')
    },
    plugins: [
        {
            apply(compiler) {
                compiler.hooks.compilation.tap('WrapperPlugin', (compilation) => {
                    compilation.hooks.processAssets.tap(
                        {
                            name: 'WrapperPlugin',
                            stage: 700
                        },
                        () => {
                            for (const chunk of compilation.chunks) {
                                for (const file of chunk.files) {
                                    compilation.updateAsset(file, (asset) => {
                                        const workerString = asset.source().replace(/\\/g, '\\\\').replace(/\${/g, '\\${');

                                        return new RawSource(`// This is the minified and stringified code of the worker-timers-worker package.
export const worker = \`${workerString}\`; // tslint:disable-line:max-line-length
`);
                                    });
                                }
                            }
                        }
                    );
                });
            }
        }
    ],
    target: 'webworker'
};
