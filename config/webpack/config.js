import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

export default {
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
                        '@babel/preset-env'
                    ]
                }
            }
        } ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                extractComments: {
                    banner: false,
                    condition: /^\**!|@preserve|@license|@cc_on/,
                    filename: '3rdpartylicenses.txt'
                }
            })
        ]
    },
    output: {
        filename: '[name].js',
        path: '/'
    },
    target: 'webworker'
};
