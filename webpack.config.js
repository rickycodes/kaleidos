const webpack = require('webpack')

module.exports = {
  entry: {
    basic: './examples/basic/index.js',
    animated: './examples/animated/index.js',
    interactive: './examples/interactive/index.js'
  },
  output: {
    path: 'examples/build/',
    filename: '[name].min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
}
