const path = require('path')

module.exports = {
  entry: {
    app: path.join(__dirname, '../src/index.js')
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: ['babel-loader', 'eslint-loader']
      },
      {
        exclude: /node_modules/,
        test: /\.(s*)css$/,
        loader:['style-loader','css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: path.resolve(__dirname, '../public/image/'),
        use: ['file-loader']
      }
    ]
  }
}
