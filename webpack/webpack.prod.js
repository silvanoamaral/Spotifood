const merge = require('webpack-merge')
const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
  entry: {
    app: path.join(__dirname, '../src/index.js'),
    serviceWorker: path.join(__dirname, '../public/serviceWorker.js'),
    manifest: path.join(__dirname, '../public/manifest.json')
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  plugins: [
    new CompressionPlugin({
      exclude: /\/node_modules/,
    }),
    new webpack.DefinePlugin ({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin ({
      title: 'Developer Spotify API',
      favicon: path.join(__dirname, '../public/image/favicon.png'),
      template:path.join(__dirname, '../public/index.html'),
      inject: 'body'
    })
  ]  
})
