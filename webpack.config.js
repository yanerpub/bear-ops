const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: './src/app.js',
    vendor: './src/vendor.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: ['vue-loader']
      },
      {
        test: /\.js$/,
        loader: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    inline: true,
    watchContentBase: true,
    port: 8080,
    proxy: {
      "/ops": "http://localhost:9078",
      "/sign": "http://localhost:9078"
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor']
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}