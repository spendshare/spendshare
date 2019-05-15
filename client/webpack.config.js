/* eslint-disable no-undef */
const webpack = require('webpack')
const path = require('path')

const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/

const getStyleLoaders = cssLoaderOptions => [
  { loader: 'style-loader' },
  {
    loader: 'css-loader',
    options: cssLoaderOptions,
  },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
        }),
      ],
    },
  },
  {
    loader: 'sass-loader',
  },
]

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: false,
    historyApiFallback: true,
    port: 8000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceMap: true,
          },
        },
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: getStyleLoaders({
          importLoaders: 2,
        }),
      },
      {
        test: sassModuleRegex,
        use: getStyleLoaders({
          importLoaders: 2,
          localIdentName: '[hash:base62:8]',
          modules: true,
        }),
      },
      {
        loader: require.resolve('file-loader'),
        exclude: [/\.scss/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'whatwg-fetch',
    }),
  ],
}
