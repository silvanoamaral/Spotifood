const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    port: 8001,
    proxy: {
      '/': {
        target: 'http://localhost:5001',
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin ({
      title: 'Development Title',
      favicon: path.join(__dirname, '../public/imagen/favicon.png'),
      template:path.join(__dirname, '../public/index.html'),
      inject: true
    })
  ]
})
