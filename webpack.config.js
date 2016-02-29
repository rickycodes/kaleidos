const webpack = require('webpack')

module.exports = {
  entry: {
    basic: './examples/basic/index.js',
    animated: './examples/animated/index.js',
    interactive: './examples/interactive/index.js',
    webcam: './examples/webcam/index.js',
    apod: './examples/apod/index.js'
  },
  output: {
    path: 'dist/js/',
    filename: '[name].min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
}
