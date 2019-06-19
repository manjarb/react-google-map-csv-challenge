const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const proxyUrl = 'http://api:5000'

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 3000,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: proxyUrl,
        secure: false,
      },
      '/upload': {
        target: proxyUrl,
        secure: false,
      },
    },
  },
})
