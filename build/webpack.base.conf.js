var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var ouputPath = ''
var ouputPublicPath = ''

if (process.env.NODE_ENV === 'production_publish') {
  ouputPath = config.build_publish.assetsRoot
  ouputPublicPath = config.build_publish.assetsPublicPath
} else if (process.env.NODE_ENV === 'production_test') {
  ouputPath = config.build_test.assetsRoot
  ouputPublicPath = config.build_test.assetsPublicPath
} else {
  ouputPath = config.dev.assetsRoot
  ouputPublicPath = config.dev.assetsPublicPath
}

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  output: {
    path: ouputPath,
    filename: '[name].js',
    publicPath: ouputPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/vue-awesome')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'jquery': 'jQuery'
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   $:"jquery",
    //   jQuery:"jquery",
    //   "window.jQuery":"jquery"
    // })
  ]
}
