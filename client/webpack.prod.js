const merge = require('webpack-merge')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const common = require('./webpack.common.js')

// const moduleList = ['react', 'react-dom', 'react-router-dom', 'axios', 'styled-components']

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
        commons: {
          test: new RegExp(
            '[\\/]node_modules[\\/]',
          ),
          name: 'vendor_cache',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
})
