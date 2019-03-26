/* eslint-disable no-undef */
const path = require('path')

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: false,
        historyApiFallback: true,
        port: 8000,
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            },
        }, {
            test: /\.scss$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }],
        }],
    },
    output: {
        filename: 'bundle.js',
        publicPath: '/'
    },
}
